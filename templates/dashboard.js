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
   DASHBOARD
   ========================= */

const dashboard =
    document.querySelector(".dashboard");

if (dashboard) {

    const savedUser =
        localStorage.getItem(
            "legacylock-user"
        );

    if (savedUser) {

        const user =
            JSON.parse(savedUser);

        const userName =
            document.getElementById("user-name");

        if (userName) {
            userName.textContent =
                user.name;
        }

    }

}


/* =========================
   LOGOUT
   ========================= */

const logoutButton =
    document.getElementById("logout-btn");

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "legacylock-logged-in"
            );

            window.location.href =
                "login.html";

        }
    );

}
