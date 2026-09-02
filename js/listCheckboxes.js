/* ===================================
   BURTONIA - List Checkboxes
=================================== */


/* ===================================
   LISTÁK CHECKBOXAINAK MEGJELENÍTÉSE
=================================== */

function renderListCheckboxes(selectedLists = []) {

    const container =
        document.getElementById("listCheckboxContainer");


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (!db || !db.lists || db.lists.length === 0) {

        const empty =
            document.createElement("div");

        empty.className = "listCheckboxEmpty";

        empty.textContent =
            "Még nincs létrehozott lista.";

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


        checkbox.checked =
            selectedLists.includes(list.id);


        label.appendChild(checkbox);


        const icon =
            list.icon || "📝";


        label.appendChild(
            document.createTextNode(
                icon + " " + list.name
            )
        );


        container.appendChild(label);

    });

}


/* ===================================
   KIVÁLASZTOTT LISTÁK LEKÉRÉSE
=================================== */

function getSelectedLists() {

    return [
        ...document.querySelectorAll(
            "#listCheckboxContainer input:checked"
        )
    ].map(cb => {

        return Number(cb.value);

    });

}
