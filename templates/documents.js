/* =========================
   DOCUMENT DATA
========================= */

let documents = JSON.parse(
    localStorage.getItem("legacyLockDocuments")
) || [];


/* =========================
   ELEMENTS
========================= */

const documentList =
    document.getElementById("documentList");

const emptyState =
    document.getElementById("emptyState");

const modal =
    document.getElementById("documentModal");

const openModal =
    document.getElementById("openModal");

const emptyAddBtn =
    document.getElementById("emptyAddBtn");

const closeModal =
    document.getElementById("closeModal");

const cancelBtn =
    document.getElementById("cancelBtn");

const documentForm =
    document.getElementById("documentForm");

const modalTitle =
    document.getElementById("modalTitle");

const editIndex =
    document.getElementById("editIndex");

const documentName =
    document.getElementById("documentName");

const category =
    document.getElementById("category");

const documentDate =
    document.getElementById("documentDate");

const expiryDate =
    document.getElementById("expiryDate");

const description =
    document.getElementById("description");

const themeToggle =
    document.getElementById("themeToggle");


/* =========================
   DISPLAY DOCUMENTS
========================= */

function displayDocuments() {

    documentList.innerHTML = "";

    if (documents.length === 0) {

        emptyState.style.display = "block";

        documentList.style.display = "none";

        return;
    }

    emptyState.style.display = "none";

    documentList.style.display = "grid";


    documents.forEach((item, index) => {

        const card =
            document.createElement("div");

        card.className = "document-card";


        const dateText =
            item.documentDate
                ? formatDate(item.documentDate)
                : "Date not added";


        const expiryText =
            item.expiryDate
                ? "Expiry: " + formatDate(item.expiryDate)
                : "";


        card.innerHTML = `

            <div class="document-icon">
                <i class="fa-solid fa-file-lines"></i>
            </div>


            <div class="document-info">

                <h3>
                    ${escapeHTML(item.name)}
                </h3>

                <span class="document-category">
                    ${escapeHTML(item.category)}
                </span>

                <div class="document-meta">

                    ${dateText}

                    ${expiryText ? " • " + expiryText : ""}

                </div>

            </div>


            <div class="document-actions">

                <button
                    class="card-action"
                    onclick="viewDocument(${index})"
                    title="View"
                >
                    <i class="fa-regular fa-eye"></i>
                </button>


                <button
                    class="card-action"
                    onclick="editDocument(${index})"
                    title="Edit"
                >
                    <i class="fa-solid fa-pen"></i>
                </button>


                <button
                    class="card-action delete"
                    onclick="deleteDocument(${index})"
                    title="Delete"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

        `;


        documentList.appendChild(card);

    });
}


/* =========================
   OPEN MODAL
========================= */

function openDocumentModal() {

    modal.classList.add("active");

    modalTitle.textContent = "Add Document";

    documentForm.reset();

    editIndex.value = "";

    documentName.focus();
}


/* =========================
   CLOSE MODAL
========================= */

function closeDocumentModal() {

    modal.classList.remove("active");

    documentForm.reset();

    editIndex.value = "";
}


/* =========================
   SAVE DOCUMENT
========================= */

documentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const data = {

            name: documentName.value.trim(),

            category: category.value,

            documentDate: documentDate.value,

            expiryDate: expiryDate.value,

            description: description.value.trim()

        };


        const index = editIndex.value;


        if (index === "") {

            documents.push(data);

        } else {

            documents[Number(index)] = data;

        }


        localStorage.setItem(
            "legacyLockDocuments",
            JSON.stringify(documents)
        );


        closeDocumentModal();

        displayDocuments();

    }
);


/* =========================
   VIEW DOCUMENT
========================= */

function viewDocument(index) {

    const item = documents[index];


    let details =
        "Document: " + item.name +
        "\n\n" +

        "Category: " + item.category;


    if (item.documentDate) {

        details +=
            "\nDocument Date: " +
            formatDate(item.documentDate);

    }


    if (item.expiryDate) {

        details +=
            "\nExpiry Date: " +
            formatDate(item.expiryDate);

    }


    if (item.description) {

        details +=
            "\n\nDescription:\n" +
            item.description;

    }


    alert(details);
}


/* =========================
   EDIT DOCUMENT
========================= */

function editDocument(index) {

    const item = documents[index];


    modal.classList.add("active");

    modalTitle.textContent = "Edit Document";

    editIndex.value = index;


    documentName.value =
        item.name;

    category.value =
        item.category;

    documentDate.value =
        item.documentDate || "";

    expiryDate.value =
        item.expiryDate || "";

    description.value =
        item.description || "";


    documentName.focus();
}


/* =========================
   DELETE DOCUMENT
========================= */

function deleteDocument(index) {

    const item = documents[index];


    const confirmed = confirm(
        `Delete "${item.name}"?`
    );


    if (!confirmed) {
        return;
    }


    documents.splice(index, 1);


    localStorage.setItem(
        "legacyLockDocuments",
        JSON.stringify(documents)
    );


    displayDocuments();
}


/* =========================
   FORMAT DATE
========================= */

function formatDate(dateString) {

    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* =========================
   MODAL EVENTS
========================= */

openModal.addEventListener(
    "click",
    openDocumentModal
);

emptyAddBtn.addEventListener(
    "click",
    openDocumentModal
);

closeModal.addEventListener(
    "click",
    closeDocumentModal
);

cancelBtn.addEventListener(
    "click",
    closeDocumentModal
);


modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {
            closeDocumentModal();
        }

    }
);


/* =========================
   THEME
========================= */

themeToggle.addEventListener(
    "click",
    function() {

        document.body.classList.toggle("dark");


        const darkMode =
            document.body.classList.contains("dark");


        localStorage.setItem(
            "legacyLockDarkMode",
            darkMode
        );


        themeToggle.innerHTML =
            darkMode

                ? '<i class="fa-regular fa-sun"></i>'

                : '<i class="fa-regular fa-moon"></i>';

    }
);


if (
    localStorage.getItem(
        "legacyLockDarkMode"
    ) === "true"
) {

    document.body.classList.add("dark");

    themeToggle.innerHTML =
        '<i class="fa-regular fa-sun"></i>';

}


/* =========================
   LOGOUT
========================= */

function logout() {

    window.location.href =
        "login.html";
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

displayDocuments();