/* BURTONIA - Lists / Navigation */

function renderLists(){
    if(!sidebarItems) return;

    sidebarItems.innerHTML="";

    const addItem=(text,view="library",list="all")=>{
        const row=document.createElement("div");

        row.className=
            currentView===view&&
            String(currentList)===String(list)
                ? "sidebarItem active"
                : "sidebarItem";

        row.textContent=text;

        row.onclick=()=>{
            currentView=view;
            currentList=list;
            render();
        };

        sidebarItems.appendChild(row);
    };

    addItem("🏠 Kezdőlap","home","all");
    addItem("🎭 Böngészés","browse","all");
    addItem("📚 Könyvtár","library","all");

    (Array.isArray(db.lists)?db.lists:[]).forEach(list=>{
        const row=document.createElement("div");

        row.className=
            currentView==="library"&&
            String(currentList)===String(list.id)
                ? "sidebarItem active"
                : "sidebarItem";

        row.textContent=
            `${list.icon||"📝"} ${list.name||"Névtelen lista"}`;

        let timer;

        row.onclick=()=>{
            clearTimeout(timer);

            timer=setTimeout(()=>{
                currentView="library";
                currentList=list.id;
                render();
            },220);
        };

        row.ondblclick=e=>{
            e.preventDefault();
            e.stopPropagation();
            clearTimeout(timer);
            editList(list);
        };

        sidebarItems.appendChild(row);
    });
}


/* FŐ RENDER */

function render(){
    if(typeof db==="undefined") return;

    db.items=Array.isArray(db.items)?db.items:[];
    db.lists=Array.isArray(db.lists)?db.lists:[];

    renderLists();

    if(homePage) homePage.style.display="none";
    if(browsePage) browsePage.style.display="none";
    if(libraryPage) libraryPage.style.display="none";

    if(currentView==="home"){
        if(homePage) homePage.style.display="block";
        if(typeof renderHome==="function") renderHome();

    }else if(currentView==="browse"){
        if(browsePage) browsePage.style.display="block";
        if(typeof renderBrowse==="function") renderBrowse();

    }else{
        if(libraryPage) libraryPage.style.display="block";
        if(typeof renderItems==="function") renderItems();
    }
}


/* ÚJ LISTA */

if(typeof addList!=="undefined"){
    addList.onclick=()=>{
        if(typeof closeFab==="function") closeFab();

        const name=prompt("Új lista neve:");
        if(name===null) return;

        const value=name.trim();
        if(!value) return;

        if(db.lists.some(list=>
            String(list.name||"")
                .trim()
                .toLowerCase()===value.toLowerCase()
        )){
            alert("Ez a lista már létezik.");
            return;
        }

        const icon=prompt("Lista emoji:","📝");
        if(icon===null) return;

        db.lists.push({
            id:Date.now(),
            name:value,
            icon:icon.trim()||"📝"
        });

        saveDB();

        currentView="library";
        currentList="all";

        render();
    };
}


/* LISTA SZERKESZTÉSE */

function editList(list){
    if(!list) return;

    document.getElementById("listEditModal")?.remove();

    const overlay=document.createElement("div");
    overlay.id="listEditModal";

    const box=document.createElement("div");
    box.className="listEditBox";

    box.innerHTML=`
        <h2>📝 Lista szerkesztése</h2>

        <label>Lista neve</label>

        <input
            id="editListName"
            type="text"
            value="${escapeHtml(list.name||"")}"
        >

        <label>Emoji</label>

        <input
            id="editListIcon"
            type="text"
            value="${escapeHtml(list.icon||"📝")}"
        >

        <div class="listEditButtons">

            <button id="editListSave">
                💾 Mentés
            </button>

            <button id="editListDelete">
                🗑 Törlés
            </button>

            <button id="editListCancel">
                Mégse
            </button>

        </div>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const nameInput=
        document.getElementById("editListName");

    const iconInput=
        document.getElementById("editListIcon");


    /* MENTÉS */

    document.getElementById("editListSave").onclick=()=>{
        const name=nameInput.value.trim();

        if(!name){
            alert("A lista neve nem lehet üres.");
            return;
        }

        if(db.lists.some(item=>
            item.id!==list.id&&
            String(item.name||"")
                .trim()
                .toLowerCase()===name.toLowerCase()
        )){
            alert("Ez a lista már létezik.");
            return;
        }

        list.name=name;
        list.icon=iconInput.value.trim()||"📝";

        saveDB();

        overlay.remove();
        render();
    };


    /* TÖRLÉS */

    document.getElementById("editListDelete").onclick=()=>{
        if(!confirm(
            `Biztosan törlöd a(z) "${list.name}" listát?\n\n`+
            "A listában lévő filmek, sorozatok, animék és könyvek nem törlődnek."
        )) return;

        db.lists=db.lists.filter(
            item=>String(item.id)!==String(list.id)
        );

        db.items.forEach(item=>{
            if(Array.isArray(item.lists)){
                item.lists=item.lists.filter(
                    id=>String(id)!==String(list.id)
                );
            }
        });

        saveDB();

        overlay.remove();

        currentView="library";
        currentList="all";

        render();
    };


    /* MÉGSE */

    document.getElementById("editListCancel").onclick=()=>{
        overlay.remove();
    };


    /* KATTINTÁS A HÁTTÉRRE */

    overlay.onclick=e=>{
        if(e.target===overlay) overlay.remove();
    };


    nameInput.focus();
    nameInput.select();
}


/* HTML BIZTONSÁG */

function escapeHtml(value){
    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");
}


/* KOMPATIBILITÁS */

function deleteList(list){
    if(!list) return;

    if(!confirm(
        `Biztosan törlöd a(z) "${list.name}" listát?\n\n`+
        "A listában lévő filmek, sorozatok, animék és könyvek nem törlődnek."
    )) return;

    db.lists=db.lists.filter(
        item=>String(item.id)!==String(list.id)
    );

    db.items.forEach(item=>{
        if(Array.isArray(item.lists)){
            item.lists=item.lists.filter(
                id=>String(id)!==String(list.id)
            );
        }
    });

    saveDB();

    currentView="library";
    currentList="all";

    render();
}
