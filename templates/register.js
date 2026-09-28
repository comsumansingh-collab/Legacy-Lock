/* =========================
   REGISTER
   ========================= */

const registerForm =
    document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document
                    .getElementById("register-name")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("register-email")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("register-password")
                    .value;

            const savedUser =
                localStorage.getItem(
                    "legacylock-user"
                );

            const existingUser =
                savedUser
                    ? JSON.parse(savedUser)
                    : null;

            if (
                existingUser &&
                existingUser.email === email
            ) {

                alert(
                    "An account with this email already exists."
                );

                return;

            }

            const user = {
                name: name,
                email: email,
                password: password
            };

            localStorage.setItem(
                "legacylock-user",
                JSON.stringify(user)
            );

            alert(
                "Account created successfully!"
            );

            window.location.href =
                "login.html";

        }
    );

}
