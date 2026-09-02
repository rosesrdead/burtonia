/* ===================================
   BURTONIA - Item Lists
=================================== */


/* ===================================
   LISTÁK MEGJELENÍTÉSE
=================================== */

function renderListCheckboxes() {

    const container =
        document.getElementById("listContainer");


    if (!container) {

        return;

    }


    container.innerHTML = "";


    db.lists.forEach(list => {

        const label =
            document.createElement("label");


        const checkbox =
            document.createElement("input");


        checkbox.type =
            "checkbox";


        checkbox.value =
            list.id;


        label.appendChild(
            checkbox
        );


        const text =
            document.createTextNode(
                " " +
                (list.icon || "📝") +
                " " +
                list.name
            );


        label.appendChild(
            text
        );


        container.appendChild(
            label
        );

    });

}


/* ===================================
   KIVÁLASZTOTT LISTÁK
=================================== */

function getSelectedLists() {

    return [

        ...document.querySelectorAll(
            "#listContainer input:checked"
        )

    ].map(cb => {

        return Number(
            cb.value
        );

    });

}


/* ===================================
   LISTÁK BEÁLLÍTÁSA ELEMHEZ
=================================== */

function setItemLists(item) {

    const checkboxes =
        document.querySelectorAll(
            "#listContainer input"
        );


    checkboxes.forEach(cb => {

        cb.checked = false;

    });


    if (!item.lists) {

        return;

    }


    checkboxes.forEach(cb => {

        cb.checked =
            item.lists.includes(
                Number(cb.value)
            );

    });

}
