/* ===================================
   BURTONIA - Database
=================================== */

const STORAGE_KEY = "burtonia";


/* ===================================
   ALAP ADATBÁZIS
=================================== */

let db = {

    lists: [

        {
            id: 1,
            name: "Kedvencek",
            icon: "📝"
        },

        {
            id: 2,
            name: "Megnézendő",
            icon: "📝"
        }

    ],

    items: []

};


let currentView = "home";

let currentList = "all";

let selectedItem = null;

let editMode = false;


/* ===================================
   ADATBÁZIS BETÖLTÉSE
=================================== */

async function loadDB() {

    const saved =
        localStorage.getItem(
            STORAGE_KEY
        );


    /* ===================================
       HELYI ADATOK
    =================================== */

    if (saved) {

        try {

            const parsed =
                JSON.parse(saved);


            if (
                parsed &&
                typeof parsed === "object"
            ) {

                db = parsed;

            }

        } catch (error) {

            console.error(
                "BURTONIA: hibás helyi adatbázis:",
                error
            );

        }

    }


    /* ===================================
       BIZTONSÁGI ELLENŐRZÉS
    =================================== */

    if (!Array.isArray(db.lists)) {

        db.lists = [

            {
                id: 1,
                name: "Kedvencek",
                icon: "📝"
            },

            {
                id: 2,
                name: "Megnézendő",
                icon: "📝"
            }

        ];

    }


    if (!Array.isArray(db.items)) {

        db.items = [];

    }


    db.lists.forEach(
        list => {

            if (!list.icon) {

                list.icon = "📝";

            }

        }
    );


    /* ===================================
       HELYI MENTÉS
    =================================== */

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(db)

    );

}


/* ===================================
   ADATBÁZIS MENTÉSE
=================================== */

function saveDB() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(db)

    );


    /*
       Automatikus felhőszinkron,
       ha a felhő már be van jelentkezve.
    */

    if (
        typeof syncDBToCloud === "function"
    ) {

        syncDBToCloud();

    }

}


/* ===================================
   BURTONIA INDÍTÁSA
=================================== */

let burtoniaAppStarted = false;


async function startBurtoniaApp() {

    if (burtoniaAppStarted) {

        return;

    }


    burtoniaAppStarted = true;


    try {

        /* ===================================
           HELYI ADATOK
        =================================== */

        await loadDB();


        /* ===================================
           FELÜLET
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

            try {

                await initCloudSync();

            } catch (cloudError) {

                /*
                   A felhő hibája NE akadályozza
                   meg a helyi alkalmazást.
                */

                console.warn(
                    "BURTONIA: felhő inicializálási hiba:",
                    cloudError
                );

            }

        }


        /* ===================================
           FELHŐ UTÁNI FRISSÍTÉS
        =================================== */

        if (
            typeof render === "function"
        ) {

            render();

        }


    } catch (error) {

        console.error(
            "BURTONIA: alkalmazásindítási hiba:",
            error
        );


        /*
           Végső próbálkozás:
           a helyi felület akkor is jelenjen meg.
        */

        try {

            if (
                typeof render === "function"
            ) {

                render();

            }

        } catch (renderError) {

            console.error(
                "BURTONIA: render hiba:",
                renderError
            );

        }

    }

}


/* ===================================
   FONTOS:
   AZ APP.JS NINCS BENNE AZ INDEX.HTML-BEN
=================================== */

/*
   Ez a fájl viszont be van töltve.

   Ezért innen indítjuk az alkalmazást,
   miután az összes script betöltődött.
*/


window.addEventListener(
    "load",
    function() {

        startBurtoniaApp();

    },
    {
        once: true
    }
);
