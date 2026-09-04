/* ===================================
   BURTONIA - FAB
=================================== */


/* ===================================
   MENÜ MEGNYITÁSA / BEZÁRÁSA
=================================== */

function toggleFabMenu() {

    if (!fab || !fabMenu) {

        return;

    }


    const isOpen =
        fabMenu.style.display === "flex";


    if (isOpen) {

        fabMenu.style.display =
            "none";

    } else {

        fabMenu.style.display =
            "flex";

    }

}


/* ===================================
   MENÜ BEZÁRÁSA
=================================== */

function closeFab() {

    if (!fabMenu) {

        return;

    }


    fabMenu.style.display =
        "none";

}


/* ===================================
   ÚJ ELEM
=================================== */

function addNewBurtoniaItem() {

    closeFab();


    /*
       A modal.js-ben található
       openModal() nyitja meg az
       új elem ablakot.
    */

    if (
        typeof openModal === "function"
    ) {

        openModal("movie");

        return;

    }


    console.error(
        "BURTONIA: az openModal() nem érhető el."
    );

}


/* ===================================
   FAB GOMB
=================================== */

function setupFab() {

    if (fab) {

        fab.onclick =
            function(event) {

                event.preventDefault();

                event.stopPropagation();

                toggleFabMenu();

            };

    }


    /* ===================================
       ÚJ HOZZÁADÁSA
    =================================== */

    if (addNewItem) {

        addNewItem.onclick =
            function(event) {

                event.preventDefault();

                event.stopPropagation();

                addNewBurtoniaItem();

            };

    }


    /* ===================================
       ÚJ LISTA
    =================================== */

    if (addList) {

        /*
           A lista kezelést a lists.js
           már kezeli.

           Itt nem írjuk felül.
        */

    }


    /* ===================================
       KATTINTÁS KÍVÜL
    =================================== */

    document.addEventListener(
        "click",
        function(event) {

            if (!fab || !fabMenu) {

                return;

            }


            if (
                fab.contains(event.target) ||
                fabMenu.contains(event.target)
            ) {

                return;

            }


            closeFab();

        }
    );


    /* ===================================
       ESCAPE
    =================================== */

    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Escape"
            ) {

                closeFab();

            }

        }
    );

}


/* ===================================
   INDÍTÁS
=================================== */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        setupFab,
        {
            once: true
        }
    );

} else {

    setupFab();

}
