const wallpaperInput = document.createElement("input");

wallpaperInput.type = "file";

wallpaperInput.accept = "image/*";

wallpaperInput.style.display = "none";

document.body.appendChild(wallpaperInput);

function applyWallpaper(){

    if(theme.wallpaper){

        document.body.style.backgroundImage =
            `url(${theme.wallpaper})`;

        document.body.style.backgroundSize =
            "cover";

        document.body.style.backgroundRepeat =
            "no-repeat";

        document.body.style.backgroundPosition =
            "center";

        document.body.style.backgroundAttachment =
            "fixed";

    }else{

        document.body.style.backgroundImage = "";

    }

}

async function wallpaperToBase64(file){

    return new Promise(resolve=>{

        const reader = new FileReader();

        reader.onload = e=>{

            resolve(e.target.result);

        };

        reader.readAsDataURL(file);

    });

}

changeWallpaper.onclick = ()=>{

    wallpaperInput.click();

};

wallpaperInput.onchange = async()=>{

    if(!wallpaperInput.files.length){

        return;

    }

    theme.wallpaper = await wallpaperToBase64(

        wallpaperInput.files[0]

    );

    saveTheme();

    applyWallpaper();

};

removeWallpaper.onclick = ()=>{

    theme.wallpaper = "";

    saveTheme();

    applyWallpaper();

};

applyWallpaper();