/* ===================================
   BURTONIA - Status
=================================== */


const STATUS = {


    /* ===================================
       FILM
    =================================== */

    movie: [

        {
            value:
                "planned",

            text:
                "📋 Megnézendő",

            icon:
                "📋"
        },

        {
            value:
                "watching",

            text:
                "▶️ Nézés alatt",

            icon:
                "▶️"
        },

        {
            value:
                "finished",

            text:
                "✅ Megnézve",

            icon:
                "✅"
        }

    ],


    /* ===================================
       SOROZAT
    =================================== */

    series: [

        {
            value:
                "planned",

            text:
                "📋 Megnézendő",

            icon:
                "📋"
        },

        {
            value:
                "watching",

            text:
                "📺 Nézés alatt",

            icon:
                "📺"
        },

        {
            value:
                "finished",

            text:
                "✅ Befejezve",

            icon:
                "✅"
        }

    ],


    /* ===================================
       ANIME
    =================================== */

    anime: [

        {
            value:
                "planned",

            text:
                "📋 Megnézendő",

            icon:
                "📋"
        },

        {
            value:
                "watching",

            text:
                "🍥 Nézés alatt",

            icon:
                "🍥"
        },

        {
            value:
                "finished",

            text:
                "✅ Befejezve",

            icon:
                "✅"
        }

    ],


    /* ===================================
       KÖNYV
    =================================== */

    book: [

        {
            value:
                "planned",

            text:
                "📋 Elolvasandó",

            icon:
                "📋"
        },

        {
            value:
                "watching",

            text:
                "📖 Olvasás alatt",

            icon:
                "📖"
        },

        {
            value:
                "finished",

            text:
                "✅ Elolvasva",

            icon:
                "✅"
        }

    ]

};


/* ===================================
   ÁLLAPOTOK FRISSÍTÉSE
=================================== */

function refreshStatusUI() {

    itemStatus.innerHTML =
        "";


    const statuses =
        STATUS[
            itemType.value
        ] || [];


    statuses.forEach(
        status => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                status.value;


            option.textContent =
                status.text;


            itemStatus.appendChild(
                option
            );

        }
    );

}


/* ===================================
   ÁLLAPOT IKON
=================================== */

function getStatusIcon(
    status,
    type
) {

    const statuses =
        STATUS[type] || [];


    const found =
        statuses.find(
            s =>
                s.value ===
                status
        );


    return found
        ? found.icon
        : "";

}


/* ===================================
   TÍPUS VÁLTOZÁS
=================================== */

itemType.onchange =
    refreshStatusUI;
