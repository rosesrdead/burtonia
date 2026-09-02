/* ===================================
   BURTONIA - Lists
=================================== */


/* ===================================
   LISTÁK MEGJELENÍTÉSE
=================================== */

function renderLists() {

    sidebarItems.innerHTML = "";


    /* ===== KEZDŐLAP ===== */

    const home =
        document.createElement("div");


    home.className =
        currentView === "home"
            ? "sidebarItem active"
            : "sidebarItem";


    home.textContent =
        "🏠 Kezdőlap";


    home.onclick = () => {

        currentView = "home";

        render();

    };


    sidebarItems.appendChild(home);


    /* ===== BÖNGÉSZÉS ===== */

    const browse =
        document.createElement("div");


    browse.className =
        currentView === "browse"
            ? "sidebarItem active"
            : "sidebarItem";


    browse.textContent =
        "🎭 Böngészés";


    browse.onclick = () => {

        currentView = "browse";

        render();

    };


    sidebarItems.appendChild(browse);


    /* ===== KÖNYVTÁR ===== */

    const library =
        document.createElement("div");


    library.className =
        currentView === "library" &&
        currentList === "all"
            ? "sidebarItem active"
            : "sidebarItem";


    library.textContent =
        "🎬 Könyvtár";


    library.onclick = () => {

        currentView = "library";

        currentList = "all";

        render();

    };


    sidebarItems.appendChild(library);


    /* ===== SAJÁT LISTÁK ===== */

    db.lists.forEach(list => {

        const row =
            document.createElement("div");


        row.className =
            currentView === "library" &&
            currentList === list.id
                ? "sidebarItem active"
                : "sidebarItem";


        row.textContent =
            (list.icon || "📝") +
            " " +
            list.name;


        row.onclick = () => {

            currentView = "library";

            currentList = list.id;

            render();

        };


        /* ===== DUPLA KATTINTÁS = SZERKESZTÉS ===== */

        row.ondblclick = e => {

            e.stopPropagation();

            editList(list);

        };


        sidebarItems.appendChild(row);

    });

}


/* ===================================
   SZŰRT ELEMEK
=================================== */

function getFilteredItems() {

    if (currentList === "all") {

        return db.items;

    }


    return db.items.filter(item => {

        if (!Array.isArray(item.lists)) {

            return false;

        }


        return item.lists.some(
            id => Number(id) === Number(currentList)
        );

    });

}


/* ===================================
   FŐ RENDER
=================================== */

function render() {

    renderLists();


    homePage.style.display =
        "none";


    browsePage.style.display =
        "none";


    libraryPage.style.display =
        "none";


    switch (currentView) {

        case "home":

            homePage.style.display =
                "block";

            renderHome();

            break;


        case "browse":

            browsePage.style.display =
                "block";

            renderBrowse();

            break;


        default:

            libraryPage.style.display =
                "block";

            renderItems();

            break;

    }

}


/* ===================================
   ÚJ LISTA
=================================== */

addList.onclick = () => {

    closeFab();


    /* ===== LISTA NEVE ===== */

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


    /* ===== DUPLIKÁCIÓ ELLENŐRZÉS ===== */

    const exists =
        db.lists.find(list =>

            list.name.toLowerCase() ===
            value.toLowerCase()

        );


    if (exists) {

        alert(
            "Ez a lista már létezik."
        );

        return;

    }


    /* ===== EMOJI ===== */

    const iconInput =
        prompt(
            "Lista emoji (opcionális):",
            "📝"
        );


    if (iconInput === null) {

        return;

    }


    const icon =
        iconInput.trim() || "📝";


    /* ===== LISTA LÉTREHOZÁSA ===== */

    db.lists.push({

        id:
            Date.now(),

        name:
            value,

        icon:
            icon

    });


    saveDB();

    render();

};


/* ===================================
   LISTA SZERKESZTÉSE
=================================== */

function editList(list) {

    /* ===== LISTA NEVE ===== */

    const newName =
        prompt(
            "Lista neve:",
            list.name
        );


    if (newName === null) {

        return;

    }


    const value =
        newName.trim();


    if (value === "") {

        return;

    }


    /* ===== DUPLIKÁCIÓ ELLENŐRZÉS ===== */

    const duplicate =
        db.lists.find(existingList =>

            existingList.id !== list.id &&
            existingList.name.toLowerCase() ===
            value.toLowerCase()

        );


    if (duplicate) {

        alert(
            "Ez a lista már létezik."
        );

        return;

    }


    /* ===== EMOJI ===== */

    const newIcon =
        prompt(
            "Lista emoji:",
            list.icon || "📝"
        );


    if (newIcon === null) {

        return;

    }


    const icon =
        newIcon.trim() || "📝";


    /* ===== MENTÉS VAGY TÖRLÉS ===== */

    const action =
        confirm(
            "OK = Mentés\n\nMégse = Lista törlése"
        );


    if (action) {

        list.name =
            value;


        list.icon =
            icon;


        saveDB();

        render();

        return;

    }


    /* ===== TÖRLÉS MEGERŐSÍTÉSE ===== */

    const reallyDelete =
        confirm(
            "Biztosan törlöd ezt a listát?\n\nA filmek NEM fognak törlődni."
        );


    if (!reallyDelete) {

        return;

    }


    /* ===== LISTA TÖRLÉSE ===== */

    db.lists =
        db.lists.filter(
            l =>
                l.id !== list.id
        );


    /* ===== LISTA LEVÉTELE A FILMEKRŐL / SOROZATOKRÓL ===== */

    db.items.forEach(item => {

        if (Array.isArray(item.lists)) {

            item.lists =
                item.lists.filter(
                    id =>
                        Number(id) !==
                        Number(list.id)
                );

        }

    });


    saveDB();


    currentList =
        "all";


    render();

}
