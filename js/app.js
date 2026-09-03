/* ===================================
   BURTONIA - App
=================================== */


/* ===================================
   ADATBÁZIS + FELHŐ INDÍTÁSA
=================================== */

async function startApp() {

    console.log("BURTONIA: alkalmazás indítása...");


    /* ===================================
       1. HELYI ADATOK
    =================================== */

    try {

        await loadDB();

        console.log(
            "BURTONIA: helyi adatbázis betöltve."
        );

    } catch (error) {

        console.error(
            "BURTONIA: helyi adatbázis betöltési hiba:",
            error
        );

    }


    /* ===================================
       2. AZONNALI MEGJELENÍTÉS
    =================================== */

    try {

        render();

        console.log(
            "BURTONIA: helyi adatok megjelenítve."
        );

    } catch (error) {

        console.error(
            "BURTONIA: render hiba:",
            error
        );

    }


    /* ===================================
       3. FELHŐ INDÍTÁSA
    =================================== */

    if (
        typeof initCloudSync === "function"
    ) {

        try {

            console.log(
                "BURTONIA: felhő inicializálása..."
            );


            await initCloudSync();


            console.log(
                "BURTONIA: felhő inicializálva."
            );


            /* ===================================
               4. HA BE VAN JELENTKEZVE,
                  FELHŐBŐL BETÖLTÉS
            =================================== */

            if (
                typeof cloudUser !== "undefined" &&
                cloudUser &&
                typeof pullCloudDB === "function"
            ) {

                console.log(
                    "BURTONIA: felhős adatok betöltése..."
                );


                const loaded =
                    await pullCloudDB(false);


                if (loaded) {

                    console.log(
                        "BURTONIA: felhős adatok betöltve."
                    );


                    if (
                        typeof render === "function"
                    ) {

                        render();

                    }

                }

            }

        } catch (error) {

            console.error(
                "BURTONIA: felhő indítási hiba:",
                error
            );

        }

    } else {

        console.warn(
            "BURTONIA: initCloudSync() nem található."
        );

    }

}


/* ===================================
   INDÍTÁS
=================================== */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startApp
    );

} else {

    startApp();

}
