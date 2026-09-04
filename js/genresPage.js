/* ===================================
   BURTONIA - APP INDÍTÁS
   Javítás:
   Az index.html jelenlegi verziója
   nem tölti be külön az app.js fájlt,
   ezért innen indítjuk el az alkalmazást.
=================================== */


/* ===================================
   INDÍTÁSI ÁLLAPOT
=================================== */

let burtoniaAppStarted = false;


/* ===================================
   ALKALMAZÁS INDÍTÁSA
=================================== */

async function startBurtoniaApp() {

    /* Ne induljon el kétszer. */

    if (burtoniaAppStarted) {

        return;

    }


    burtoniaAppStarted = true;


    try {

        /* ===================================
           HELYI ADATBÁZIS
        =================================== */

        if (
            typeof loadDB === "function"
        ) {

            await loadDB();

        }


        /* ===================================
           BAL OLDALI PANEL + OLDALAK
        =================================== */

        if (
            typeof render === "function"
        ) {

            render();

        }


        /* ===================================
           FELHŐ
        =================================== */

        if (
            typeof initCloudSync === "function"
        ) {

            await initCloudSync();

        }


        /* ===================================
           FELHŐ UTÁNI ÚJRARENDERELÉS
        =================================== */

        if (
            typeof render === "function"
        ) {

            render();

        }


    } catch (error) {

        /*
           Ha valami történik induláskor,
           ne maradjon teljesen üres az alkalmazás.
        */

        console.error(
            "BURTONIA indítási hiba:",
            error
        );


        /*
           Megpróbáljuk legalább a helyi
           navigációt megjeleníteni.
        */

        try {

            if (
                typeof render === "function"
            ) {

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

/*
   Mivel ez a fájl az index.html végén,
   a HTML elemek után töltődik be,
   ezért azonnal biztonságosan
   elindítható.
*/

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startBurtoniaApp,
        {
            once: true
        }
    );

} else {

    startBurtoniaApp();

}
