/* ===================================
   BURTONIA - Movies / Library
=================================== */


/* ===================================
   TÍPUS NORMALIZÁLÁSA
=================================== */

function normalizeItemType(item) {

    if (!item) {

        return "";

    }


    const type =
        String(item.type || "")
            .trim()
            .toLowerCase();


    /* ===================================
       FILM
    =================================== */

    if (
        type === "movie" ||
        type === "film" ||
        type === "movies"
    ) {

        return "movie";

    }


    /* ===================================
       SOROZAT
    =================================== */

    if (
        type === "series" ||
        type === "sorozat" ||
        type === "tv" ||
        type === "show"
    ) {

        return "series";

    }


    /* ===================================
       ANIME
    =================================== */

    if (
        type === "anime"
    ) {

        return "anime";

    }


    /* ===================================
       KÖNYV
    =================================== */

    if (
        type === "book" ||
        type === "books" ||
        type === "könyv" ||
        type === "konyv"
    ) {

        return "book";

    }


    return type;

}


/* ===================================
   SZŰRT ELEMEK
=================================== */

function getFilteredItems() {

    const items =
        Array.isArray(db.items)
            ? db.items
            : [];


    /*
       Teljes könyvtár
    */

    if (
        currentList === "all" ||
        currentList === null ||
        currentList === undefined ||
        currentList === ""
    ) {

        return items;

    }


    /*
       Saját lista.

       Az ID lehet szám vagy string,
       ezért mindkettőt String-é alakítjuk.
    */

    const wantedListId =
        String(currentList);


    return items.filter(item => {

        if (
            !Array.isArray(item.lists)
        ) {

            return false;

        }


        return item.lists.some(listId => {

            return (
                String(listId) ===
                wantedListId
            );

        });

    });

}


/* ===================================
   KÁRTYA LÉTREHOZÁSA
=================================== */

function createCard(item) {

    const card =
        document.createElement("div");


    card.className =
        "card";


    /* ===================================
       BORÍTÓ
    =================================== */

    const poster =
        document.createElement("div");


    poster.className =
        "poster";


    if (item.image) {

        const img =
            document.createElement("img");


        img.src =
            item.image;


        img.alt =
            item.title || "";


        img.loading =
            "lazy";


        img.onerror = () => {

            img.style.display =
                "none";


            poster.textContent =
                "Nincs borító";

        };


        poster.appendChild(img);

    }

    else {

        poster.textContent =
            "Nincs borító";

    }


    card.appendChild(
        poster
    );


    /* ===================================
       CÍM
    =================================== */

    const title =
        document.createElement("div");


    title.className =
        "title";


    title.textContent =
        item.title ||
        "Névtelen elem";


    card.appendChild(
        title
    );


    /* ===================================
       EREDETI CÍM
    =================================== */

    if (item.originalTitle) {

        const original =
            document.createElement("div");


        original.className =
            "originalTitle";


        original.textContent =
            item.originalTitle;


        card.appendChild(
            original
        );

    }


    /* ===================================
       TÍPUS
    =================================== */

    const type =
        normalizeItemType(item);


    /*
       Csak könyvnél írjuk ki külön,
       hogy ne változtassuk meg nagyon
       a régi kártyák kinézetét.
    */

    if (
        type === "book"
    ) {

        const typeLabel =
            document.createElement("div");


        typeLabel.className =
            "itemType";


        typeLabel.textContent =
            "📖 Könyv";


        card.appendChild(
            typeLabel
        );

    }


    /* ===================================
       ÉV
    =================================== */

    if (item.year) {

        const year =
            document.createElement("div");


        year.className =
            "movieYear";


        year.textContent =
            "📅 " +
            item.year;


        card.appendChild(
            year
        );

    }


    /* ===================================
       MŰFAJOK
    =================================== */

    if (
        Array.isArray(item.genres) &&
        item.genres.length > 0
    ) {

        const genres =
            document.createElement("div");


        genres.className =
            "movieGenres";


        genres.textContent =
            "🎭 " +
            item.genres.join(" • ");


        card.appendChild(
            genres
        );

    }


    /* ===================================
       BEFEJEZÉS
    =================================== */

    if (item.finished) {

        const finished =
            document.createElement("div");


        finished.className =
            "finishedDate";


        finished.textContent =
            "✅ " +
            item.finished;


        card.appendChild(
            finished
        );

    }


    /* ===================================
       KATTINTÁS
    =================================== */

    card.onclick = () => {

        if (
            typeof openEditor ===
            "function"
        ) {

            openEditor(item);

        }

    };


    return card;

}


/* ===================================
   RENDEZÉS
=================================== */

function getSortedItems(items) {

    if (
        typeof sortItems ===
        "function"
    ) {

        return sortItems(items);

    }


    return [...items].sort(
        (a, b) => {

            return (
                a.title || ""
            ).localeCompare(
                b.title || "",
                "hu"
            );

        }
    );

}


/* ===================================
   KÖNYVTÁR MEGJELENÍTÉSE
=================================== */

function renderItems() {

    const moviesGrid =
        document.getElementById(
            "moviesGrid"
        );


    const seriesGrid =
        document.getElementById(
            "seriesGrid"
        );


    const animeGrid =
        document.getElementById(
            "animeGrid"
        );


    const booksGrid =
        document.getElementById(
            "booksGrid"
        );


    /* ===================================
       GRIDEK ÜRÍTÉSE
    =================================== */

    if (moviesGrid) {

        moviesGrid.innerHTML =
            "";

    }


    if (seriesGrid) {

        seriesGrid.innerHTML =
            "";

    }


    if (animeGrid) {

        animeGrid.innerHTML =
            "";

    }


    if (booksGrid) {

        booksGrid.innerHTML =
            "";

    }


    /* ===================================
       ADATOK
    =================================== */

    const filteredItems =
        getFilteredItems();


    const items =
        getSortedItems(
            filteredItems
        );


    /* ===================================
       ELEMEK SZÉTVÁLOGATÁSA
    =================================== */

    items.forEach(item => {

        const type =
            normalizeItemType(item);


        const card =
            createCard(item);


        /* ===============================
           🎬 FILM
        =============================== */

        if (
            type === "movie"
        ) {

            if (moviesGrid) {

                moviesGrid.appendChild(
                    card
                );

            }

            return;

        }


        /* ===============================
           📺 SOROZAT
        =============================== */

        if (
            type === "series"
        ) {

            if (seriesGrid) {

                seriesGrid.appendChild(
                    card
                );

            }

            return;

        }


        /* ===============================
           🌸 ANIME
        =============================== */

        if (
            type === "anime"
        ) {

            if (animeGrid) {

                animeGrid.appendChild(
                    card
                );

            }

            return;

        }


        /* ===============================
           📖 KÖNYV
        =============================== */

        if (
            type === "book"
        ) {

            if (booksGrid) {

                booksGrid.appendChild(
                    card
                );

            }

            return;

        }

    });

}


/* ===================================
   RÉGI FÜGGVÉNYEK KOMPATIBILITÁSA
=================================== */

function renderMovies() {

    renderItems();

}


function renderLibrary() {

    renderItems();

}
