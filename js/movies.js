/* ===================================
   BURTONIA - Movies / Library
=================================== */

/* TÍPUS NORMALIZÁLÁSA */
function normalizeItemType(item) {
    if (!item) return "";

    const type = String(item.type || "")
        .trim()
        .toLowerCase();

    if (["movie", "film", "movies"].includes(type)) return "movie";
    if (["series", "sorozat", "tv", "show"].includes(type)) return "series";
    if (type === "anime") return "anime";
    if (["book", "books", "könyv", "konyv"].includes(type)) return "book";

    return type;
}


/* SZŰRT ELEMEK */
function getFilteredItems() {
    const items = Array.isArray(db.items) ? db.items : [];

    /* TELJES KÖNYVTÁR */
    if (
        currentList === "all" ||
        currentList === null ||
        currentList === undefined ||
        currentList === ""
    ) {
        return items;
    }

    /* TÍPUS SZŰRÉS */
    if (
        typeof currentList === "string" &&
        currentList.startsWith("type:")
    ) {
        const wantedType = currentList
            .replace("type:", "")
            .trim()
            .toLowerCase();

        return items.filter(item =>
            normalizeItemType(item) === wantedType
        );
    }

    /* SAJÁT LISTA SZŰRÉS */
    const wantedListId = String(currentList);

    return items.filter(item =>
        Array.isArray(item.lists) &&
        item.lists.some(id =>
            String(id) === wantedListId
        )
    );
}


/* KÁRTYA */
function createCard(item) {
    const card = document.createElement("div");
    card.className = "card";

    /* BORÍTÓ */
    const poster = document.createElement("div");
    poster.className = "poster";

    if (item.image) {
        const img = document.createElement("img");

        img.src = item.image;
        img.alt = item.title || "";
        img.loading = "lazy";

        img.onerror = () => {
            img.style.display = "none";
            poster.textContent = "Nincs borító";
        };

        poster.appendChild(img);
    } else {
        poster.textContent = "Nincs borító";
    }

    card.appendChild(poster);

    /* CÍM */
    const title = document.createElement("div");
    title.className = "title";
    title.textContent = item.title || "Névtelen elem";
    card.appendChild(title);

    /* EREDETI CÍM */
    if (item.originalTitle) {
        const original = document.createElement("div");

        original.className = "originalTitle";
        original.textContent = item.originalTitle;

        card.appendChild(original);
    }

    /* TÍPUS */
    const type = normalizeItemType(item);

    if (type === "book") {
        const typeLabel = document.createElement("div");

        typeLabel.className = "itemType";
        typeLabel.textContent = "📖 Könyv";

        card.appendChild(typeLabel);
    }

    /* ÉV */
    if (item.year) {
        const year = document.createElement("div");

        year.className = "movieYear";
        year.textContent = "📅 " + item.year;

        card.appendChild(year);
    }

    /* MŰFAJOK */
    if (
        Array.isArray(item.genres) &&
        item.genres.length
    ) {
        const genres = document.createElement("div");

        genres.className = "movieGenres";
        genres.textContent =
            "🎭 " + item.genres.join(" • ");

        card.appendChild(genres);
    }

    /* BEFEJEZÉS */
    if (item.finished) {
        const finished = document.createElement("div");

        finished.className = "finishedDate";
        finished.textContent = "✅ " + item.finished;

        card.appendChild(finished);
    }

    /* SZERKESZTÉS */
    card.onclick = () => {
        if (typeof openEditor === "function") {
            openEditor(item);
        }
    };

    return card;
}


/* RENDEZÉS */
function getSortedItems(items) {
    if (typeof sortItems === "function") {
        return sortItems(items);
    }

    return [...items].sort((a, b) =>
        (a.title || "").localeCompare(
            b.title || "",
            "hu"
        )
    );
}


/* KÖNYVTÁR MEGJELENÍTÉSE */
function renderItems() {
    const grids = {
        movie: document.getElementById("moviesGrid"),
        series: document.getElementById("seriesGrid"),
        anime: document.getElementById("animeGrid"),
        book: document.getElementById("booksGrid")
    };

    /* GRIDEK ÜRÍTÉSE */
    Object.values(grids).forEach(grid => {
        if (grid) grid.innerHTML = "";
    });

    /* ADATOK */
    const items = getSortedItems(
        getFilteredItems()
    );

    /* ELEMEK KIRAJZOLÁSA */
    items.forEach(item => {
        const type = normalizeItemType(item);
        const grid = grids[type];

        if (grid) {
            grid.appendChild(
                createCard(item)
            );
        }
    });

    /* ÜRES SZEKCIÓK ELREJTÉSE */
    Object.entries(grids).forEach(([type, grid]) => {
        if (!grid) return;

        const section = grid.previousElementSibling;

        if (section) {
            section.style.display =
                grid.children.length
                    ? ""
                    : "none";
        }
    });
}


/* RÉGI FÜGGVÉNYEK KOMPATIBILITÁSA */
function renderMovies() {
    renderItems();
}

function renderLibrary() {
    renderItems();
}
