/* ===================================
   BURTONIA - LISTS / NAVIGATION
=================================== */


/* ===================================
   BAL OLDALI PANEL
=================================== */

function renderLists() {

    if (!sidebarItems) {
        return;
    }


    sidebarItems.innerHTML = "";


    /* ===================================
       ALAP NAVIGÁCIÓ
    =================================== */

    const addNavigationItem =
        function(
            text,
            view,
            list
        ) {

            const row =
                document.createElement("div");


            row.className =
                (
                    currentView === view &&
                    String(currentList) === String(list)
                )
                    ? "sidebarItem active"
                    : "sidebarItem";


            row.textContent = text;


            row.onclick =
                function() {

                    currentView = view;
                    currentList = list;

                    render();

                };


            sidebarItems.appendChild(row);

        };


    addNavigationItem(
        "🏠 Kezdőlap",
        "home",
        "all"
    );


    addNavigationItem(
        "🎭 Böngészés",
        "browse",
        "all"
    );


    addNavigationItem(
        "📚 Könyvtár",
        "library",
        "all"
    );


    /* ===================================
       SAJÁT LISTÁK
    =================================== */

    const lists =
        Array.isArray(db.lists)
            ? db.lists
            : [];


    lists.forEach(
        function(list) {

            const row =
                document.createElement("div");


            row.className =
                (
                    currentView === "library" &&
                    String(currentList) === String(list.id)
                )
                    ? "sidebarItem active"
                    : "sidebarItem";


            row.textContent =
                (
                    list.icon || "📝"
                ) +
                " " +
                (
                    list.name || "Névtelen lista"
                );


            let clickTimer = null;


            /*
               Egy kattintás:
               lista megnyitása
            */

            row.onclick =
                function(event) {

                    event.preventDefault();


                    clearTimeout(
                        clickTimer
                    );


                    clickTimer =
                        setTimeout(
                            function() {

                                currentView =
                                    "library";

                                currentList =
                                    list.id;

                                render();

                            },
                            220
                        );

                };


            /*
               Dupla kattintás:
               lista szerkesztése
            */

            row.ondblclick =
                function(event) {

                    event.preventDefault();
                    event.stopPropagation();


                    clearTimeout(
                        clickTimer
                    );


                    if (
                        typeof editList === "function"
                    ) {

                        editList(list);

                    }

                };


            sidebarItems.appendChild(row);

        }
    );

}


/* ===================================
   FŐ RENDER
=================================== */

function render() {

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
       BAL OLDALI PANEL
    =================================== */

    renderLists();


    /* ===================================
       OLDALAK ELREJTÉSE
    =================================== */

    if (homePage) {
        homePage.style.display = "none";
    }


    if (browsePage) {
        browsePage.style.display = "none";
    }


    if (libraryPage) {
        libraryPage.style.display = "none";
    }


    /* ===================================
       KEZDŐLAP
    =================================== */

    if (currentView === "home") {

        if (homePage) {
            homePage.style.display = "block";
        }


        if (
            typeof renderHome === "function"
        ) {

            renderHome();

        }


        return;

    }


    /* ===================================
       BÖNGÉSZÉS
    =================================== */

    if (currentView === "browse") {

        if (browsePage) {
            browsePage.style.display = "block";
        }


        if (
            typeof renderBrowse === "function"
        ) {

            renderBrowse();

        }


        return;

    }


    /* ===================================
       KÖNYVTÁR
    =================================== */

    if (libraryPage) {
        libraryPage.style.display = "block";
    }


    if (
        typeof renderItems === "function"
    ) {

        renderItems();

    }

}


/* ===================================
   ÚJ LISTA
=================================== */

function handleAddList() {

    if (
        typeof closeFab === "function"
    ) {

        closeFab();

    }


    const name =
        prompt(
            "Új lista neve:"
        );


    if (name === null) {
        return;
    }


    const value =
        name.trim();


    if (!value) {

        alert(
            "A lista neve nem lehet üres."
        );

        return;

    }


    if (
        !Array.isArray(db.lists)
    ) {

        db.lists = [];

    }


    const alreadyExists =
        db.lists.some(
            function(list) {

                return (
                    String(list.name || "")
                        .trim()
                        .toLowerCase() ===
                    value.toLowerCase()
                );

            }
        );


    if (alreadyExists) {

        alert(
            "Ez a lista már létezik."
        );

        return;

    }


    const icon =
        prompt(
            "Lista emoji:",
            "📝"
        );


    if (icon === null) {
        return;
    }


    db.lists.push({

        id: Date.now(),

        name: value,

        icon:
            icon.trim() || "📝"

    });


    saveDB();


    currentView =
        "library";


    currentList =
        "all";


    render();

}


