/* =========================
   LOGIN
   ========================= */

const loginForm =
    document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                document
                    .getElementById("login-email")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("login-password")
                    .value;

            const savedUser =
                localStorage.getItem(
                    "legacylock-user"
                );

            if (!savedUser) {

                alert(
                    "No account found. Please create an account first."
                );

                return;

            }

            const user =
                JSON.parse(savedUser);

            if (
                email === user.email &&
                password === user.password
            ) {

                localStorage.setItem(
                    "legacylock-logged-in",
                    "true"
                );

                window.location.href =
                    "dashboard.html";

            } else {

                alert(
                    "Invalid email or password."
                );

            }

        }
    );

}
