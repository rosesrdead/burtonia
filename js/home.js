/* ===================================
   BURTONIA - Home
=================================== */

function renderHome(){

    homePage.innerHTML = "";

    /* ==========================
       ▶️ Folytatás
    ========================== */

    const watching = db.items.filter(item=>

        item.status === "watching"

    );

    const watchingSection = document.createElement("section");

    const watchingTitle = document.createElement("h2");

    watchingTitle.className = "sectionTitle";

    watchingTitle.textContent = "▶️ Folytatás";

    watchingSection.appendChild(watchingTitle);

    if(watching.length === 0){

        const empty = document.createElement("div");

        empty.className = "emptyHome";

        empty.innerHTML = `

            <h2>Nincs folyamatban semmi</h2>

            <p>Jelölj meg egy filmet vagy sorozatot "Most nézem" állapotúnak.</p>

        `;

        watchingSection.appendChild(empty);

    }else{

        const grid = document.createElement("div");

        grid.className = "grid";

        watching.forEach(item=>{

            grid.appendChild(

                createCard(item)

            );

        });

        watchingSection.appendChild(grid);

    }

    homePage.appendChild(watchingSection);

    /* ==========================
       📊 Statisztika
    ========================== */

    const stats = document.createElement("section");

    stats.className = "homeStats";

    stats.innerHTML = `

        <h2 class="sectionTitle">📊 Statisztika</h2>

        <div class="homeStat">

            <span>🎬 Filmek</span>

            <b>${db.items.filter(item=>item.type==="movie").length}</b>

        </div>

        <div class="homeStat">

            <span>📺 Sorozatok</span>

            <b>${db.items.filter(item=>item.type==="series").length}</b>

        </div>

        <div class="homeStat">

            <span>📝 Listák</span>

            <b>${db.lists.length}</b>

        </div>

    `;

    homePage.appendChild(stats);

    /* ==========================
       🆕 Legutóbb hozzáadott
    ========================== */
        const recentSection = document.createElement("section");

    const recentTitle = document.createElement("h2");

    recentTitle.className = "sectionTitle";

    recentTitle.textContent = "🆕 Legutóbb hozzáadott";

    recentSection.appendChild(recentTitle);

    const recentItems = [...db.items]

        .sort((a,b)=>b.id-a.id)

        .slice(0,5);

    if(recentItems.length === 0){

        const empty = document.createElement("div");

        empty.className = "emptyHome";

        empty.innerHTML = `

            <p>Még nincs hozzáadott filmed vagy sorozatod.</p>

        `;

        recentSection.appendChild(empty);

    }else{

        const grid = document.createElement("div");

        grid.className = "grid";

        recentItems.forEach(item=>{

            grid.appendChild(

                createCard(item)

            );

        });

        recentSection.appendChild(grid);

    }

    homePage.appendChild(recentSection);

}
