/* ===================================
   BURTONIA - App
=================================== */


/* ===================================
   ADATBÁZIS BETÖLTÉSE
=================================== */

async function startApp() {

    /*
       Először a helyi adatbázist
       töltjük be.
    */

    await loadDB();


    /*
       Ezután indul a felhő.

       Így nem versenyez a két
       betöltési folyamat.
    */

    render();


    if (
        typeof initCloudSync === "function"
    ) {

        await initCloudSync();

    }

}


/* ===================================
   INDÍTÁS
=================================== */

startApp();
