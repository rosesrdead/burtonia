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


let currentView =
    "home";


let currentList =
    "all";


let selectedItem =
    null;


let editMode =
    false;


/* ===================================
   ADATBÁZIS BETÖLTÉSE
=================================== */

async function loadDB() {

    const saved =
        localStorage.getItem(
            STORAGE_KEY
        );


    /* ===== HELYI ADATOK ===== */

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
                "Hibás helyi adatbázis:",
                error
            );

        }

    }


    /* ===================================
       BIZTONSÁGI ELLENŐRZÉSEK
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


    /*
       Régi listák esetén biztosítjuk
       az emoji mezőt.
    */

    db.lists.forEach(list => {

        if (!list.icon) {

            list.icon = "📝";

        }

    });


    /* ===================================
       HELYI MENTÉS
    =================================== */

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(db)

    );


    /*
       FONTOS:

       A felhőből való betöltést NEM
       itt végezzük.

       A cloudSync.js kezeli majd,
       amikor már biztosan tudjuk,
       hogy van-e bejelentkezett user.

       Így nem tud üres helyi adatbázis
       véletlenül ráírni a felhőre.
    */

}


/* ===================================
   ADATBÁZIS MENTÉSE
=================================== */

function saveDB() {

    /* ===== HELYI MENTÉS ===== */

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(db)

    );


    /* ===== FELHŐ ===== */

    if (
        typeof syncDBToCloud === "function"
    ) {

        syncDBToCloud();

    }

}
