/* ===================================
   BURTONIA - Modal
=================================== */


/* ===================================
   MODAL MEGNYITÁSA
=================================== */

function openModal(type) {

    editMode = false;

    selectedItem = null;

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

    itemTitle.value = "";

    itemOriginalTitle.value = "";

    itemCover.value = "";

    itemCoverUrl.value = "";

    itemFinished.value = "";

    itemYear.value = "";


    /* ===================================
       BORÍTÓ
    =================================== */

    updateCoverPreview("");


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

    const genreCheckboxes =
        document.querySelectorAll(
            "#genreContainer input[type='checkbox']"
        );


    genreCheckboxes.forEach(cb => {

        cb.checked = false;

    });


    /* ===================================
       LISTÁK
    =================================== */

    renderListCheckboxes([]);


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


    selectedItem = null;

    editMode = false;

}


/* ===================================
   MÉGSE
=================================== */

cancelItem.onclick =
    closeModal;


/* ===================================
   HÁTTÉRRE KATTINTÁS
=================================== */

modal.onclick = (e) => {

    if (e.target === modal) {

        closeModal();

    }

};


/* ===================================
   ÚJ FILM
=================================== */

addMovie.onclick = () => {

    openModal("movie");

};


/* ===================================
   ÚJ SOROZAT
=================================== */

addSeries.onclick = () => {

    openModal("series");

};


/* ===================================
   ÚJ ANIME
=================================== */

addAnime.onclick = () => {

    openModal("anime");

};


/* ===================================
   ÚJ KÖNYV
=================================== */

addBook.onclick = () => {

    openModal("book");

};


/* ===================================
   ESCAPE
=================================== */

document.addEventListener(
    "keydown",
    e => {

        if (e.key === "Escape") {

            closeModal();

            closeFab();

        }

    }
);
