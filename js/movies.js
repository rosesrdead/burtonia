/* BURTONIA - Movies / Library */

function normalizeItemType(item){
    const type=String(item?.type||"").trim().toLowerCase();
    if(["movie","film","movies"].includes(type)) return "movie";
    if(["series","sorozat","tv","show"].includes(type)) return "series";
    if(type==="anime") return "anime";
    if(["book","books","könyv","konyv"].includes(type)) return "book";
    return type;
}

function getFilteredItems(){
    const items=Array.isArray(db.items)?db.items:[];
    const filter=String(currentList??"all");

    if(!filter||filter==="all") return items;

    if(filter.startsWith("type:")){
        const type=filter.slice(5);
        return items.filter(item=>normalizeItemType(item)===type);
    }

    return items.filter(item=>
        Array.isArray(item.lists)&&
        item.lists.some(id=>String(id)===filter)
    );
}

function createCard(item){
    const card=document.createElement("div");
    card.className="card";

    const poster=document.createElement("div");
    poster.className="poster";

    if(item.image){
        const img=document.createElement("img");
        img.src=item.image;
        img.alt=item.title||"";
        img.loading="lazy";
        img.onerror=()=>{
            img.style.display="none";
            poster.textContent="Nincs borító";
        };
        poster.appendChild(img);
    }else{
        poster.textContent="Nincs borító";
    }

    card.appendChild(poster);

    const title=document.createElement("div");
    title.className="title";
    title.textContent=item.title||"Névtelen elem";
    card.appendChild(title);

    if(item.originalTitle){
        const original=document.createElement("div");
        original.className="originalTitle";
        original.textContent=item.originalTitle;
        card.appendChild(original);
    }

    if(item.year){
        const year=document.createElement("div");
        year.className="movieYear";
        year.textContent=`📅 ${item.year}`;
        card.appendChild(year);
    }

    if(Array.isArray(item.genres)&&item.genres.length){
        const genres=document.createElement("div");
        genres.className="movieGenres";
        genres.textContent=`🎭 ${item.genres.join(" • ")}`;
        card.appendChild(genres);
    }

    if(item.finished){
        const finished=document.createElement("div");
        finished.className="finishedDate";
        finished.textContent=`✅ ${item.finished}`;
        card.appendChild(finished);
    }

    card.onclick=()=>typeof openEditor==="function"&&openEditor(item);
    return card;
}

function getSortedItems(items){
    if(typeof sortItems==="function") return sortItems(items);

    return [...items].sort(
        (a,b)=>(a.title||"").localeCompare(a.title||"","hu")
    );
}

function renderItems(){
    const grids={
        movie:document.getElementById("moviesGrid"),
        series:document.getElementById("seriesGrid"),
        anime:document.getElementById("animeGrid"),
        book:document.getElementById("booksGrid")
    };

    Object.values(grids).forEach(grid=>{
        if(grid) grid.innerHTML="";
    });

    getSortedItems(getFilteredItems()).forEach(item=>{
        const grid=grids[normalizeItemType(item)];

        if(grid){
            grid.appendChild(createCard(item));
        }
    });
}

function renderMovies(){
    renderItems();
}

function renderLibrary(){
    renderItems();
}
