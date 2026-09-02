const THEME_KEY = "burtonia_theme";

let theme = {

    backgroundColor: "#111111",

    wallpaper: "",

    overlay: 35,

    preset: "default"

};

const backgroundOverlay =
    document.getElementById("backgroundOverlay");

const backgroundText =
    document.getElementById("backgroundText");

const applyBackground =
    document.getElementById("applyBackground");

const backgroundPicker =
    document.getElementById("backgroundPicker");

const overlaySlider =
    document.getElementById("overlaySlider");

const changeWallpaper =
    document.getElementById("changeWallpaper");

const removeWallpaper =
    document.getElementById("removeWallpaper");

const presetButtons =
    document.querySelectorAll(".themePreset");

const PRESET_THEMES = {

    default: {

        backgroundColor: "#111111"

    },

    burtonBlack: {

        backgroundColor: "#000000"

    },

    gothicNight: {

        backgroundColor: "#161622"

    },

    bloodRed: {

        backgroundColor: "#3b0a0a"

    },

    darkForest: {

        backgroundColor: "#132218"

    },

    midnightBlue: {

        backgroundColor: "#0f1c38"

    },

    royalPurple: {

        backgroundColor: "#2c1646"

    },

    ivory: {

        backgroundColor: "#ece8dc"

    }

};

function loadTheme(){

    const saved = localStorage.getItem(THEME_KEY);

    if(!saved){

        return;

    }

    try{

        theme = {

            ...theme,

            ...JSON.parse(saved)

        };

    }catch{

        localStorage.removeItem(THEME_KEY);

    }

}

function saveTheme(){

    localStorage.setItem(

        THEME_KEY,

        JSON.stringify(theme)

    );

}

function applyTheme(){

    document.body.style.backgroundColor =
        theme.backgroundColor;

    if(backgroundText){

        backgroundText.value =
            theme.backgroundColor;

    }

    if(

        backgroundPicker &&

        /^#([0-9A-F]{6})$/i.test(

            theme.backgroundColor

        )

    ){

        backgroundPicker.value =
            theme.backgroundColor;

    }

    if(backgroundOverlay){

        backgroundOverlay.style.background =

            `rgba(0,0,0,${
                theme.overlay / 100
            })`;

    }

    if(overlaySlider){

        overlaySlider.value =
            theme.overlay;

    }

}
function setBackgroundColor(color){

    const value = color.trim();

    if(value === ""){

        return;

    }

    theme.backgroundColor = value;

    theme.preset = "default";

    applyTheme();

    saveTheme();

}

if(applyBackground){

    applyBackground.onclick = ()=>{

        setBackgroundColor(

            backgroundText.value

        );

    };

}

if(backgroundPicker){

    backgroundPicker.oninput = ()=>{

        setBackgroundColor(

            backgroundPicker.value

        );

    };

}

presetButtons.forEach(button=>{

    button.onclick = ()=>{

        const name =

            button.dataset.theme;

        const preset =

            PRESET_THEMES[name];

        if(!preset){

            return;

        }

        theme.backgroundColor =

            preset.backgroundColor;

        theme.preset = name;

        applyTheme();

        saveTheme();

    };

});

if(overlaySlider){

    overlaySlider.oninput = ()=>{

        theme.overlay =

            Number(

                overlaySlider.value

            );

        applyTheme();

        saveTheme();

    };

}

loadTheme();

applyTheme();