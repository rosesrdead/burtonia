/* ===================================
   BURTONIA - App
=================================== */


/* ===================================
   ADATBÁZIS BETÖLTÉSE
=================================== */

async function startApp() {

    /*
       Először mindig a helyi adatbázist
       töltjük be.
    */

    await loadDB();


    /*
       A helyi könyvtár azonnal megjelenik.
    */

    render();


    /*
       Ezután inicializáljuk a felhőt.
    */

    if (
        typeof initCloudSync === "function"
    ) {

        await initCloudSync();

    }


    /*
       Ha a felhőből új adatok érkeztek,
       újrarajzoljuk az oldalt.
    */

    if (
        typeof render === "function"
    ) {

        render();

    }

}


/* ===================================
   INDÍTÁS
=================================== */

startApp();
