function updateCoverPreview(src){

    if(!coverPreview){

        return;

    }

    if(!src){

        coverPreview.innerHTML =
            "Nincs borító";

        return;

    }

    coverPreview.innerHTML =
        `<img src="${src}">`;

}

itemCoverUrl.oninput = ()=>{

    updateCoverPreview(

        itemCoverUrl.value.trim()

    );

};

itemCover.onchange = ()=>{

    if(!itemCover.files.length){

        return;

    }

    const reader = new FileReader();

    reader.onload = e=>{

        updateCoverPreview(

            e.target.result

        );

    };

    reader.readAsDataURL(

        itemCover.files[0]

    );

};