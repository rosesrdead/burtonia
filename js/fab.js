/* ===================================
   BURTONIA - FAB
=================================== */


/* ===================================
   FAB MENÜ MEGNYITÁSA / BEZÁRÁSA
=================================== */

function toggleFab() {

    if (!fab || !fabMenu) {
        return;
    }


    const isOpen =
        fabMenu.style.display === "flex";


    if (isOpen) {

        fabMenu.style.display = "none";

    } else {

        fabMenu.style.display = "flex";

    }

}


/* ===================================
   FAB BEZÁRÁSA
=================================== */

function closeFab() {

    if (!fabMenu) {
        return;
    }

    fabMenu.style.display = "none";

}


/* ===================================
   ÚJ ELEM
=================================== */

function handleAddNewItem() {

    closeFab();


    /*
       Alapértelmezett típus:
       film
    */

    if (typeof openModal === "function") {

        openModal("movie");

        return;

    }


    /*
       Biztonsági tartalék:
       ha a modal.js valamiért később
       töltődne be.
    */

    console.warn(
        "BURTONIA: openModal() nem érhető el."
    );

}


/* ===================================
   FAB ÉS MENÜ BEKÖTÉSE
=================================== */

function setupFab() {

    if (fab) {

        fab.onclick = function(event) {

            event.preventDefault();
            event.stopPropagation();

            toggleFab();

        };

    }


    if (addNewItem) {

        addNewItem.onclick = function(event) {

            event.preventDefault();
            event.stopPropagation();

            handleAddNewItem();

        };

    }


    /*
       A „+” menü bezárása,
       ha máshova kattintunk.
    */

    document.addEventListener(
        "click",
        function(event) {

            if (!fab || !fabMenu) {
                return;
            }


            if (
                event.target === fab ||
                fab.contains(event.target) ||
                fabMenu.contains(event.target)
            ) {

                return;

            }


            closeFab();

        }
    );

}


/* ===================================
   DOM BETÖLTÉS UTÁN
=================================== */

if (document.readyState === "loading") {

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
