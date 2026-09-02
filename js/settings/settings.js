/* ===================================
   BURTONIA - Settings
=================================== */


/* ===================================
   BEÁLLÍTÁSOK ABLAK
=================================== */

const settingsButton =
    document.getElementById("settingsButton");

const settingsModal =
    document.getElementById("settingsModal");

const closeSettings =
    document.getElementById("closeSettings");


if(settingsButton && settingsModal){

    settingsButton.onclick = ()=>{

        settingsModal.style.display = "flex";

    };

}


if(closeSettings && settingsModal){

    closeSettings.onclick = ()=>{

        settingsModal.style.display = "none";

    };

}


if(settingsModal){

    settingsModal.onclick = event=>{

        if(event.target === settingsModal){

            settingsModal.style.display = "none";

        }

    };

}


document.addEventListener(
    "keydown",
    event=>{

        if(
            event.key === "Escape" &&
            settingsModal
        ){

            settingsModal.style.display = "none";

        }

    }
);


/* ===================================
   BETŰMÉRET
=================================== */

const fontSize =
    document.getElementById("fontSize");

const fontSizeValue =
    document.getElementById("fontSizeValue");


if(fontSize){

    const savedSize =
        localStorage.getItem("fontSize") || 16;


    fontSize.value =
        savedSize;


    if(fontSizeValue){

        fontSizeValue.textContent =
            savedSize + " px";

    }


    document.documentElement.style.setProperty(
        "--font-size",
        savedSize + "px"
    );


    fontSize.oninput = ()=>{

        const value =
            fontSize.value;


        if(fontSizeValue){

            fontSizeValue.textContent =
                value + " px";

        }


        document.documentElement.style.setProperty(
            "--font-size",
            value + "px"
        );


        localStorage.setItem(
            "fontSize",
            value
        );

    };

}


/* ===================================
   BETŰVASTAGSÁG
=================================== */

const fontWeight =
    document.getElementById("fontWeight");

const fontWeightValue =
    document.getElementById("fontWeightValue");


if(fontWeight){

    const savedWeight =
        localStorage.getItem("fontWeight") || 500;


    fontWeight.value =
        savedWeight;


    if(fontWeightValue){

        fontWeightValue.textContent =
            savedWeight;

    }


    document.documentElement.style.setProperty(
        "--font-weight",
        savedWeight
    );


    fontWeight.oninput = ()=>{

        const value =
            fontWeight.value;


        if(fontWeightValue){

            fontWeightValue.textContent =
                value;

        }


        document.documentElement.style.setProperty(
            "--font-weight",
            value
        );


        localStorage.setItem(
            "fontWeight",
            value
        );

    };

}
