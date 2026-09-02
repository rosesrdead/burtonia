/* ===================================
   BURTONIA - List Selector
=================================== */

function renderListCheckboxes() {

    listContainer.innerHTML = "";

    db.lists.forEach(list => {

        const label = document.createElement("label");

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.value = list.id;


        label.appendChild(checkbox);


        const icon = list.icon || "📝";

        label.appendChild(
            document.createTextNode(
                icon + " " + list.name
            )
        );


        listContainer.appendChild(label);

    });

}
