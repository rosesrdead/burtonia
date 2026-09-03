/* ===================================
   BURTONIA - Home
=================================== */

function renderHome() {
    if (!homePage) return;

    homePage.innerHTML = "";

    const items = Array.isArray(db.items) ? db.items : [];

    /* ===================================
       GYORSKATEGÓRIÁK
    =================================== */

    const quickNav = document.createElement("div");
    quickNav.className = "homeQuickNav";

    const categories = [
        ["🎬", "Filmek", "movie"],
        ["📺", "Sorozatok", "series"],
        ["🌸", "Anime", "anime"],
        ["📖", "Könyvek", "book"]
    ];

    categories.forEach(([icon, name, type]) => {
        const button = document.createElement("button");

        button.className = "homeQuickButton";
        button.innerHTML = `
            <span class="homeQuickIcon">${icon}</span>
            <span>${name}</span>
        `;

        button.onclick = () => {
            currentView = "library";
            currentList = `type:${type}`;
            render();
        };

        quickNav.appendChild(button);
    });

    homePage.appendChild(quickNav);


    /* ===================================
       FOLYTATÁS
    =================================== */

    const watching = items.filter(
        item => item.status === "watching"
    );

    const watchingSection = document.createElement("section");

    watchingSection.innerHTML = `
        <h2 class="sectionTitle">▶️ Folytatás</h2>
    `;

    if (!watching.length) {
        const empty = document.createElement("div");

        empty.className = "emptyHome";
        empty.innerHTML = `
            <h2>Nincs folyamatban semmi</h2>
            <p>
                Jelölj meg egy filmet, sorozatot, animét
                vagy könyvet "Most nézem" állapotúnak.
            </p>
        `;

        watchingSection.appendChild(empty);

    } else {
        const grid = document.createElement("div");
        grid.className = "grid";

        watching.forEach(item => {
            if (typeof createCard === "function") {
                grid.appendChild(createCard(item));
            }
        });

        watchingSection.appendChild(grid);
    }

    homePage.appendChild(watchingSection);


    /* ===================================
       STATISZTIKA
    =================================== */

    const stats = document.createElement("section");
    stats.className = "homeStats";

    const countType = type =>
        items.filter(item =>
            typeof normalizeItemType === "function"
                ? normalizeItemType(item) === type
                : item.type === type
        ).length;

    stats.innerHTML = `
        <h2 class="sectionTitle">📊 Statisztika</h2>

        <div class="homeStat">
            <span>🎬 Filmek</span>
            <b>${countType("movie")}</b>
        </div>

        <div class="homeStat">
            <span>📺 Sorozatok</span>
            <b>${countType("series")}</b>
        </div>

        <div class="homeStat">
            <span>🌸 Anime</span>
            <b>${countType("anime")}</b>
        </div>

        <div class="homeStat">
            <span>📖 Könyvek</span>
            <b>${countType("book")}</b>
        </div>

        <div class="homeStat">
            <span>📝 Listák</span>
            <b>${Array.isArray(db.lists) ? db.lists.length : 0}</b>
        </div>
    `;

    homePage.appendChild(stats);


    /* ===================================
       LEGUTÓBB HOZZÁADOTT
    =================================== */

    const recentSection = document.createElement("section");

    recentSection.innerHTML = `
        <h2 class="sectionTitle">🆕 Legutóbb hozzáadott</h2>
    `;

    const recentItems = [...items]
        .sort((a, b) =>
            (Number(b.id) || 0) - (Number(a.id) || 0)
        )
        .slice(0, 5);

    if (!recentItems.length) {
        const empty = document.createElement("div");

        empty.className = "emptyHome";
        empty.innerHTML = `
            <p>
                Még nincs hozzáadott filmed,
                sorozatod, animéd vagy könyved.
            </p>
        `;

        recentSection.appendChild(empty);

    } else {
        const grid = document.createElement("div");
        grid.className = "grid";

        recentItems.forEach(item => {
            if (typeof createCard === "function") {
                grid.appendChild(createCard(item));
            }
        });

        recentSection.appendChild(grid);
    }

    homePage.appendChild(recentSection);
}
