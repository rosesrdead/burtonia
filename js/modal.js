/* ===================================
   BURTONIA - Modal
=================================== */


/* ===================================
   ÚJ FILM / ÚJ SOROZAT
=================================== */

function openModal(type) {

    editMode = false;

    selectedItem = null;

    modal.style.display = "flex";


    modalTitle.textContent =
        type === "movie"
            ? "Új film"
            : "Új sorozat";


    itemTitle.value = "";

    itemOriginalTitle.value = "";

    itemCover.value = "";

    itemCoverUrl.value = "";


    updateCoverPreview("");


    itemType.value =
        type;


    itemStatus.value =
        "planned";


    itemFinished.value = "";


    refreshStatusUI();


    closeFab();

}


/* ===================================
   MODAL BEZÁRÁSA
=================================== */

function closeModal() {

    modal.style.display = "none";

    selectedItem = null;

    editMode = false;

}


/* ===================================
   MÉGSE
=================================== */

cancelItem.onclick =
    closeModal;


/* ===================================
   KATTINTÁS A HÁTTÉRRE
=================================== */

modal.onclick = e => {

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
   ESC
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
