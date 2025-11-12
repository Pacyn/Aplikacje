var map;
var clicked;
function success(pos) {
    const crd = pos.coords;
    console.log("Your position:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude : ${crd.longitude}`);
    map = L.map('map').setView([crd.latitude, crd.longitude], 13, preferCanvas = true);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([crd.latitude, crd.longitude]).addTo(map);
    requestNotificationPermission();
}

function error(err){
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function getLocation(){
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(success, error);
    else
        alert("Geolocation is not supported by this browser.");
}


function checkAllTiles(tilesNumbers){
    const slots = document.querySelectorAll(".slot");
    let correctTiles = 0;

    for (let item of slots){
        try{
            if(item.getAttribute("targetId") === item.firstChild.getAttribute("setNumber")) correctTiles++;
            console.log(correctTiles);
        }
        catch{
            return;
        }
    }

    if(correctTiles === tilesNumbers) showSystemNotification("Puzzle do someting", "Well done! You did very hard puzzle. Nice.");
}

function getRaster(){
    if(clicked) return;
    clicked = true;
    const tilesNumber = 16;

    map.invalidateSize();
    const mapContainer = document.createElement("canvas");
    const ctx = mapContainer.getContext('2d');

    //Robię to w backendzie 
    //tak jak na filmiku
    //Tworzę canvas i go dzielę na mniejsze w backendzie
    //który mogę wyświetlić ale na filmiku jest inaczej :))

    leafletImage(map, function(err, fullCanvas) {
    ctx.canvas.width = fullCanvas.width;
    ctx.canvas.height = fullCanvas.height;
    ctx.drawImage(fullCanvas, 0, 0);

    const myCanvas = document.getElementById("rasterCanvas");
    for(let i =0; i< tilesNumber; i++){
        var newdiv = document.createElement("div");
        newdiv.style.width = `${500/(tilesNumber/4)}px`;
        newdiv.style.height = `${500/(tilesNumber/4)}px`;
        newdiv.setAttribute("targetId", `${i}`)
        newdiv.className = `dropTarget slot`;
        if(i % 2)
            newdiv.style.backgroundColor = "grey";
        else
            newdiv.style.backgroundColor = "lightgrey";
        newdiv.style.float = "left";
        myCanvas.appendChild(newdiv);
    }

    var imagePieces = [];

    for (let row = 0; row < tilesNumber/4; row++) {
        for (let col = 0; col < tilesNumber/4; col++) {
            const pieceCanvas = document.createElement('canvas');
            pieceCanvas.width = 500/(tilesNumber/4);
            pieceCanvas.height = 500/(tilesNumber/4);
            const pieceContext = pieceCanvas.getContext('2d');
            const sourceX = col * 500/(tilesNumber/4);
            const sourceY = row * 500/(tilesNumber/4);
            
            pieceContext.drawImage(
                fullCanvas,
                sourceX,
                sourceY,
                500/(tilesNumber/4), 
                500/(tilesNumber/4), 
                0, 
                0,
                500/(tilesNumber/4),
                500/(tilesNumber/4)
            );
            imagePieces.push(pieceCanvas.toDataURL());
        }
    }
        randomArray = [14, 5, 1, 12, 8, 2, 11, 0, 15, 7, 4, 3, 10, 9, 6, 13];
        for(let i = 0; i < tilesNumber; i++){
        var newdiv = document.createElement("div");
        newdiv.style.backgroundImage = `url(${imagePieces[randomArray[i]]})`;
        newdiv.style.width = `${500/(tilesNumber/4)}px`;
        newdiv.style.height = `${500/(tilesNumber/4)}px`;
        newdiv.id = `number${randomArray[i]}`;
        newdiv.setAttribute("setNumber", randomArray[i])
        newdiv.className = `dragItem`;
        newdiv.style.backgroundColor = "red";
        newdiv.style.margin = "5px";
        newdiv.style.float = "left";
        newdiv.draggable = "true";
        document.body.appendChild(newdiv);
    }
        let items = document.querySelectorAll(".dragItem");
        for (let item of items){
            item.addEventListener("dragstart", function(event){
                this.style.border = "5px dashed";
                event.dataTransfer.setData("allData", this.id);
            });
            item.addEventListener("dragend", function(event){
                this.style.borderWidth = 0;
            });
    }
        let drops = document.querySelectorAll(".dropTarget");
        for (let item of drops){
            item.addEventListener("dragenter", function (event) {
                this.style.border = "2px solid #50b466ff";
            });
            item.addEventListener("dragleave", function (event) {
                this.style.border = "2px dashed #a48e47ff";
            });
            item.addEventListener("dragover", function (event) {
                event.preventDefault();
            });
            item.addEventListener("drop", function (event){
                let myElement = document.querySelector("#" + event.dataTransfer.getData("allData"));
                myElement.style.margin = 0;
                this.appendChild(myElement);
                this.style.border = "2px dashed #a48e47ff";
                checkAllTiles(tilesNumber);
            });
        }
    });
}

function requestNotificationPermission() {
    if (!('Notification' in window)) {
        alert("This browser does not support desktop notification.");
        return;
    }
    if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            console.log("Notification permission status:", permission);
        });
    }
}

function showSystemNotification(title, bodyText) {
    if (Notification.permission !== 'granted') {
        alert("This browser doesn't support desktop notifications");
        return;
    }
    const options = {
        body: bodyText,
        renotify: true
    };

    const notification = new Notification(title, options);
    notification.onclick = function() {
        console.log('Notification clicked!');
        window.focus(); 
    };

    notification.onclose = function() {
        console.log('Notification closed!');
    };
}


console.log("yo");