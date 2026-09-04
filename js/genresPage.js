/* ===================================
   BURTONIA - APP INDÍTÁS
=================================== */

let burtoniaStarted = false;


async function startBurtonia() {

    if (burtoniaStarted) {
        return;
    }

    burtoniaStarted = true;


    try {

        /* ===================================
           HELYI ADATOK
        =================================== */

        if (typeof loadDB === "function") {
            await loadDB();
        }


        /* ===================================
           OLDAL MEGJELENÍTÉSE
        =================================== */

        if (typeof render === "function") {
            render();
        }


        /* ===================================
           FELHŐ
        =================================== */

        if (typeof initCloudSync === "function") {

            try {

                await initCloudSync();

            } catch (error) {

                console.warn(
                    "BURTONIA: felhő inicializálási hiba:",
                    error
                );

            }

        }


        /* ===================================
           ÚJRARENDERELÉS
        =================================== */

        if (typeof render === "function") {
            render();
        }


    } catch (error) {

        console.error(
            "BURTONIA indítási hiba:",
            error
        );


        /*
           Ha a felhő vagy valamelyik
           opcionális rész hibázik, a
           helyi könyvtár akkor is működjön.
        */

        try {

            if (typeof render === "function") {
                render();
            }

        } catch (renderError) {

            console.error(
                "BURTONIA render hiba:",
                renderError
            );

        }

    }

}


/* ===================================
   INDÍTÁS
=================================== */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        startBurtonia,
        {
            once: true
        }
    );

} else {

    startBurtonia();

}
