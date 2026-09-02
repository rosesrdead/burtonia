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
            name: "Kedvencek"
        },

        {
            id: 2,
            name: "Megnézendő"
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

async function loadDB(){

    const saved =
        localStorage.getItem(
            STORAGE_KEY
        );


    /*
       Először betöltjük a helyi adatokat.
       Így offline módban is működik.
    */

    if(saved){

        try{

            const parsed =
                JSON.parse(saved);


            if(
                parsed &&
                typeof parsed === "object"
            ){

                db = parsed;

            }

        }catch(error){

            console.error(

                "Hibás helyi adatbázis:",

                error

            );

        }

    }


    /*
       Biztosítjuk, hogy a lists tömb
       mindig létezzen.
    */

    if(!Array.isArray(db.lists)){

        db.lists = [

            {
                id: 1,
                name: "Kedvencek"
            },

            {
                id: 2,
                name: "Megnézendő"
            }

        ];

    }


    /*
       Biztosítjuk, hogy az items tömb
       mindig létezzen.
    */

    if(!Array.isArray(db.items)){

        db.items = [];

    }


    /*
       Helyi mentés.
    */

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(db)

    );


    /*
       Ha van bejelentkezett felhasználó,
       akkor a felhőből próbálunk betölteni.

       Ha a felhőben még nincs adat,
       a cloudSync.js automatikusan
       feltölti a helyi könyvtárat.
    */

    if(

        typeof cloudUser !== "undefined" &&

        cloudUser &&

        typeof pullCloudDB === "function"

    ){

        await pullCloudDB(false);

    }

}


/* ===================================
   ADATBÁZIS MENTÉSE
=================================== */

function saveDB(){

    /*
       Mindig mentünk localStorage-ba.
       Ez biztosítja az offline működést.
    */

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(db)

    );


    /*
       Ha van felhős bejelentkezés,
       automatikusan mentünk a Supabase-be.
    */

    if(

        typeof syncDBToCloud === "function"

    ){

        syncDBToCloud();

    }

}