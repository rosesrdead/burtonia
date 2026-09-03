/* ===================================
   BURTONIA - Lists / Navigation
=================================== */

function renderLists() {
    if (!sidebarItems) return;

    sidebarItems.innerHTML = "";

    const addItem = (text, view = "library", list = "all") => {
        const row = document.createElement("div");

        row.className =
            currentView === view &&
            String(currentList) === String(list)
                ? "sidebarItem active"
                : "sidebarItem";

        row.textContent = text;

        row.onclick = () => {
            currentView = view;
            currentList = list;
            render();
        };

        sidebarItems.appendChild(row);
    };

    addItem("🏠 Kezdőlap", "home", "all");
    addItem("🎭 Böngészés", "browse", "all");
    addItem("📚 Könyvtár", "library", "all");

    addItem("🎬 Filmek", "library", "type:movie");
    addItem("📺 Sorozatok", "library", "type:series");
    addItem("🌸 Anime", "library", "type:anime");
    addItem("📖 Könyvek", "library", "type:book");

    (Array.isArray(db.lists) ? db.lists : []).forEach(list => {
        const row = document.createElement("div");

        row.className =
            currentView === "library" &&
            String(currentList) === String(list.id)
                ? "sidebarItem active"
                : "sidebarItem";

        row.textContent =
            `${list.icon || "📝"} ${list.name || "Névtelen lista"}`;

        let clickTimer;

        /* EGYSZERES KATTINTÁS */
        row.onclick = () => {
            clearTimeout(clickTimer);

            clickTimer = setTimeout(() => {
                currentView = "library";
                currentList = list.id;
                render();
            }, 250);
        };

        /* DUPLA KATTINTÁS = SZERKESZTÉS */
        row.ondblclick = e => {
            e.preventDefault();
            e.stopPropagation();

            clearTimeout(clickTimer);

            editList(list);
        };

        sidebarItems.appendChild(row);
    });
}


/* ===================================
   FŐ RENDER
=================================== */

function render() {
    if (typeof db === "undefined") return;

    db.items = Array.isArray(db.items) ? db.items : [];
    db.lists = Array.isArray(db.lists) ? db.lists : [];

    renderLists();

    if (homePage) homePage.style.display = "none";
    if (browsePage) browsePage.style.display = "none";
    if (libraryPage) libraryPage.style.display = "none";

    if (currentView === "home") {
        if (homePage) homePage.style.display = "block";
        if (typeof renderHome === "function") renderHome();
        return;
    }

    if (currentView === "browse") {
        if (browsePage) browsePage.style.display = "block";
        if (typeof renderBrowse === "function") renderBrowse();
        return;
    }

    if (libraryPage) libraryPage.style.display = "block";
    if (typeof renderItems === "function") renderItems();
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
            String(list.name || "")
                .trim()
                .toLowerCase() === value.toLowerCase()
        );

        if (exists) {
            alert("Ez a lista már létezik.");
            return;
        }

        const icon = prompt(
            "Lista emoji (opcionális):",
            "📝"
        );

        if (icon === null) return;

        db.lists.push({
            id: Date.now(),
            name: value,
            icon: icon.trim() || "📝"
        });

        saveDB();

        currentView = "library";
        currentList = "all";

        render();
    };
}


/* ===================================
   LISTA SZERKESZTÉSE
=================================== */

function editList(list) {
    if (!list) return;

    /* LISTA NEVE */
    const name = prompt(
        "Lista neve:",
        list.name || ""
    );

    if (name === null) return;

    const value = name.trim();

    if (!value) return;

    /* DUPLIKÁCIÓ */
    const duplicate = db.lists.some(item =>
        item.id !== list.id &&
        String(item.name || "")
            .trim()
            .toLowerCase() === value.toLowerCase()
    );

    if (duplicate) {
        alert("Ez a lista már létezik.");
        return;
    }

    /* EMOJI */
    const iconInput = prompt(
        "Lista emoji:",
        list.icon || "📝"
    );

    if (iconInput === null) return;

    /* ADATOK MENTÉSE */
    list.name = value;
    list.icon = iconInput.trim() || "📝";

    saveDB();
    render();

    /* TÖRLÉS KÉRDÉSE */
    const deleteIt = confirm(
        `A(z) "${list.name}" lista módosítva.\n\n` +
        "Szeretnéd törölni ezt a listát?"
    );

    if (deleteIt) {
        deleteList(list);
    }
}


/* ===================================
   LISTA TÖRLÉSE
=================================== */

function deleteList(list) {
    if (!list) return;

    const reallyDelete = confirm(
        `Biztosan törlöd a(z) "${list.name}" listát?\n\n` +
        "A filmek, sorozatok, animék és könyvek nem törlődnek."
    );

    if (!reallyDelete) return;

    /* LISTA TÖRLÉSE */
    db.lists = db.lists.filter(
        item =>
            String(item.id) !== String(list.id)
    );

    /* LISTA LEVÉTELE AZ ELEMEKRŐL */
    db.items.forEach(item => {
        if (Array.isArray(item.lists)) {
            item.lists = item.lists.filter(
                id =>
                    String(id) !== String(list.id)
            );
        }
    });

    saveDB();

    currentView = "library";
    currentList = "all";

    render();
}
