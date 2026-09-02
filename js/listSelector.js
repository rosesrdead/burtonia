/* ===================================
   BURTONIA - List Selector
=================================== */

function renderListCheckboxes() {

    listContainer.innerHTML = "";

    db.lists.forEach(list => {

        const label = document.createElement("label");
        label.className = "listCard";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = list.id;

        const icon = document.createElement("div");
        icon.className = "listCardIcon";
        icon.textContent = list.icon || "📝";

        const name = document.createElement("div");
        name.className = "listCardName";
        name.textContent = list.name;

        label.appendChild(checkbox);
        label.appendChild(icon);
        label.appendChild(name);

        listContainer.appendChild(label);

    });

}
