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

        let timer = null;

        /* EGYSZERES KATTINTÁS */
        row.onclick = () => {
            clearTimeout(timer);

            timer = setTimeout(() => {
                currentView = "library";
                currentList = list.id;
                render();
            }, 250);
        };

        /* DUPLA KATTINTÁS */
        row.ondblclick = e => {
            e.preventDefault();
            e.stopPropagation();

            clearTimeout(timer);
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
   LISTA SZERKESZTŐ ABLAK
=================================== */

function editList(list) {
    if (!list) return;

    /* Régi ablak eltávolítása */
    const old = document.getElementById("listEditModal");

    if (old) {
        old.remove();
    }

    /* HÁTTÉR */
    const overlay = document.createElement("div");

    overlay.id = "listEditModal";

    Object.assign(overlay.style, {
        position: "fixed",
        inset: "0",
        zIndex: "9999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,.65)",
        backdropFilter: "blur(8px)"
    });


    /* ABLAK */
    const box = document.createElement("div");

    Object.assign(box.style, {
        width: "min(420px,90vw)",
        padding: "25px",
        borderRadius: "20px",
        background: "rgba(25,25,25,.96)",
        border: "1px solid rgba(255,255,255,.12)",
        boxShadow: "0 20px 60px rgba(0,0,0,.5)"
    });


    /* CÍM */
    const title = document.createElement("h2");

    title.textContent = "📝 Lista szerkesztése";

    title.style.marginTop = "0";


    /* NÉV */
    const nameLabel = document.createElement("label");

    nameLabel.textContent = "Lista neve";

    nameLabel.style.display = "block";
    nameLabel.style.marginTop = "15px";


    const nameInput = document.createElement("input");

    nameInput.type = "text";
    nameInput.value = list.name || "";
    nameInput.style.width = "100%";
    nameInput.style.boxSizing = "border-box";
    nameInput.style.marginTop = "6px";


    /* EMOJI */
    const iconLabel = document.createElement("label");

    iconLabel.textContent = "Emoji";

    iconLabel.style.display = "block";
    iconLabel.style.marginTop = "15px";


    const iconInput = document.createElement("input");

    iconInput.type = "text";
    iconInput.value = list.icon || "📝";
    iconInput.style.width = "100%";
    iconInput.style.boxSizing = "border-box";
    iconInput.style.marginTop = "6px";


    /* GOMBOK */
    const buttons = document.createElement("div");

    Object.assign(buttons.style, {
        display: "flex",
        gap: "10px",
        marginTop: "25px",
        flexWrap: "wrap"
    });


    const saveButton = document.createElement("button");

    saveButton.textContent = "💾 Mentés";


    const deleteButton = document.createElement("button");

    deleteButton.textContent = "🗑 Törlés";


    const cancelButton = document.createElement("button");

    cancelButton.textContent = "Mégse";


    /* MENTÉS */
    saveButton.onclick = () => {
        const value = nameInput.value.trim();

        if (!value) {
            alert("A lista neve nem lehet üres.");
            return;
        }

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

        list.name = value;
        list.icon = iconInput.value.trim() || "📝";

        saveDB();

        overlay.remove();

        render();
    };


    /* TÖRLÉS */
    deleteButton.onclick = () => {
        if (!confirm(
            `Biztosan törlöd a(z) "${list.name}" listát?\n\n` +
            "A filmek, sorozatok, animék és könyvek nem törlődnek."
        )) {
            return;
        }

        db.lists = db.lists.filter(
            item =>
                String(item.id) !== String(list.id)
        );

        db.items.forEach(item => {
            if (Array.isArray(item.lists)) {
                item.lists = item.lists.filter(
                    id =>
                        String(id) !== String(list.id)
                );
            }
        });

        saveDB();

        overlay.remove();

        currentView = "library";
        currentList = "all";

        render();
    };


    /* MÉGSE */
    cancelButton.onclick = () => {
        overlay.remove();
    };


    /* ESC */
    overlay.onkeydown = e => {
        if (e.key === "Escape") {
            overlay.remove();
        }
    };


    /* ÖSSZEÁLLÍTÁS */
    buttons.appendChild(saveButton);
    buttons.appendChild(deleteButton);
    buttons.appendChild(cancelButton);

    box.appendChild(title);
    box.appendChild(nameLabel);
    box.appendChild(nameInput);
    box.appendChild(iconLabel);
    box.appendChild(iconInput);
    box.appendChild(buttons);

    overlay.appendChild(box);

    document.body.appendChild(overlay);

    nameInput.focus();
    nameInput.select();
}


/* ===================================
   KOMPATIBILITÁS
=================================== */

function deleteList(list) {
    if (!list) return;

    if (!confirm(
        `Biztosan törlöd a(z) "${list.name}" listát?\n\n` +
        "A filmek, sorozatok, animék és könyvek nem törlődnek."
    )) {
        return;
    }

    db.lists = db.lists.filter(
        item =>
            String(item.id) !== String(list.id)
    );

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
