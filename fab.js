fab.onclick = () => {

    if(fabMenu.style.display === "flex"){

        fabMenu.style.display = "none";

        return;

    }

    fabMenu.style.display = "flex";

};
function closeFab(){

    fabMenu.style.display = "none";

}