/* ===================================
   BURTONIA - Lists / Navigation
=================================== */

function renderLists() {
    if (!sidebarItems) return;

    sidebarItems.innerHTML = "";

    const addItem = (text, view, list = "all") => {
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

    addItem("🏠 Kezdőlap", "home");
    addItem("🎭 Böngészés", "browse");
    addItem("📚 Könyvtár", "library");

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

        let timer;

        row.onclick = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                currentView = "library";
                currentList = list.id;
                render();
            }, 250);
        };

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
            String(list.name || "").trim().toLowerCase() ===
            value.toLowerCase()
        );

        if (exists) {
            alert("Ez a lista már létezik.");
            return;
        }

        const icon = prompt("Lista emoji:", "📝");
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

    const old = document.getElementById("listEditModal");
    if (old) old.remove();

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

    const box = document.createElement("div");

    Object.assign(box.style, {
        width: "min(420px,90vw)",
        padding: "25px",
        borderRadius: "20px",
        background: "rgba(25,25,25,.97)",
        color: "white",
        border: "1px solid rgba(255,255,255,.12)",
        boxShadow: "0 20px 60px rgba(0,0,0,.5)",
        boxSizing: "border-box"
    });

    box.innerHTML = `
        <h2 style="margin:0 0 20px">
            📝 Lista szerkesztése
        </h2>

        <label style="display:block;margin-bottom:6px">
            Lista neve
        </label>

        <input
            id="editListName"
            type="text"
            value="${escapeHtml(list.name || "")}"
            style="
                width:100%;
                box-sizing:border-box;
                padding:10px;
                margin-bottom:15px;
            "
        >

        <label style="display:block;margin-bottom:6px">
            Emoji
        </label>

        <input
            id="editListIcon"
            type="text"
            value="${escapeHtml(list.icon || "📝")}"
            style="
                width:100%;
                box-sizing:border-box;
                padding:10px;
            "
        >

        <div
            style="
                display:flex;
                gap:10px;
                margin-top:25px;
                flex-wrap:wrap;
            "
        >
            <button id="editListSave">
                💾 Mentés
            </button>

            <button
                id="editListDelete"
                style="
                    background:#d32f2f;
                    color:white;
                    padding:11px 18px;
                "
            >
                🗑 Törlés
            </button>

            <button
                id="editListCancel"
                style="
                    background:#757575;
                    color:white;
                    padding:11px 18px;
                "
            >
                Mégse
            </button>
        </div>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const nameInput =
        document.getElementById("editListName");

    const iconInput =
        document.getElementById("editListIcon");

    const saveButton =
        document.getElementById("editListSave");

    const deleteButton =
        document.getElementById("editListDelete");

    const cancelButton =
        document.getElementById("editListCancel");


    /* ===================================
       MENTÉS
    =================================== */

    saveButton.onclick = () => {
        const name = nameInput.value.trim();

        if (!name) {
            alert("A lista neve nem lehet üres.");
            return;
        }

        const duplicate = db.lists.some(item =>
            item.id !== list.id &&
            String(item.name || "").trim().toLowerCase() ===
            name.toLowerCase()
        );

        if (duplicate) {
            alert("Ez a lista már létezik.");
            return;
        }

        list.name = name;
        list.icon = iconInput.value.trim() || "📝";

        saveDB();

        overlay.remove();
        render();
    };


    /* ===================================
       TÖRLÉS
    =================================== */

    deleteButton.onclick = () => {
        const ok = confirm(
            `Biztosan törlöd a(z) "${list.name}" listát?\n\n` +
            "A listában lévő filmek, sorozatok, animék és könyvek nem törlődnek."
        );

        if (!ok) return;

        db.lists = db.lists.filter(
            item => String(item.id) !== String(list.id)
        );

        db.items.forEach(item => {
            if (Array.isArray(item.lists)) {
                item.lists = item.lists.filter(
                    id => String(id) !== String(list.id)
                );
            }
        });

        saveDB();

        overlay.remove();

        currentView = "library";
        currentList = "all";

        render();
    };


    /* ===================================
       MÉGSE
    =================================== */

    cancelButton.onclick = () => {
        overlay.remove();
    };


    /* ===================================
       ESC
    =================================== */

    overlay.onclick = e => {
        if (e.target === overlay) {
            overlay.remove();
        }
    };

    document.onkeydown = e => {
        if (e.key === "Escape") {
            const modal = document.getElementById("listEditModal");

            if (modal) {
                modal.remove();
                document.onkeydown = null;
            }
        }
    };

    nameInput.focus();
    nameInput.select();
}


/* ===================================
   HTML BIZTONSÁG
=================================== */

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ===================================
   KOMPATIBILITÁS
=================================== */

function deleteList(list) {
    if (!list) return;

    if (!confirm(
        `Biztosan törlöd a(z) "${list.name}" listát?\n\n` +
        "A filmek, sorozatok, animék és könyvek nem törlődnek."
    )) return;

    db.lists = db.lists.filter(
        item => String(item.id) !== String(list.id)
    );

    db.items.forEach(item => {
        if (Array.isArray(item.lists)) {
            item.lists = item.lists.filter(
                id => String(id) !== String(list.id)
            );
        }
    });

    saveDB();

    currentView = "library";
    currentList = "all";

    render();
}
