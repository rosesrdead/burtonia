/* ===================================
   BURTONIA - Saját jegyzetek
=================================== */

(function(){

    /* ===================================
       STÍLUS
    =================================== */

    const style = document.createElement("style");

    style.textContent = `

        /* ===================================
           JEGYZET PANEL
        =================================== */

        #notesPanel{

            margin-top:20px;

            padding-top:16px;

            border-top:
                1px solid
                rgba(255,255,255,.08);

        }


        #notesPanelTitle{

            margin:0 0 10px 0;

            font-size:16px;

            font-weight:700;

            color:#ffffff;

        }


        #notesPanel textarea{

            width:100%;

            min-height:180px;

            box-sizing:border-box;

            resize:vertical;

            padding:12px;

            border-radius:14px;

            background:
                rgba(0,0,0,.18);

            color:#ffffff;

            border:
                1px solid
                rgba(255,255,255,.08);

            outline:none;

            font-family:inherit;

            font-size:14px;

            line-height:1.5;

            backdrop-filter:
                blur(12px);

            -webkit-backdrop-filter:
                blur(12px);

            box-shadow:
                0 8px 25px
                rgba(0,0,0,.18);

        }


        #notesPanel textarea::placeholder{

            color:
                rgba(255,255,255,.55);

        }


        #notesPanel textarea:focus{

            border-color:
                rgba(255,255,255,.18);

            background:
                rgba(0,0,0,.24);

        }


        #notesPanelStatus{

            margin-top:7px;

            font-size:11px;

            color:
                rgba(255,255,255,.45);

            text-align:right;

        }


        /* ===================================
           MOBIL
        =================================== */

        @media(max-width:700px){

            #notesPanel textarea{

                min-height:140px;

            }

        }

    `;

    document.head.appendChild(style);


    /* ===================================
       JEGYZET PANEL LÉTREHOZÁSA
    =================================== */

    function createNotesPanel(){

        const sidebar =
            document.getElementById(
                "sidebar"
            );


        const sidebarItems =
            document.getElementById(
                "sidebarItems"
            );


        if(
            !sidebar ||
            !sidebarItems
        ){

            return;

        }


        /*
           Ha már létezik,
           ne hozzuk létre újra.
        */

        if(
            document.getElementById(
                "notesPanel"
            )
        ){

            return;

        }


        /* ===================================
           PANEL
        =================================== */

        const panel =
            document.createElement("div");


        panel.id =
            "notesPanel";


        /* ===================================
           CÍM
        =================================== */

        const title =
            document.createElement("h3");


        title.id =
            "notesPanelTitle";


        title.textContent =
            "📝 Saját jegyzetek";


        panel.appendChild(
            title
        );


        /* ===================================
           TEXTAREA
        =================================== */

        const textarea =
            document.createElement("textarea");


        textarea.placeholder =
            "Ide írhatod, mit kell még megcsinálni...";


        textarea.spellcheck =
            true;


        /* ===================================
           MENTÉS
        =================================== */

        const storageKey =
            "burtonia_notes";


        try{

            textarea.value =
                localStorage.getItem(
                    storageKey
                ) || "";

        }

        catch(error){

            textarea.value =
                "";

        }


        textarea.addEventListener(
            "input",
            function(){

                try{

                    localStorage.setItem(
                        storageKey,
                        textarea.value
                    );

                }

                catch(error){

                    console.warn(
                        "A jegyzet mentése sikertelen.",
                        error
                    );

                }

                status.textContent =
                    "Automatikusan mentve";

            }
        );


        panel.appendChild(
            textarea
        );


        /* ===================================
           ÁLLAPOT
        =================================== */

        const status =
            document.createElement("div");


        status.id =
            "notesPanelStatus";


        status.textContent =
            "Automatikusan mentve";


        panel.appendChild(
            status
        );


        /* ===================================
           SIDEBAR ALÁ
        =================================== */

        sidebar.appendChild(
            panel
        );

    }


    /* ===================================
       INDÍTÁS
    =================================== */

    function initNotesPanel(){

        createNotesPanel();

    }


    /*
       Ha a DOM már betöltődött
    */

    if(
        document.readyState ===
        "loading"
    ){

        document.addEventListener(
            "DOMContentLoaded",
            initNotesPanel
        );

    }

    else{

        initNotesPanel();

    }

})();
