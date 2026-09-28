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
   DIGITAL VAULT
   ========================= */

const assetButton =
    document.querySelector(
        ".vault-form .primary-btn"
    );

const assetList =
    document.getElementById("asset-list");

if (assetButton && assetList) {

    let assets =
        JSON.parse(
            localStorage.getItem(
                "legacylock-assets"
            )
        ) || [];


    function displayAssets() {

        assetList.innerHTML = "";

        if (assets.length === 0) {

            assetList.innerHTML = `
                <div class="vault-empty">
                    <i class="fa-solid fa-box-open"></i>
                    <p>No digital assets added yet.</p>
                </div>
            `;

            return;
        }


        assets.forEach(function (asset, index) {

            const item =
                document.createElement("div");

            item.className =
                "vault-asset";

            item.innerHTML = `
                <i class="fa-solid fa-file"></i>

                <span>${asset}</span>

                <button
                    class="delete-asset"
                    type="button"
                    data-index="${index}"
                    title="Delete asset"
                    aria-label="Delete asset"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;

            assetList.appendChild(item);

        });

    }


    displayAssets();


    /* =========================
       ADD ASSET
       ========================= */

    assetButton.addEventListener(
        "click",
        function () {

            const assetName =
                document
                    .getElementById("asset-name")
                    .value
                    .trim();

            if (assetName === "") {

                alert(
                    "Please enter an asset name."
                );

                return;

            }

            assets.push(assetName);

            localStorage.setItem(
                "legacylock-assets",
                JSON.stringify(assets)
            );

            displayAssets();

            document.getElementById(
                "asset-name"
            ).value = "";

        }
    );


    /* =========================
       DELETE ASSET
       ========================= */

    assetList.addEventListener(
        "click",
        function (event) {

            const deleteButton =
                event.target.closest(
                    ".delete-asset"
                );

            if (!deleteButton) {
                return;
            }

            const index =
                Number(
                    deleteButton.dataset.index
                );

            assets.splice(index, 1);

            localStorage.setItem(
                "legacylock-assets",
                JSON.stringify(assets)
            );

            displayAssets();

        }
    );

}