/* ===================================
   ÚJ LISTA GOMB
=================================== */

function setupListButton() {

    if (!addList) {
        return;
    }


    addList.onclick =
        function(event) {

            event.preventDefault();
            event.stopPropagation();

            handleAddList();

        };

}


/* ===================================
   LISTA SZERKESZTÉSE
=================================== */

function editList(list) {

    if (!list) {
        return;
    }


    const oldModal =
        document.getElementById(
            "listEditModal"
        );


    if (oldModal) {
        oldModal.remove();
    }


    const overlay =
        document.createElement("div");


    overlay.id =
        "listEditModal";


    const box =
        document.createElement("div");


    box.className =
        "listEditBox";


    box.innerHTML = `

        <h2>📝 Lista szerkesztése</h2>

        <label>Lista neve</label>

        <input
            id="editListName"
            type="text"
        >

        <label>Emoji</label>

        <input
            id="editListIcon"
            type="text"
        >

        <div class="listEditButtons">

            <button id="editListSave">
                💾 Mentés
            </button>

            <button id="editListDelete">
                🗑 Törlés
            </button>

            <button id="editListCancel">
                Mégse
            </button>

        </div>

    `;


    overlay.appendChild(box);

    document.body.appendChild(
        overlay
    );


    const nameInput =
        document.getElementById(
            "editListName"
        );


    const iconInput =
        document.getElementById(
            "editListIcon"
        );


    nameInput.value =
        list.name || "";


    iconInput.value =
        list.icon || "📝";


    /* ===================================
       MENTÉS
    =================================== */

    document.getElementById(
        "editListSave"
    ).onclick =
        function() {

            const name =
                nameInput.value.trim();


            if (!name) {

                alert(
                    "A lista neve nem lehet üres."
                );

                return;

            }


            const exists =
                db.lists.some(
                    function(other) {

                        return (
                            other.id !== list.id &&
                            String(
                                other.name || ""
                            )
                                .trim()
                                .toLowerCase() ===
                            name.toLowerCase()
                        );

                    }
                );


            if (exists) {

                alert(
                    "Ez a lista már létezik."
                );

                return;

            }


            list.name =
                name;


            list.icon =
                iconInput.value.trim() ||
                "📝";


            saveDB();


            overlay.remove();


            currentView =
                "library";


            currentList =
                list.id;


            render();

        };


    /* ===================================
       TÖRLÉS
    =================================== */

    document.getElementById(
        "editListDelete"
    ).onclick =
        function() {

            if (
                !confirm(
                    'Biztosan törlöd a(z) "' +
                    (list.name || "") +
                    '" listát?\n\n' +
                    "A listában lévő elemek nem törlődnek."
                )
            ) {

                return;

            }


            db.lists =
                db.lists.filter(
                    function(item) {

                        return (
                            String(item.id) !==
                            String(list.id)
                        );

                    }
                );


            db.items.forEach(
                function(item) {

                    if (
                        Array.isArray(
                            item.lists
                        )
                    ) {

                        item.lists =
                            item.lists.filter(
                                function(id) {

                                    return (
                                        String(id) !==
                                        String(list.id)
                                    );

                                }
                            );

                    }

                }
            );


            saveDB();


            overlay.remove();


            currentView =
                "library";


            currentList =
                "all";


            render();

        };


    /* ===================================
       MÉGSE
    =================================== */

    document.getElementById(
        "editListCancel"
    ).onclick =
        function() {

            overlay.remove();

        };


    /* ===================================
       HÁTTÉR
    =================================== */

    overlay.onclick =
        function(event) {

            if (
                event.target === overlay
            ) {

                overlay.remove();

            }

        };


    nameInput.focus();
    nameInput.select();

}


/* ===================================
   LISTA TÖRLÉS KOMPATIBILITÁS
=================================== */

function deleteList(list) {

    if (!list) {
        return;
    }


    if (
        !confirm(
            'Biztosan törlöd a(z) "' +
            (list.name || "") +
            '" listát?'
        )
    ) {

        return;

    }


    db.lists =
        db.lists.filter(
            function(item) {

                return (
                    String(item.id) !==
                    String(list.id)
                );

            }
        );


    db.items.forEach(
        function(item) {

            if (
                Array.isArray(item.lists)
            ) {

                item.lists =
                    item.lists.filter(
                        function(id) {

                            return (
                                String(id) !==
                                String(list.id)
                            );

                        }
                    );

            }

        }
    );


    saveDB();


    currentView =
        "library";


    currentList =
        "all";


    render();

}


/* ===================================
   INDÍTÁSKOR GOMB BEKÖTÉSE
=================================== */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        setupListButton,
        {
            once: true
        }
    );

} else {

    setupListButton();

}
