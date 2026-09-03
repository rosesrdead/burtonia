/* ===================================
   BURTONIA - Home
=================================== */


/* ===================================
   KEZDŐLAP
=================================== */

function renderHome() {

    if (!homePage) {

        return;

    }


    homePage.innerHTML =
        "";


    const items =
        Array.isArray(db.items)
            ? db.items
            : [];


    /* ===================================
       ▶️ FOLYTATÁS
    =================================== */

    const watching =
        items.filter(item => {

            return (
                item.status ===
                "watching"
            );

        });


    const watchingSection =
        document.createElement("section");


    const watchingTitle =
        document.createElement("h2");


    watchingTitle.className =
        "sectionTitle";


    watchingTitle.textContent =
        "▶️ Folytatás";


    watchingSection.appendChild(
        watchingTitle
    );


    if (
        watching.length === 0
    ) {

        const empty =
            document.createElement("div");


        empty.className =
            "emptyHome";


        empty.innerHTML = `

            <h2>Nincs folyamatban semmi</h2>

            <p>
                Jelölj meg egy filmet,
                sorozatot, animét vagy könyvet
                "Most nézem" állapotúnak.
            </p>

        `;


        watchingSection.appendChild(
            empty
        );

    }

    else {

        const grid =
            document.createElement("div");


        grid.className =
            "grid";


        watching.forEach(item => {

            if (
                typeof createCard ===
                "function"
            ) {

                grid.appendChild(
                    createCard(item)
                );

            }

        });


        watchingSection.appendChild(
            grid
        );

    }


    homePage.appendChild(
        watchingSection
    );


    /* ===================================
       📊 STATISZTIKA
    =================================== */

    const stats =
        document.createElement("section");


    stats.className =
        "homeStats";


    /* ===================================
       TÍPUSOK SZÁMOLÁSA
    =================================== */

    const movieCount =
        items.filter(item => {

            if (
                typeof normalizeItemType ===
                "function"
            ) {

                return (
                    normalizeItemType(item) ===
                    "movie"
                );

            }


            return (
                item.type ===
                "movie"
            );

        }).length;


    const seriesCount =
        items.filter(item => {

            if (
                typeof normalizeItemType ===
                "function"
            ) {

                return (
                    normalizeItemType(item) ===
                    "series"
                );

            }


            return (
                item.type ===
                "series"
            );

        }).length;


    const animeCount =
        items.filter(item => {

            if (
                typeof normalizeItemType ===
                "function"
            ) {

                return (
                    normalizeItemType(item) ===
                    "anime"
                );

            }


            return (
                item.type ===
                "anime"
            );

        }).length;


    const bookCount =
        items.filter(item => {

            if (
                typeof normalizeItemType ===
                "function"
            ) {

                return (
                    normalizeItemType(item) ===
                    "book"
                );

            }


            return (
                item.type ===
                "book"
            );

        }).length;


    stats.innerHTML = `

        <h2 class="sectionTitle">
            📊 Statisztika
        </h2>


        <div class="homeStat">

            <span>
                🎬 Filmek
            </span>

            <b>
                ${movieCount}
            </b>

        </div>


        <div class="homeStat">

            <span>
                📺 Sorozatok
            </span>

            <b>
                ${seriesCount}
            </b>

        </div>


        <div class="homeStat">

            <span>
                🌸 Anime
            </span>

            <b>
                ${animeCount}
            </b>

        </div>


        <div class="homeStat">

            <span>
                📖 Könyvek
            </span>

            <b>
                ${bookCount}
            </b>

        </div>


        <div class="homeStat">

            <span>
                📝 Listák
            </span>

            <b>
                ${
                    Array.isArray(db.lists)
                        ? db.lists.length
                        : 0
                }
            </b>

        </div>

    `;


    homePage.appendChild(
        stats
    );


    /* ===================================
       🆕 LEGUTÓBB HOZZÁADOTT
    =================================== */

    const recentSection =
        document.createElement("section");


    const recentTitle =
        document.createElement("h2");


    recentTitle.className =
        "sectionTitle";


    recentTitle.textContent =
        "🆕 Legutóbb hozzáadott";


    recentSection.appendChild(
        recentTitle
    );


    const recentItems =
        [...items]
            .sort((a, b) => {

                const aId =
                    Number(a.id) || 0;


                const bId =
                    Number(b.id) || 0;


                return (
                    bId -
                    aId
                );

            })
            .slice(
                0,
                5
            );


    if (
        recentItems.length ===
        0
    ) {

        const empty =
            document.createElement("div");


        empty.className =
            "emptyHome";


        empty.innerHTML = `

            <p>
                Még nincs hozzáadott filmed,
                sorozatod, animéd vagy könyved.
            </p>

        `;


        recentSection.appendChild(
            empty
        );

    }

    else {

        const grid =
            document.createElement("div");


        grid.className =
            "grid";


        recentItems.forEach(item => {

            if (
                typeof createCard ===
                "function"
            ) {

                grid.appendChild(
                    createCard(item)
                );

            }

        });


        recentSection.appendChild(
            grid
        );

    }


    homePage.appendChild(
        recentSection
    );

}
