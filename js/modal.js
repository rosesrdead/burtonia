/* ===================================
   BURTONIA - Modal
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


    /* ===== MŰFAJOK ===== */

    const genreCheckboxes =
        document.querySelectorAll(
            "#genreContainer input"
        );


    genreCheckboxes.forEach(cb => {

        cb.checked = false;

    });


    /* ===== LISTÁK ===== */

    renderListCheckboxes();


    closeFab();

}


function closeModal() {

    modal.style.display =
        "none";

    selectedItem = null;

    editMode = false;

}


cancelItem.onclick =
    closeModal;


modal.onclick = (e) => {

    if (e.target === modal) {

        closeModal();

    }

};


addMovie.onclick = () => {

    openModal("movie");

};


addSeries.onclick = () => {

    openModal("series");

};


document.addEventListener(
    "keydown",
    e => {

        if (e.key === "Escape") {

            closeModal();

            closeFab();

        }

    }
);
