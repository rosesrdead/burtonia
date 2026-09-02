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

    } else {

        poster.textContent =
            "Nincs borító";

    }


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
   FILMEK / SOROZATOK MEGJELENÍTÉSE
=================================== */

function renderItems() {

    moviesGrid.innerHTML =
        "";


    seriesGrid.innerHTML =
        "";


    const items =
        sortItems(
            getFilteredItems()
        );


    items.forEach(item => {

        const card =
            createCard(item);


        if (
            item.type === "movie"
        ) {

            moviesGrid.appendChild(
                card
            );

        } else {

            seriesGrid.appendChild(
                card
            );

        }

    });

}
