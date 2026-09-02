/* ===================================
   BURTONIA - Lista checkboxok
=================================== */

function renderListCheckboxes(){

    const container =
        document.getElementById("listCheckboxContainer");


    if(!container){

        return;

    }


    container.innerHTML = "";


    if(!Array.isArray(db.lists) || db.lists.length === 0){

        const empty =
            document.createElement("div");

        empty.textContent =
            "Még nincs létrehozott lista.";

        empty.style.color = "#777";

        container.appendChild(empty);

        return;

    }


    db.lists.forEach(list => {

        const label =
            document.createElement("label");


        const checkbox =
            document.createElement("input");


        checkbox.type =
            "checkbox";

        checkbox.value =
            list.id;

        checkbox.dataset.listId =
            list.id;


        label.appendChild(checkbox);


        label.appendChild(
            document.createTextNode(
                " " +
                (list.icon || "📝") +
                " " +
                list.name
            )
        );


        container.appendChild(label);

    });

}


function getSelectedLists(){

    const checkboxes =
        document.querySelectorAll(
            "#listCheckboxContainer input:checked"
        );


    return [...checkboxes].map(
        checkbox => Number(checkbox.value)
    );

}


function setSelectedLists(item){

    const checkboxes =
        document.querySelectorAll(
            "#listCheckboxContainer input"
        );


    checkboxes.forEach(checkbox => {

        checkbox.checked =
            Array.isArray(item.lists) &&
            item.lists.includes(
                Number(checkbox.value)
            );

    });

}
