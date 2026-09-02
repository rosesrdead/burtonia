/* ===================================
   BURTONIA - Editor
=================================== */

function openEditor(item){

    selectedItem = item;

    editMode = true;

    modal.style.display = "flex";

    modalTitle.textContent = "Elem szerkesztése";

    itemTitle.value = item.title;

    itemOriginalTitle.value = item.originalTitle || "";

    itemCover.value = "";

    itemCoverUrl.value = item.image || "";

    updateCoverPreview(
        item.image || ""
    );

    itemType.value = item.type;

    refreshStatusUI();

    itemStatus.value = item.status || "planned";

    itemFinished.value = item.finished || "";

    itemYear.value = item.year || "";


    const genreCheckboxes = document.querySelectorAll("#genreContainer input");

    genreCheckboxes.forEach(cb => {

        cb.checked = false;

    });


    if(item.genres){

        genreCheckboxes.forEach(cb => {

            cb.checked = item.genres.includes(cb.value);

        });

    }


    renderListCheckboxes();


    const checkboxes = listContainer.querySelectorAll("input");

    checkboxes.forEach(cb => {

        cb.checked =
            item.lists &&
            item.lists.includes(Number(cb.value));

    });

}



function fileToBase64(file){

    return new Promise(resolve=>{

        const reader = new FileReader();

        reader.onload = e => {

            resolve(e.target.result);

        };

        reader.readAsDataURL(file);

    });

}



saveItem.onclick = async()=>{

    const title = itemTitle.value.trim();

    const originalTitle = itemOriginalTitle.value.trim();


    if(title === ""){

        alert("Adj meg címet!");

        return;

    }


    const genres = [

        ...document.querySelectorAll("#genreContainer input:checked")

    ].map(cb => cb.value);



    const checked = [

        ...listContainer.querySelectorAll("input:checked")

    ].map(cb => Number(cb.value));



    const finished = itemFinished.value;

    const year = itemYear.value;

    const status = itemStatus.value;


    let image = itemCoverUrl.value.trim();


    if(itemCover.files.length){

        image = await fileToBase64(

            itemCover.files[0]

        );

    }



    if(editMode){

        selectedItem.title = title;

        selectedItem.originalTitle = originalTitle;

        selectedItem.type = itemType.value;

        selectedItem.lists = checked;

        selectedItem.finished = finished;

        selectedItem.status = status;

        selectedItem.year = year;

        selectedItem.genres = genres;


        if(image){

            selectedItem.image = image;

        }


    }else{


        db.items.push({

            id: Date.now(),

            title: title,

            originalTitle: originalTitle,

            type: itemType.value,

            image: image,

            lists: checked,

            status: status,

            year: year,

            genres: genres,

            finished: finished || ""

        });


    }


    saveDB();

    closeModal();

    render();

};




deleteItem.onclick = ()=>{

    if(!editMode || !selectedItem){

        return;

    }


    if(!confirm("Biztosan törölni szeretnéd?")){

        return;

    }


    db.items = db.items.filter(item =>

        item.id !== selectedItem.id

    );


    selectedItem = null;

    editMode = false;


    saveDB();

    closeModal();

    render();

};