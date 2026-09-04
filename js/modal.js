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


    const genres =
        type === "book"
            ? bookGenres
            : mediaGenres;


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

    renderListCheckboxes(
        []
    );


    /* ===================================
       FAB BEZÁRÁSA
    =================================== */

    closeFab();

}


/* ===================================
   MODAL BEZÁRÁSA
=================================== */

function closeModal() {

    modal.style.display =
        "none";


    selectedItem =
        null;


    editMode =
        false;

}


/* ===================================
   MÉGSE
=================================== */

cancelItem.onclick =
    closeModal;


/* ===================================
   HÁTTÉRRE KATTINTÁS
=================================== */

modal.onclick =
    e => {

        if (
            e.target === modal
        ) {

            closeModal();

        }

    };


/* ===================================
   ESCAPE
=================================== */

document.addEventListener(
    "keydown",
    e => {

        if (
            e.key === "Escape"
        ) {

            closeModal();

            closeFab();

        }

    }
);
