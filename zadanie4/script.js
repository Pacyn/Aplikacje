var xhttp = new XMLHttpRequest();
var response, city;
const container = document.getElementById("weatherContainer");
api = "";

xhttp.onload = function(){    
    response = JSON.parse(xhttp.responseText);
    console.log(response);
    p = createDiv(new Date(response.dt * 1000),
        response.name, 
        response.main.temp, 
        response.main.feels_like,
        response.weather[0].description);
    container.appendChild(p);
    getApiForecast(`https://api.openweathermap.org/data/2.5/forecast?q=${response.name}&appid=${api}&lang=pl&units=metric`);
}

function getApi(city){
    container.textContent = "";
    city = document.getElementById("textCity").value;
    if(city == "") return;
    xhttp.open("GET",`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&lang=pl&units=metric`);
    xhttp.send();
}

async function getApiForecast(api) {
    tab = [7,15,23,31,39];
    let x = await fetch(api);
    let apiResponse = JSON.parse(await x.text());
    console.log(apiResponse);
    tab.forEach(element => {
       p = createDiv(apiResponse.list[element].dt_txt,
        apiResponse.city.name, 
        apiResponse.list[element].main.temp,
        apiResponse.list[element].main.feels_like,
        apiResponse.list[element].weather[0].description);
    container.appendChild(p); 
    });
}

function createDiv(date, city, temp, feelsLike, weatherCondition){
    tab = [`Data: ${date}`, `Miejsce: ${city}`,`Temperatura: ${temp}`, `Odczuwalna: ${feelsLike}`, `Kondycja pogody: ${weatherCondition}`];
    var div = document.createElement("div");
    div.className = "weather";
    tab.forEach(element => {
       var p = document.createElement("p");
        p.innerText = element;
        div.appendChild(p); 
    });
    return div;
}