/* ===================================
   BURTONIA - Lists
=================================== */


/* ===================================
   LISTÁK MEGJELENÍTÉSE
=================================== */

function renderLists() {

    if (!sidebarItems) {

        return;

    }


    sidebarItems.innerHTML =
        "";


    /* ===================================
       🏠 KEZDŐLAP
    =================================== */

    const home =
        document.createElement("div");


    home.className =
        currentView === "home"
            ? "sidebarItem active"
            : "sidebarItem";


    home.textContent =
        "🏠 Kezdőlap";


    home.onclick = () => {

        currentView =
            "home";


        currentList =
            "all";


        render();

    };


    sidebarItems.appendChild(
        home
    );


    /* ===================================
       🎭 BÖNGÉSZÉS
    =================================== */

    const browse =
        document.createElement("div");


    browse.className =
        currentView === "browse"
            ? "sidebarItem active"
            : "sidebarItem";


    browse.textContent =
        "🎭 Böngészés";


    browse.onclick = () => {

        currentView =
            "browse";


        render();

    };


    sidebarItems.appendChild(
        browse
    );


    /* ===================================
       📚 KÖNYVTÁR
    =================================== */

    const library =
        document.createElement("div");


    library.className =
        currentView === "library" &&
        (
            currentList === "all" ||
            currentList === null ||
            currentList === undefined
        )
            ? "sidebarItem active"
            : "sidebarItem";


    library.textContent =
        "📚 Könyvtár";


    library.onclick = () => {

        currentView =
            "library";


        currentList =
            "all";


        render();

    };


    sidebarItems.appendChild(
        library
    );


    /* ===================================
       SAJÁT LISTÁK
    =================================== */

    const lists =
        Array.isArray(db.lists)
            ? db.lists
            : [];


    lists.forEach(list => {

        const row =
            document.createElement("div");


        row.className =
            currentView === "library" &&
            String(currentList) ===
            String(list.id)
                ? "sidebarItem active"
                : "sidebarItem";


        row.textContent =
            (list.icon || "📝") +
            " " +
            (list.name || "Névtelen lista");


        /* ===================================
           LISTA MEGNYITÁSA
        =================================== */

        row.onclick = () => {

            currentView =
                "library";


            currentList =
                list.id;


            render();

        };


        /* ===================================
           DUPLA KATTINTÁS = SZERKESZTÉS
        =================================== */

        row.ondblclick = e => {

            e.stopPropagation();


            if (
                typeof editList ===
                "function"
            ) {

                editList(list);

            }

        };


        sidebarItems.appendChild(
            row
        );

    });

}


/* ===================================
   FŐ RENDER
=================================== */

function render() {

    /*
       Biztonsági ellenőrzés.
    */

    if (
        typeof db === "undefined"
    ) {

        return;

    }


    if (!Array.isArray(db.items)) {

        db.items = [];

    }


    if (!Array.isArray(db.lists)) {

        db.lists = [];

    }


    /* ===================================
       OLDALSÁV
    =================================== */

    renderLists();


    /* ===================================
       OLDALAK ELREJTÉSE
    =================================== */

    if (homePage) {

        homePage.style.display =
            "none";

    }


    if (browsePage) {

        browsePage.style.display =
            "none";

    }


    if (libraryPage) {

        libraryPage.style.display =
            "none";

    }


    /* ===================================
       NÉZET
    =================================== */

    switch (currentView) {

        /* ===============================
           KEZDŐLAP
        =============================== */

        case "home":

            if (homePage) {

                homePage.style.display =
                    "block";

            }


            if (
                typeof renderHome ===
                "function"
            ) {

                renderHome();

            }

            break;


        /* ===============================
           BÖNGÉSZÉS
        =============================== */

        case "browse":

            if (browsePage) {

                browsePage.style.display =
                    "block";

            }


            if (
                typeof renderBrowse ===
                "function"
            ) {

                renderBrowse();

            }

            break;


        /* ===============================
           KÖNYVTÁR
        =============================== */

        case "library":

        default:

            if (libraryPage) {

                libraryPage.style.display =
                    "block";

            }


            if (
                typeof renderItems ===
                "function"
            ) {

                renderItems();

            }

            break;

    }

}


