/* ===================================
   BURTONIA - Modal
=================================== */


/* ===================================
   MŰFAJOK
=================================== */

function renderGenreOptions(
    type,
    selectedGenres = []
) {

    const container =
        document.getElementById(
            "genreContainer"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    /* ===================================
       FILM / SOROZAT / ANIME
    =================================== */

    const mediaGenres = [

        "Akció",
        "Animáció",
        "Anime",
        "Családi",
        "Dokumentum",
        "Dráma",
        "Fantasy",
        "Filmdráma",
        "Független film",
        "Gyerek",
        "Háborús",
        "Horror",
        "Kaland",
        "Katasztrófa",
        "Krimi",
        "Misztikus",
        "Musical",
        "Paródia",
        "Romantikus",
        "Rövidfilm",
        "Sci-Fi",
        "Stop motion",
        "Szitkom",
        "Thriller",
        "Történelmi",
        "Western",
        "Vígjáték",
        "Életrajzi"

    ];


    /* ===================================
       KÖNYVEK
    =================================== */

    const bookGenres = [

        "Fantasy",
        "Krimi",
        "Thriller",
        "Romantikus",
        "Sci-Fi",
        "Történelmi",
        "Életrajz",
        "Ismeretterjesztő",
        "Horror",
        "Ifjúsági",
        "Gyermek",
        "Pszichológia",
        "Kaland",
        "Dráma",
        "Művészet",
        "Életmód",
        "Önéletrajz",
        "Irodalom",
        "Novella",
        "Vers",
        "Mesekönyv",
        "Életrajzi",
        "Vallás",
        "Filozófia",
        "Tudomány"

    ];


    /* ===================================
       MEGFELELŐ MŰFAJLISTA
    =================================== */

    const genres =
        (
            type === "book"
                ? bookGenres
                : mediaGenres
        ).slice();


    /* ===================================
       ABC SORREND
       
       Magyar ékezetes betűket is
       megfelelően kezel.
    =================================== */

    genres.sort(
        function(a, b) {

            return a.localeCompare(
                b,
                "hu",
                {
                    sensitivity: "base"
                }
            );

        }
    );


    /* ===================================
       MŰFAJOK KIRAJZOLÁSA
    =================================== */

    genres.forEach(
        genre => {

            const label =
                document.createElement(
                    "label"
                );


            const checkbox =
                document.createElement(
                    "input"
                );


            checkbox.type =
                "checkbox";


            checkbox.value =
                genre;


            checkbox.checked =
                selectedGenres.includes(
                    genre
                );


            label.appendChild(
                checkbox
            );


            label.appendChild(
                document.createTextNode(
                    " " + genre
                )
            );


            container.appendChild(
                label
            );

        }
    );

}


/* ===================================
   MODAL MEGNYITÁSA
=================================== */

function openModal(
    type = "movie"
) {

    editMode =
        false;


    selectedItem =
        null;


    modal.style.display =
        "flex";


    /* ===================================
       CÍM
    =================================== */

    const typeTitles = {

        movie:
            "Új film",

        series:
            "Új sorozat",

        anime:
            "Új anime",

        book:
            "Új könyv"

    };


    modalTitle.textContent =
        typeTitles[type] ||
        "Új elem";


    /* ===================================
       ALAPADATOK TÖRLÉSE
    =================================== */

    itemTitle.value =
        "";


    itemOriginalTitle.value =
        "";


    itemCover.value =
        "";


    itemCoverUrl.value =
        "";


    itemFinished.value =
        "";


    itemYear.value =
        "";


    /* ===================================
       BORÍTÓ
    =================================== */

    updateCoverPreview(
        ""
    );


    /* ===================================
       TÍPUS
    =================================== */

    itemType.value =
        type;


    /* ===================================
       ÁLLAPOT
    =================================== */

    refreshStatusUI();


    itemStatus.value =
        "planned";


    /* ===================================
       MŰFAJOK
    =================================== */

    renderGenreOptions(
        type,
        []
    );


    /* ===================================
       LISTÁK
    =================================== */

    if (
        typeof renderListCheckboxes ===
        "function"
    ) {

        renderListCheckboxes(
            []
        );

    }


    /* ===================================
       MODAL
    =================================== */

    if (
        typeof updateModalForType ===
        "function"
    ) {

        updateModalForType(
            type
        );

    }

}


/* ===================================
   TÍPUS VÁLTOZÁS
=================================== */

function handleTypeChange() {

    if (!itemType) {

        return;

    }


    renderGenreOptions(
        itemType.value,
        []
    );


    if (
        typeof updateModalForType ===
        "function"
    ) {

        updateModalForType(
            itemType.value
        );

    }

}


/* ===================================
   EDIT MODAL
=================================== */

function openEditModal(
    item
) {

    if (!item) {

        return;

    }


    editMode =
        true;


    selectedItem =
        item;


    modal.style.display =
        "flex";


    const typeTitles = {

        movie:
            "Film szerkesztése",

        series:
            "Sorozat szerkesztése",

        anime:
            "Anime szerkesztése",

        book:
            "Könyv szerkesztése"

    };


    modalTitle.textContent =
        typeTitles[item.type] ||
        "Elem szerkesztése";


    itemTitle.value =
        item.title ||
        "";


    itemOriginalTitle.value =
        item.originalTitle ||
        "";


    itemCover.value =
        item.cover ||
        "";


    itemCoverUrl.value =
        item.coverUrl ||
        "";


    itemFinished.value =
        item.finished ||
        "";


    itemYear.value =
        item.year ||
        "";


    itemType.value =
        item.type ||
        "movie";


    itemStatus.value =
        item.status ||
        "planned";


    updateCoverPreview(
        item.coverUrl ||
        item.cover ||
        ""
    );


    refreshStatusUI();


    renderGenreOptions(
        item.type,
        Array.isArray(item.genres)
            ? item.genres
            : []
    );


    if (
        typeof renderListCheckboxes ===
        "function"
    ) {

        renderListCheckboxes(
            Array.isArray(item.lists)
                ? item.lists
                : []
        );

    }


    if (
        typeof updateModalForType ===
        "function"
    ) {

        updateModalForType(
            item.type
        );

    }

}


/* ===================================
   MODAL BEZÁRÁSA
=================================== */

function closeModal() {

    if (!modal) {

        return;

    }


    modal.style.display =
        "none";


    selectedItem =
        null;


    editMode =
        false;

}


/* ===================================
   KATTINTÁS A HÁTTÉRRE
=================================== */

if (
    typeof modal !== "undefined" &&
    modal
) {

    modal.addEventListener(
        "click",
        function(event) {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );

}


/* ===================================
   ESCAPE
=================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            modal &&
            modal.style.display === "flex"
        ) {

            closeModal();

        }

    }
);
