/* ===================================
   BURTONIA - Modal
=================================== */


/* ===================================
   MODAL MEGNYITÁSA
=================================== */

function openModal(type) {

    editMode = false;

    selectedItem = null;

    modal.style.display = "flex";


    /* ===================================
       CÍM
    =================================== */

    modalTitle.textContent =
        type === "movie"
            ? "Új film"
            : "Új sorozat";


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

    /*
       Új filmnél / sorozatnál
       egyetlen lista sincs kiválasztva.
    */

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
