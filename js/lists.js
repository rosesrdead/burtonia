/* ===================================
   BURTONIA - Lists
=================================== */

function renderLists() {
    if (!sidebarItems) return;

    sidebarItems.innerHTML = "";

    // Kezdőlap
    const home = document.createElement("div");
    home.className = currentView === "home"
        ? "sidebarItem active"
        : "sidebarItem";
    home.textContent = "🏠 Kezdőlap";
    home.onclick = () => {
        currentView = "home";
        currentList = "all";
        render();
    };
    sidebarItems.appendChild(home);

    // Böngészés
    const browse = document.createElement("div");
    browse.className = currentView === "browse"
        ? "sidebarItem active"
        : "sidebarItem";
    browse.textContent = "🎭 Böngészés";
    browse.onclick = () => {
        currentView = "browse";
        render();
    };
    sidebarItems.appendChild(browse);

    // Könyvtár
    const library = document.createElement("div");
    library.className =
        currentView === "library" &&
        (currentList === "all" ||
         currentList === null ||
         currentList === undefined)
            ? "sidebarItem active"
            : "sidebarItem";

    library.textContent = "📚 Könyvtár";
    library.onclick = () => {
        currentView = "library";
        currentList = "all";
        render();
    };
    sidebarItems.appendChild(library);

    // Saját listák
    const lists = Array.isArray(db.lists) ? db.lists : [];

    lists.forEach(list => {
        const row = document.createElement("div");

        row.className =
            currentView === "library" &&
            String(currentList) === String(list.id)
                ? "sidebarItem active"
                : "sidebarItem";

        row.textContent =
            `${list.icon || "📝"} ${list.name || "Névtelen lista"}`;

        row.onclick = () => {
            currentView = "library";
            currentList = list.id;
            render();
        };

        row.ondblclick = e => {
            e.stopPropagation();
            if (typeof editList === "function") editList(list);
        };

        sidebarItems.appendChild(row);
    });
}


/* ===================================
   FŐ RENDER
=================================== */

function render() {
    if (typeof db === "undefined") return;

    if (!Array.isArray(db.items)) db.items = [];
    if (!Array.isArray(db.lists)) db.lists = [];

    renderLists();

    if (homePage) homePage.style.display = "none";
    if (browsePage) browsePage.style.display = "none";
    if (libraryPage) libraryPage.style.display = "none";

    switch (currentView) {

        case "home":
            if (homePage) homePage.style.display = "block";
            if (typeof renderHome === "function") renderHome();
            break;

        case "browse":
            if (browsePage) browsePage.style.display = "block";
            if (typeof renderBrowse === "function") renderBrowse();
            break;

        case "library":
        default:
            if (libraryPage) libraryPage.style.display = "block";
            if (typeof renderItems === "function") renderItems();
            break;
    }
}


/* ===================================
   ÚJ LISTA
=================================== */

if (typeof addList !== "undefined") {
    addList.onclick = () => {
        if (typeof closeFab === "function") closeFab();

        const name = prompt("Új lista neve:");
        if (name === null) return;

        const value = name.trim();
        if (!value) return;

        const exists = db.lists.some(list =>
            String(list.name || "").trim().toLowerCase() ===
            value.toLowerCase()
        );

        if (exists) {
            alert("Ez a lista már létezik.");
            return;
        }

        const iconInput = prompt(
            "Lista emoji (opcionális):",
            "📝"
        );

        if (iconInput === null) return;

        db.lists.push({
            id: Date.now(),
            name: value,
            icon: iconInput.trim() || "📝"
        });

        saveDB();

        currentList = "all";
        currentView = "library";
        render();
    };
}


/* ===================================
   LISTA SZERKESZTÉSE
=================================== */

function editList(list) {
    if (!list) return;

    const newName = prompt(
        "Lista neve:",
        list.name || ""
    );

    if (newName === null) return;

    const value = newName.trim();
    if (!value) return;

    const duplicate = db.lists.some(existing =>
        existing.id !== list.id &&
        String(existing.name || "").trim().toLowerCase() ===
        value.toLowerCase()
    );

    if (duplicate) {
        alert("Ez a lista már létezik.");
        return;
    }

    const newIcon = prompt(
        "Lista emoji:",
        list.icon || "📝"
    );

    if (newIcon === null) return;

    list.name = value;
    list.icon = newIcon.trim() || "📝";

    saveDB();
    render();
}


/* ===================================
   LISTA TÖRLÉSE
=================================== */

function deleteList(list) {
    if (!list) return;

    if (!confirm(
        "Biztosan törlöd ezt a listát?\n\n" +
        "A filmek, sorozatok, animék és könyvek NEM fognak törlődni."
    )) return;

    db.lists = db.lists.filter(
        l => String(l.id) !== String(list.id)
    );

    if (Array.isArray(db.items)) {
        db.items.forEach(item => {
            if (Array.isArray(item.lists)) {
                item.lists = item.lists.filter(
                    id => String(id) !== String(list.id)
                );
            }
        });
    }

    saveDB();

    currentList = "all";
    currentView = "library";
    render();
}
