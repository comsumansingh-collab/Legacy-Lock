/* =========================
   MEMORIES MODULE
========================= */

const STORAGE_KEY = "legacyLockMemories";

let memories = [];
let editingMemoryId = null;


/* =========================
   DOM ELEMENTS
========================= */

const memoryModal = document.getElementById("memory-modal");
const memoryForm = document.getElementById("memory-form");
const memoryList = document.getElementById("memory-list");

const addMemoryBtn = document.getElementById("add-memory-btn");
const closeModalBtn = document.getElementById("close-modal");
const cancelBtn = document.getElementById("cancel-btn");
const modalOverlay = document.querySelector(".modal-overlay");

const modalTitle = document.getElementById("modal-title");

const memoryTitle = document.getElementById("memory-title");
const memoryDate = document.getElementById("memory-date");
const memoryCategory = document.getElementById("memory-category");
const memoryDescription = document.getElementById("memory-description");

const themeToggle = document.getElementById("theme-toggle");
const logoutBtn = document.getElementById("logout-btn");


/* =========================
   LOAD MEMORIES
========================= */

function loadMemories() {

    const savedMemories = localStorage.getItem(STORAGE_KEY);

    if (savedMemories) {
        memories = JSON.parse(savedMemories);
    } else {
        memories = [];
    }

    displayMemories();
}


/* =========================
   SAVE MEMORIES
========================= */

function saveMemories() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(memories)
    );
}


/* =========================
   DISPLAY MEMORIES
========================= */

function displayMemories() {

    memoryList.innerHTML = "";

    if (memories.length === 0) {

        memoryList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    <i class="fa-regular fa-image"></i>
                </div>

                <h3>No Memories Yet</h3>

                <p>
                    Start preserving the moments and stories
                    that are important to you.
                </p>

                <button class="primary-btn" onclick="openAddMemoryModal()">
                    <i class="fa-solid fa-plus"></i>
                    Add Your First Memory
                </button>

            </div>
        `;

        return;
    }


    memories.forEach(function(memory) {

        const card = document.createElement("div");

        card.className = "memory-card";

        card.innerHTML = `

            <div class="memory-icon">
                <i class="fa-regular fa-image"></i>
            </div>

            <h3>${escapeHTML(memory.title)}</h3>

            <div class="memory-meta">

                <span class="memory-category">
                    ${escapeHTML(memory.category)}
                </span>

                ${
                    memory.date
                    ? `<span>
                        <i class="fa-regular fa-calendar"></i>
                        ${formatDate(memory.date)}
                    </span>`
                    : ""
                }

            </div>

            <p class="memory-description">
                ${
                    memory.description
                    ? escapeHTML(memory.description)
                    : "No description added."
                }
            </p>

            <div class="memory-actions">

                <button
                    class="memory-action"
                    title="Edit Memory"
                    onclick="editMemory('${memory.id}')"
                >
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button
                    class="memory-action"
                    title="Delete Memory"
                    onclick="deleteMemory('${memory.id}')"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        memoryList.appendChild(card);

    });
}


/* =========================
   OPEN ADD MODAL
========================= */

function openAddMemoryModal() {

    editingMemoryId = null;

    modalTitle.textContent = "Add Memory";

    memoryForm.reset();

    memoryModal.classList.add("active");

    memoryTitle.focus();
}


/* =========================
   OPEN EDIT MODAL
========================= */

function editMemory(id) {

    const memory = memories.find(function(item) {
        return item.id === id;
    });

    if (!memory) {
        return;
    }

    editingMemoryId = id;

    modalTitle.textContent = "Edit Memory";

    memoryTitle.value = memory.title;
    memoryDate.value = memory.date || "";
    memoryCategory.value = memory.category || "Personal";
    memoryDescription.value = memory.description || "";

    memoryModal.classList.add("active");

    memoryTitle.focus();
}


/* =========================
   CLOSE MODAL
========================= */

function closeMemoryModal() {

    memoryModal.classList.remove("active");

    editingMemoryId = null;

    memoryForm.reset();
}


/* =========================
   SAVE / UPDATE MEMORY
========================= */

memoryForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const title = memoryTitle.value.trim();
    const date = memoryDate.value;
    const category = memoryCategory.value;
    const description = memoryDescription.value.trim();


    if (!title) {

        alert("Please enter a memory title.");

        memoryTitle.focus();

        return;
    }


    /* EDIT EXISTING MEMORY */

    if (editingMemoryId) {

        const memoryIndex = memories.findIndex(function(item) {
            return item.id === editingMemoryId;
        });

        if (memoryIndex !== -1) {

            memories[memoryIndex].title = title;
            memories[memoryIndex].date = date;
            memories[memoryIndex].category = category;
            memories[memoryIndex].description = description;

        }

    }


    /* ADD NEW MEMORY */

    else {

        const newMemory = {

            id: Date.now().toString(),

            title: title,

            date: date,

            category: category,

            description: description,

            createdAt: new Date().toISOString()

        };

        memories.unshift(newMemory);

    }


    saveMemories();

    displayMemories();

    closeMemoryModal();

});


/* =========================
   DELETE MEMORY
========================= */

function deleteMemory(id) {

    const memory = memories.find(function(item) {
        return item.id === id;
    });

    if (!memory) {
        return;
    }


    const confirmDelete = confirm(
        `Delete "${memory.title}"?`
    );


    if (!confirmDelete) {
        return;
    }


    memories = memories.filter(function(item) {
        return item.id !== id;
    });


    saveMemories();

    displayMemories();
}


/* =========================
   DATE FORMAT
========================= */

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


/* =========================
   HTML SECURITY
========================= */

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


/* =========================
   THEME
========================= */

function loadTheme() {

    const savedTheme = localStorage.getItem("legacylock-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        if (themeToggle) {
            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';
        }

    } else {

        if (themeToggle) {
            themeToggle.innerHTML =
                '<i class="fa-solid fa-moon"></i>';
        }

    }
}


if (themeToggle) {

    themeToggle.addEventListener("click", function() {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");


        localStorage.setItem(
            "legacylock-theme",
            isDark ? "dark" : "light"
        );


        themeToggle.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

    });

}


/* =========================
   LOGOUT
========================= */

if (logoutBtn) {

    logoutBtn.addEventListener("click", function() {

        localStorage.removeItem("legacylock-logged-in");

        window.location.href = "login.html";

    });

}


/* =========================
   MODAL EVENTS
========================= */

addMemoryBtn.addEventListener(
    "click",
    openAddMemoryModal
);


closeModalBtn.addEventListener(
    "click",
    closeMemoryModal
);


cancelBtn.addEventListener(
    "click",
    closeMemoryModal
);


modalOverlay.addEventListener(
    "click",
    closeMemoryModal
);


/* =========================
   ESC KEY
========================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        if (memoryModal.classList.contains("active")) {
            closeMemoryModal();
        }

    }

});


/* =========================
   INITIALIZE
========================= */

loadTheme();

loadMemories();