/* ===================================
   BURTONIA - Movies / Library
=================================== */


/* ===================================
   SZŰRT ELEMEK
=================================== */

function getFilteredItems() {

    /*
       "all" = teljes könyvtár
    */

    if (currentList === "all") {

        return Array.isArray(db.items)
            ? db.items
            : [];

    }


    /*
       Saját lista esetén csak azok az
       elemek jelenjenek meg, amelyek
       benne vannak a listában.
    */

    return db.items.filter(item => {

        if (!Array.isArray(item.lists)) {

            return false;

        }


        return item.lists.some(

            id =>
                Number(id) ===
                Number(currentList)

        );

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
        item.genres.length
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


    /*
       Ha nincs sortItems,
       akkor ABC szerint rendezünk.
    */

    return [...items].sort(
        (a, b) =>
            (a.title || "").localeCompare(
                b.title || "",
                "hu"
            )
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


    /*
       Minden szekció ürítése.
    */

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


    /*
       Adatok lekérése.
    */

    const filteredItems =
        getFilteredItems();


    const items =
        getSortedItems(
            filteredItems
        );


    /*
       Minden elem a saját
       típusának megfelelő helyre kerül.
    */

    items.forEach(item => {

        const card =
            createCard(item);


        /*
           FILM
        */

        if (
            item.type ===
            "movie"
        ) {

            if (moviesGrid) {

                moviesGrid.appendChild(
                    card
                );

            }

            return;

        }


        /*
           SOROZAT
        */

        if (
            item.type ===
            "series"
        ) {

            if (seriesGrid) {

                seriesGrid.appendChild(
                    card
                );

            }

            return;

        }


        /*
           ANIME
        */

        if (
            item.type ===
            "anime"
        ) {

            if (animeGrid) {

                animeGrid.appendChild(
                    card
                );

            }

            return;

        }


        /*
           KÖNYV
        */

        if (
            item.type ===
            "book"
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
   KOMPATIBILITÁS
=================================== */

/*
   Régebbi kódból érkező renderMovies()
   hívások esetére.
*/

function renderMovies() {

    renderItems();

}


/*
   Régebbi kódból érkező
   renderLibrary() hívások esetére.
*/

function renderLibrary() {

    renderItems();

}
