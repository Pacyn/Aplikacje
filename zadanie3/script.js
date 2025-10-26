var maps = L.map('map').setView([53.430127, 14.564802], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(maps);
let marker = L.marker([53.430127, 14.564802]).addTo(maps);

if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

function success(pos) {
  const crd = pos.coords;
  console.log("Your position:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
}

function error(err){
    console.warn(`ERROR(${err.code}): ${err.message}`)
}

function getLocation(){
    console.log("Print something!");
}

console.log("yo");