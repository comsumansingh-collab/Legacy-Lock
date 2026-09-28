/* =========================================================
   LEGACYLOCK — MAIN JAVASCRIPT
   ========================================================= */


/* =========================
   THEME
   ========================= */

const savedTheme = localStorage.getItem("legacylock-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}


/* =========================
   LANDING PAGE THEME
   ========================= */

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {

    themeToggle.textContent =
        document.body.classList.contains("dark-mode")
            ? "☀"
            : "☾";

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        themeToggle.textContent =
            isDark ? "☀" : "☾";

        localStorage.setItem(
            "legacylock-theme",
            isDark ? "dark" : "light"
        );

    });

}


/* =========================
   DASHBOARD THEME
   ========================= */

const dashboardThemeToggle =
    document.getElementById("dashboard-theme-toggle");

if (dashboardThemeToggle) {

    dashboardThemeToggle.textContent =
        document.body.classList.contains("dark-mode")
            ? "☀"
            : "☾";

    dashboardThemeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        dashboardThemeToggle.textContent =
            isDark ? "☀" : "☾";

        localStorage.setItem(
            "legacylock-theme",
            isDark ? "dark" : "light"
        );

    });

}


/* =========================
   NAVBAR SCROLL
   ========================= */

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });

}


/* =========================
   SCROLL REVEAL
   ========================= */

const revealElements = document.querySelectorAll(
    ".feature-card, .security-card, .flow-step, .scattered-card, .solution"
);

function revealOnScroll() {

    revealElements.forEach(function (element) {

        if (
            element.getBoundingClientRect().top <
            window.innerHeight - 80
        ) {
            element.classList.add("show");
        }

    });

}

if (revealElements.length > 0) {

    window.addEventListener(
        "scroll",
        revealOnScroll
    );

    revealOnScroll();

}


/* =========================
   CONTACT FORM
   ========================= */

const contactForm =
    document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            alert(
                "Thank you! Your message has been received."
            );

            contactForm.reset();

        }
    );

}
