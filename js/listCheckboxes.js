/* ===================================
   BURTONIA - List Checkboxes
=================================== */


/* ===================================
   LISTÁK CHECKBOXAINAK MEGJELENÍTÉSE
=================================== */

function renderListCheckboxes(selectedLists = []) {

    const container =
        document.getElementById(
            "listCheckboxContainer"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    /* ===================================
       NINCS MÉG LISTA
    =================================== */

    if (
        !db ||
        !Array.isArray(db.lists) ||
        db.lists.length === 0
    ) {

        const empty =
            document.createElement("div");


        empty.className =
            "listCheckboxEmpty";


        empty.textContent =
            "Még nincs létrehozott lista.";


        container.appendChild(empty);

        return;

    }


    /* ===================================
       KIVÁLASZTOTT LISTÁK EGYSÉGESÍTÉSE
    =================================== */

    const selectedIds =
        selectedLists.map(id =>
            String(id)
        );


    /* ===================================
       LISTÁK KIRAJZOLÁSA
    =================================== */

    db.lists.forEach(list => {

        const label =
            document.createElement("label");


        const checkbox =
            document.createElement("input");


        checkbox.type =
            "checkbox";


        checkbox.value =
            String(list.id);


        checkbox.checked =
            selectedIds.includes(
                String(list.id)
            );


        const icon =
            list.icon || "📝";


        label.appendChild(
            checkbox
        );


        label.appendChild(
            document.createTextNode(
                " " +
                icon +
                " " +
                list.name
            )
        );


        container.appendChild(
            label
        );

    });

}


/* ===================================
   KIVÁLASZTOTT LISTÁK LEKÉRÉSE
=================================== */

function getSelectedLists() {

    return [
        ...document.querySelectorAll(
            "#listCheckboxContainer input[type='checkbox']:checked"
        )
    ].map(cb => {

        return Number(cb.value);

    });

}
