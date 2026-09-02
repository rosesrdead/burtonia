/* ===================================
   BURTONIA - Sorting
=================================== */

let currentSort =
    localStorage.getItem("burtonia_sort") || "abc";

const sortSelect = document.getElementById("sortSelect");

if(sortSelect){

    sortSelect.value = currentSort;

    sortSelect.onchange = () => {

        currentSort = sortSelect.value;

        localStorage.setItem(
            "burtonia_sort",
            currentSort
        );

        render();

    };

}

function sortItems(items){

    const sorted = [...items];

    switch(currentSort){

        case "abc":

            sorted.sort((a,b)=>

                a.title.localeCompare(

                    b.title,

                    "hu",

                    {
                        sensitivity: "base"
                    }

                )

            );

            break;

        case "za":

            sorted.sort((a,b)=>

                b.title.localeCompare(

                    a.title,

                    "hu",

                    {
                        sensitivity: "base"
                    }

                )

            );

            break;

        case "finished":

            sorted.sort((a,b)=>{

                if(!a.finished && !b.finished){

                    return 0;

                }

                if(!a.finished){

                    return 1;

                }

                if(!b.finished){

                    return -1;

                }

                return b.finished.localeCompare(
                    a.finished
                );

            });

            break;

    }

    return sorted;

}