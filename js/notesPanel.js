/* ===================================
   BURTONIA - Saját jegyzetek
=================================== */

(function(){

    const STORAGE_KEY = "burtonia_notes";


    /* ===================================
       STÍLUS
    =================================== */

    const style = document.createElement("style");

    style.textContent = `

        #notesPanel{

            margin-top:18px;

            padding-top:16px;

            border-top:
                1px solid
                rgba(255,255,255,.08);

        }


        #notesPanelTitle{

            margin:0 0 10px 0;

            color:#ffffff;

            font-size:16px;

            font-weight:700;

        }


        #notesPanel textarea{

            display:block;

            width:100%;

            min-height:170px;

            box-sizing:border-box;

            padding:12px;

            resize:vertical;

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

        }


        #notesPanel textarea::placeholder{

            color:
                rgba(255,255,255,.5);

        }


        #notesPanel textarea:focus{

            border-color:
                rgba(255,255,255,.18);

            background:
                rgba(0,0,0,.24);

        }


        #notesPanelStatus{

            margin-top:6px;

            text-align:right;

            font-size:11px;

            color:
                rgba(255,255,255,.45);

        }

    `;

    document.head.appendChild(style);


    /* ===================================
       PANEL LÉTREHOZÁSA
    =================================== */

    function createNotesPanel(){

        const sidebar =
            document.getElementById("sidebar");


        const sidebarItems =
            document.getElementById("sidebarItems");


        if(!sidebar){

            return;

        }


        if(
            document.getElementById("notesPanel")
        ){

            return;

        }


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


        panel.appendChild(title);


        /* ===================================
           SZÖVEGMEZŐ
        =================================== */

        const textarea =
            document.createElement("textarea");


        textarea.placeholder =
            "Ide írhatsz bármit, amit még meg kell csinálni...";


        textarea.value =
            localStorage.getItem(
                STORAGE_KEY
            ) || "";


        /* ===================================
           ÁLLAPOT
        =================================== */

        const status =
            document.createElement("div");


        status.id =
            "notesPanelStatus";


        status.textContent =
            "Automatikusan mentve";


        /* ===================================
           AUTOMATIKUS MENTÉS
        =================================== */

        textarea.addEventListener(
            "input",
            () => {

                localStorage.setItem(
                    STORAGE_KEY,
                    textarea.value
                );


                status.textContent =
                    "Mentve ✓";

            }
        );


        /* ===================================
           PANEL FELÉPÍTÉSE
        =================================== */

        panel.appendChild(
            textarea
        );

        panel.appendChild(
            status
        );


        /* ===================================
           SIDEBAR ALJÁRA
        =================================== */

        sidebar.appendChild(
            panel
        );

    }


    /* ===================================
       INDÍTÁS
    =================================== */

    function init(){

        createNotesPanel();

    }


    if(
        document.readyState ===
        "loading"
    ){

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    }

    else{

        init();

    }

})();
