/* =========================
           THEME
           ========================= */

        const savedTheme =
            localStorage.getItem("legacylock-theme");


        if (savedTheme === "dark") {

            document.body.classList.add("dark-mode");

        }


        const themeToggle =
            document.getElementById(
                "legacy-theme-toggle"
            );


        if (themeToggle) {

            themeToggle.textContent =
                document.body.classList.contains("dark-mode")
                    ? "☀"
                    : "☾";


            themeToggle.addEventListener(
                "click",
                function () {

                    document.body.classList.toggle(
                        "dark-mode"
                    );


                    const isDark =
                        document.body.classList.contains(
                            "dark-mode"
                        );


                    themeToggle.textContent =
                        isDark ? "☀" : "☾";


                    localStorage.setItem(
                        "legacylock-theme",
                        isDark
                            ? "dark"
                            : "light"
                    );

                }
            );

        }



        /* =========================
           CUSTOM PERIOD
           ========================= */

        const inactivitySelect =
            document.getElementById(
                "inactivity-period"
            );


        const customPeriodBox =
            document.getElementById(
                "custom-period-box"
            );


        const customPeriod =
            document.getElementById(
                "custom-period"
            );


        inactivitySelect.addEventListener(
            "change",
            function () {

                if (
                    inactivitySelect.value ===
                    "custom"
                ) {

                    customPeriodBox.style.display =
                        "block";

                    customPeriod.required =
                        true;

                } else {

                    customPeriodBox.style.display =
                        "none";

                    customPeriod.required =
                        false;

                    customPeriod.value =
                        "";

                }

            }
        );



        /* =========================
           LOAD VAULT ASSETS
           ========================= */

        const assetContainer =
            document.getElementById(
                "legacy-assets"
            );


        const savedAssets =
            JSON.parse(
                localStorage.getItem(
                    "legacylock-assets"
                )
            ) || [];


        if (savedAssets.length === 0) {

            assetContainer.innerHTML = `

                <div class="no-assets">

                    No digital assets found.
                    Add assets from your Digital Vault first.

                </div>

            `;

        } else {

            savedAssets.forEach(
                function (asset, index) {

                    const label =
                        document.createElement(
                            "label"
                        );


                    label.className =
                        "legacy-asset-option";


                    label.innerHTML = `

                        <input
                            type="checkbox"
                            value="${index}"
                        >

                        <i class="fa-solid fa-file"></i>

                        <span>
                            ${asset}
                        </span>

                    `;


                    assetContainer.appendChild(
                        label
                    );

                }
            );

        }



        /* =========================
           SAVE LEGACY PLAN
           ========================= */

        const legacyForm =
            document.getElementById(
                "legacy-plan-form"
            );


        const legacyStatus =
            document.getElementById(
                "legacy-status"
            );


        legacyForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                let inactivityPeriod =
                    inactivitySelect.value;


                if (
                    inactivityPeriod ===
                    "custom"
                ) {

                    const customValue =
                        customPeriod.value.trim();


                    if (
                        customValue === "" ||
                        Number(customValue) < 1
                    ) {

                        alert(
                            "Please enter a valid number of days."
                        );

                        return;

                    }


                    inactivityPeriod =
                        customValue +
                        " days";

                }


                const selectedIndexes =
                    Array.from(
                        document.querySelectorAll(
                            "#legacy-assets input:checked"
                        )
                    ).map(
                        function (checkbox) {

                            return Number(
                                checkbox.value
                            );

                        }
                    );


                const selectedAssets =
                    selectedIndexes.map(
                        function (index) {

                            return savedAssets[
                                index
                            ];

                        }
                    );


                const legacyPlan = {

                    contactName:
                        document
                            .getElementById(
                                "contact-name"
                            )
                            .value
                            .trim(),


                    contactEmail:
                        document
                            .getElementById(
                                "contact-email"
                            )
                            .value
                            .trim()
                            .toLowerCase(),


                    inactivityPeriod:
                        inactivityPeriod,


                    assets:
                        selectedAssets,


                    instructions:
                        document
                            .getElementById(
                                "handover-instructions"
                            )
                            .value
                            .trim()

                };


                localStorage.setItem(
                    "legacylock-plan",
                    JSON.stringify(
                        legacyPlan
                    )
                );


                legacyStatus.classList.add(
                    "show"
                );


                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
