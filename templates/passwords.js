/* =========================
   PASSWORD DATA
========================= */

let passwords = JSON.parse(
    localStorage.getItem("legacyLockPasswords")
) || [];


/* =========================
   ELEMENTS
========================= */

const passwordList = document.getElementById("passwordList");
const emptyState = document.getElementById("emptyState");

const modal = document.getElementById("passwordModal");
const openModal = document.getElementById("openModal");
const emptyAddBtn = document.getElementById("emptyAddBtn");

const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");

const passwordForm = document.getElementById("passwordForm");

const modalTitle = document.getElementById("modalTitle");
const editIndex = document.getElementById("editIndex");

const websiteInput = document.getElementById("website");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const noteInput = document.getElementById("note");

const togglePassword = document.getElementById("togglePassword");
const themeToggle = document.getElementById("themeToggle");


/* =========================
   DISPLAY PASSWORDS
========================= */

function displayPasswords() {

    passwordList.innerHTML = "";

    if (passwords.length === 0) {

        emptyState.style.display = "block";
        passwordList.style.display = "none";

        return;
    }

    emptyState.style.display = "none";
    passwordList.style.display = "grid";


    passwords.forEach((item, index) => {

        const card = document.createElement("div");

        card.className = "password-card";

        card.innerHTML = `
            <div class="password-icon">
                <i class="fa-solid fa-key"></i>
            </div>

            <div class="password-info">

                <h3>${escapeHTML(item.website)}</h3>

                <div class="username">
                    ${escapeHTML(item.username)}
                </div>

                <div class="password-value">
                    ••••••••
                </div>

                ${
                    item.note
                        ? `<div class="username">${escapeHTML(item.note)}</div>`
                        : ""
                }

            </div>

            <div class="card-actions">

                <button
                    class="card-action"
                    onclick="showPassword(${index})"
                    title="Show password"
                >
                    <i class="fa-regular fa-eye"></i>
                </button>

                <button
                    class="card-action"
                    onclick="editPassword(${index})"
                    title="Edit"
                >
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button
                    class="card-action delete"
                    onclick="deletePassword(${index})"
                    title="Delete"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        passwordList.appendChild(card);
    });
}


/* =========================
   OPEN MODAL
========================= */

function openPasswordModal() {

    modal.classList.add("active");

    modalTitle.textContent = "Add Password";

    passwordForm.reset();

    editIndex.value = "";

    passwordInput.type = "password";

    togglePassword.innerHTML =
        '<i class="fa-regular fa-eye"></i>';

    websiteInput.focus();
}


/* =========================
   CLOSE MODAL
========================= */

function closePasswordModal() {

    modal.classList.remove("active");

    passwordForm.reset();

    editIndex.value = "";
}


/* =========================
   SAVE PASSWORD
========================= */

passwordForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const data = {

        website: websiteInput.value.trim(),

        username: usernameInput.value.trim(),

        password: passwordInput.value,

        note: noteInput.value.trim()
    };


    const index = editIndex.value;


    if (index === "") {

        passwords.push(data);

    } else {

        passwords[Number(index)] = data;

    }


    localStorage.setItem(
        "legacyLockPasswords",
        JSON.stringify(passwords)
    );


    closePasswordModal();

    displayPasswords();
});


/* =========================
   EDIT PASSWORD
========================= */

function editPassword(index) {

    const item = passwords[index];

    modal.classList.add("active");

    modalTitle.textContent = "Edit Password";

    editIndex.value = index;

    websiteInput.value = item.website;

    usernameInput.value = item.username;

    passwordInput.value = item.password;

    noteInput.value = item.note || "";

    passwordInput.type = "password";

    togglePassword.innerHTML =
        '<i class="fa-regular fa-eye"></i>';

    websiteInput.focus();
}


/* =========================
   SHOW PASSWORD
========================= */

function showPassword(index) {

    const item = passwords[index];

    alert(
        "Password for " +
        item.website +
        ":\n\n" +
        item.password
    );
}


/* =========================
   DELETE PASSWORD
========================= */

function deletePassword(index) {

    const item = passwords[index];

    const confirmed = confirm(
        `Delete password for "${item.website}"?`
    );

    if (!confirmed) {
        return;
    }


    passwords.splice(index, 1);


    localStorage.setItem(
        "legacyLockPasswords",
        JSON.stringify(passwords)
    );


    displayPasswords();
}


/* =========================
   SHOW / HIDE PASSWORD
========================= */

togglePassword.addEventListener("click", function() {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.innerHTML =
            '<i class="fa-regular fa-eye-slash"></i>';

    } else {

        passwordInput.type = "password";

        togglePassword.innerHTML =
            '<i class="fa-regular fa-eye"></i>';
    }
});


/* =========================
   MODAL EVENTS
========================= */

openModal.addEventListener(
    "click",
    openPasswordModal
);

emptyAddBtn.addEventListener(
    "click",
    openPasswordModal
);

closeModal.addEventListener(
    "click",
    closePasswordModal
);

cancelBtn.addEventListener(
    "click",
    closePasswordModal
);


modal.addEventListener("click", function(event) {

    if (event.target === modal) {
        closePasswordModal();
    }
});


/* =========================
   THEME
========================= */

themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    const darkMode =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "legacyLockDarkMode",
        darkMode
    );

    themeToggle.innerHTML = darkMode
        ? '<i class="fa-regular fa-sun"></i>'
        : '<i class="fa-regular fa-moon"></i>';
});


if (
    localStorage.getItem("legacyLockDarkMode") === "true"
) {

    document.body.classList.add("dark");

    themeToggle.innerHTML =
        '<i class="fa-regular fa-sun"></i>';
}


/* =========================
   LOGOUT
========================= */

function logout() {

    window.location.href = "login.html";
}


/* =========================
   HTML SAFETY
========================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================
   INITIAL LOAD
========================= */

displayPasswords();