/* ===================================
   ÚJ LISTA
=================================== */

if (typeof addList !== "undefined") {

    addList.onclick = () => {

        if (
            typeof closeFab ===
            "function"
        ) {

            closeFab();

        }


        /* ===============================
           LISTA NEVE
        =============================== */

        const name =
            prompt(
                "Új lista neve:"
            );


        if (name === null) {

            return;

        }


        const value =
            name.trim();


        if (value === "") {

            return;

        }


        /* ===============================
           DUPLIKÁCIÓ
        =============================== */

        const exists =
            db.lists.find(list => {

                return (
                    String(list.name || "")
                        .trim()
                        .toLowerCase() ===
                    value.toLowerCase()
                );

            });


        if (exists) {

            alert(
                "Ez a lista már létezik."
            );


            return;

        }


        /* ===============================
           EMOJI
        =============================== */

        const iconInput =
            prompt(
                "Lista emoji (opcionális):",
                "📝"
            );


        if (iconInput === null) {

            return;

        }


        const icon =
            iconInput.trim() ||
            "📝";


        /* ===============================
           LISTA LÉTREHOZÁSA
        =============================== */

        db.lists.push({

            id:
                Date.now(),

            name:
                value,

            icon:
                icon

        });


        saveDB();


        currentList =
            "all";


        currentView =
            "library";


        render();

    };

}


/* ===================================
   LISTA SZERKESZTÉSE
=================================== */

function editList(list) {

    if (!list) {

        return;

    }


    /* ===================================
       NÉV
    =================================== */

    const newName =
        prompt(
            "Lista neve:",
            list.name || ""
        );


    if (newName === null) {

        return;

    }


    const value =
        newName.trim();


    if (value === "") {

        return;

    }


    /* ===================================
       DUPLIKÁCIÓ
    =================================== */

    const duplicate =
        db.lists.find(existingList => {

            return (
                existingList.id !==
                list.id &&

                String(
                    existingList.name || ""
                )
                    .trim()
                    .toLowerCase() ===
                value.toLowerCase()
            );

        });


    if (duplicate) {

        alert(
            "Ez a lista már létezik."
        );


        return;

    }


    /* ===================================
       EMOJI
    =================================== */

    const newIcon =
        prompt(
            "Lista emoji:",
            list.icon || "📝"
        );


    if (newIcon === null) {

        return;

    }


    const icon =
        newIcon.trim() ||
        "📝";


    /* ===================================
       MENTÉS
    =================================== */

    list.name =
        value;


    list.icon =
        icon;


    saveDB();


    render();

}


/* ===================================
   LISTA TÖRLÉSE
=================================== */

function deleteList(list) {

    if (!list) {

        return;

    }


    const reallyDelete =
        confirm(

            "Biztosan törlöd ezt a listát?\n\n" +
            "A filmek, sorozatok, animék és könyvek NEM fognak törlődni."

        );


    if (!reallyDelete) {

        return;

    }


    /* ===================================
       LISTA TÖRLÉSE
    =================================== */

    db.lists =
        db.lists.filter(
            l =>
                String(l.id) !==
                String(list.id)
        );


    /* ===================================
       LISTA LEVÉTELE MINDEN ELEMről
    =================================== */

    if (Array.isArray(db.items)) {

        db.items.forEach(item => {

            if (
                Array.isArray(item.lists)
            ) {

                item.lists =
                    item.lists.filter(
                        id =>
                            String(id) !==
                            String(list.id)
                    );

            }

        });

    }


    saveDB();


    currentList =
        "all";


    currentView =
        "library";


    render();

}
