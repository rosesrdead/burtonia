/* ===================================
   BURTONIA - Render Items
=================================== */


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
   KÁRTYA
=================================== */

function createCard(item) {

    const card =
        document.createElement("div");


    card.className =
        "card";


    /* ===== BORÍTÓ ===== */

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
            item.title;


        poster.appendChild(img);

    }

    else {

        poster.textContent =
            "Nincs borító";

    }


    /* ===== CÍM ===== */

    const title =
        document.createElement("div");


    title.className =
        "title";


    title.textContent =
        getStatusIcon(
            item.status,
            item.type
        )
        + " "
        + item.title;


    card.appendChild(poster);

    card.appendChild(title);


    /* ===== MEGJELENÉSI ÉV ===== */

    if (item.year) {

        const year =
            document.createElement("div");


        year.className =
            "movieYear";


        year.textContent =
            "📅 " + item.year;


        card.appendChild(year);

    }


    /* ===== MŰFAJOK ===== */

    if (
        item.genres &&
        item.genres.length
    ) {

        const genres =
            document.createElement("div");


        genres.className =
            "movieGenres";


        genres.textContent =
            "🎭 " +
            item.genres.join(" • ");


        card.appendChild(genres);

    }


    /* ===== EREDETI CÍM ===== */

    if (item.originalTitle) {

        const original =
            document.createElement("div");


        original.className =
            "originalTitle";


        original.textContent =
            item.originalTitle;


        card.appendChild(original);

    }


    /* ===== BEFEJEZÉS ===== */

    if (item.finished) {

        const finished =
            document.createElement("div");


        finished.className =
            "finishedDate";


        finished.textContent =
            "✅ " +
            item.finished;


        card.appendChild(finished);

    }


    /* ===== SZERKESZTÉS ===== */

    card.onclick = () => {

        openEditor(item);

    };


    return card;

}


/* ===================================
   FILMEK / SOROZATOK / ANIME / KÖNYVEK
=================================== */

function renderItems() {

    moviesGrid.innerHTML =
        "";


    seriesGrid.innerHTML =
        "";


    /*
       Anime és könyv külön megjelenítése,
       ha léteznek a HTML-ben.
    */

    const animeGrid =
        document.getElementById("animeGrid");


    const booksGrid =
        document.getElementById("booksGrid");


    if (animeGrid) {

        animeGrid.innerHTML =
            "";

    }


    if (booksGrid) {

        booksGrid.innerHTML =
            "";

    }


    const items =
        sortItems(
            getFilteredItems()
        );


    items.forEach(item => {

        const card =
            createCard(item);


        /* ===== FILM ===== */

        if (
            item.type === "movie"
        ) {

            moviesGrid.appendChild(
                card
            );

        }


        /* ===== SOROZAT ===== */

        else if (
            item.type === "series"
        ) {

            seriesGrid.appendChild(
                card
            );

        }


        /* ===== ANIME ===== */

        else if (
            item.type === "anime"
        ) {

            if (animeGrid) {

                animeGrid.appendChild(
                    card
                );

            }

        }


        /* ===== KÖNYV ===== */

        else if (
            item.type === "book"
        ) {

            if (booksGrid) {

                booksGrid.appendChild(
                    card
                );

            }

        }

    });

}
