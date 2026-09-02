/* ===================================
   BURTONIA - Lists
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


    return db.items.filter(item =>

        item.lists &&
        item.lists.includes(currentList)

    );

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


    const name =
        prompt("Új lista neve:");


    if (!name) {

        return;

    }


    const value =
        name.trim();


    if (value === "") {

        return;

    }


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


    db.lists.push({

        id: Date.now(),

        name: value,

        icon: "📝"

    });


    saveDB();

    render();

};


/* ===================================
   LISTA SZERKESZTÉSE
=================================== */

function editList(list) {

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


    const action =
        confirm(
            "OK = Mentés\n\nMégse = Lista törlése"
        );


    if (action) {

        list.name =
            value;


        saveDB();

        render();

        return;

    }


    const reallyDelete =
        confirm(
            "Biztosan törlöd ezt a listát?\n\nA filmek NEM fognak törlődni."
        );


    if (!reallyDelete) {

        return;

    }


    db.lists =
        db.lists.filter(
            l => l.id !== list.id
        );


    db.items.forEach(item => {

        if (item.lists) {

            item.lists =
                item.lists.filter(
                    id => id !== list.id
                );

        }

    });


    saveDB();


    currentList =
        "all";


    render();

}
