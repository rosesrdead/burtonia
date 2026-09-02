/* ===================================
   BURTONIA - Browse
=================================== */

function renderBrowse(){

    const container = document.getElementById("genresContainer");

    container.innerHTML = "";

    const groups = {};

    db.items.forEach(item => {

        if(!item.genres || !item.genres.length){

            return;

        }

        item.genres.forEach(genre => {

            if(!groups[genre]){

                groups[genre] = [];

            }

            groups[genre].push(item);

        });

    });

    Object.keys(groups)
        .sort((a, b) => a.localeCompare(b, "hu"))
        .forEach(genre => {

            const section = document.createElement("div");

            section.className = "genreSection";

            const title = document.createElement("h2");

            title.className = "sectionTitle";

            title.textContent = "🎭 " + genre;

            section.appendChild(title);

            const grid = document.createElement("div");

            grid.className = "grid";

            groups[genre].forEach(item => {

                grid.appendChild(createCard(item));

            });

            section.appendChild(grid);

            container.appendChild(section);

        });

}
