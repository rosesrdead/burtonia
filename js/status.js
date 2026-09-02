const STATUS = {

    movie: [

        {
            value: "planned",
            text: "📋 Megnézendő",
            icon: "📋"
        },

        {
            value: "watching",
            text: "▶️ Nézés alatt",
            icon: "▶️"
        },

        {
            value: "finished",
            text: "✅ Megnézve",
            icon: "✅"
        }

    ],

    series: [

        {
            value: "planned",
            text: "📋 Megnézendő",
            icon: "📋"
        },

        {
            value: "watching",
            text: "📺 Nézés alatt",
            icon: "📺"
        },

        {
            value: "finished",
            text: "✅ Befejezve",
            icon: "✅"
        }

    ]

};

function refreshStatusUI(){

    itemStatus.innerHTML = "";

    const statuses = STATUS[itemType.value];

    statuses.forEach(status=>{

        const option = document.createElement("option");

        option.value = status.value;

        option.textContent = status.text;

        itemStatus.appendChild(option);

    });

}

function getStatusIcon(status, type){

    const statuses = STATUS[type] || [];

    const found = statuses.find(s => s.value === status);

    return found ? found.icon : "";

}

itemType.onchange = refreshStatusUI;
