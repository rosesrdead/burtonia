/* ===================================
   BURTONIA - Editor
=================================== */


function openEditor(item) {

    selectedItem = item;

    editMode = true;

    modal.style.display = "flex";

    modalTitle.textContent =
        "Elem szerkesztése";


    itemTitle.value =
        item.title || "";


    itemOriginalTitle.value =
        item.originalTitle || "";


    itemCover.value = "";


    itemCoverUrl.value =
        item.image || "";


    updateCoverPreview(
        item.image || ""
    );


    itemType.value =
        item.type || "movie";


    refreshStatusUI();


    itemStatus.value =
        item.status || "planned";


    itemFinished.value =
        item.finished || "";


    itemYear.value =
        item.year || "";


    /* ===== MŰFAJOK ===== */

    const genreCheckboxes =
        document.querySelectorAll(
            "#genreContainer input"
        );


    genreCheckboxes.forEach(cb => {

        cb.checked = false;

    });


    if (item.genres) {

        genreCheckboxes.forEach(cb => {

            cb.checked =
                item.genres.includes(
                    cb.value
                );

        });

    }

}


/* ===================================
   FILE → BASE64
=================================== */

function fileToBase64(file) {

    return new Promise(resolve => {

        const reader =
            new FileReader();


        reader.onload = e => {

            resolve(
                e.target.result
            );

        };


        reader.readAsDataURL(file);

    });

}


/* ===================================
   MENTÉS
=================================== */

saveItem.onclick = async () => {

    const title =
        itemTitle.value.trim();


    const originalTitle =
        itemOriginalTitle.value.trim();


    if (title === "") {

        alert("Adj meg címet!");

        return;

    }


    /* ===== MŰFAJOK ===== */

    const genres = [

        ...document.querySelectorAll(
            "#genreContainer input:checked"
        )

    ].map(cb => cb.value);


    const finished =
        itemFinished.value;


    const year =
        itemYear.value;


    const status =
        itemStatus.value;


    let image =
        itemCoverUrl.value.trim();


    if (itemCover.files.length) {

        image =
            await fileToBase64(
                itemCover.files[0]
            );

    }


    /* ===== SZERKESZTÉS ===== */

    if (editMode) {

        selectedItem.title =
            title;


        selectedItem.originalTitle =
            originalTitle;


        selectedItem.type =
            itemType.value;


        selectedItem.finished =
            finished;


        selectedItem.status =
            status;


        selectedItem.year =
            year;


        selectedItem.genres =
            genres;


        if (image) {

            selectedItem.image =
                image;

        }

    }


    /* ===== ÚJ ELEM ===== */

    else {

        db.items.push({

            id: Date.now(),

            title: title,

            originalTitle:
                originalTitle,

            type:
                itemType.value,

            image:
                image,

            status:
                status,

            year:
                year,

            genres:
                genres,

            finished:
                finished || ""

        });

    }


    saveDB();

    closeModal();

    render();

};


/* ===================================
   TÖRLÉS
=================================== */

deleteItem.onclick = () => {

    if (
        !editMode ||
        !selectedItem
    ) {

        return;

    }


    if (
        !confirm(
            "Biztosan törölni szeretnéd?"
        )
    ) {

        return;

    }


    db.items =
        db.items.filter(item =>

            item.id !==
            selectedItem.id

        );


    selectedItem = null;

    editMode = false;


    saveDB();

    closeModal();

    render();

};
