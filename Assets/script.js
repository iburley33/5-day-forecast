const key = "1a5906ffb99f056541188c9014c637b4";
const searchBtn = document.querySelector(".searchButton");
const cardSection = document.querySelector(".rowBoat");
const links = document.querySelector(".links")
const searches = [];
const searchBar = document.getElementById("searchBar");
const clearBtn = document.getElementById("clearBtn")
var linkBtn;
const fetchWeatherData = function(lat, lon) {
    setLinks();
    const fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
    fetch(fiveDayURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const daysArr = [data.list[5],data.list[13],data.list[21],data.list[29]];
            // loop here to create and append cards
            daysArr.forEach((day) => {
                const card = createWeatherCard(day)
                cardSection.innerHTML+=card
            })
        })
};

const fetchWeatherCoords = function(city){
    console.log(searches)
    const fetchURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
    searches.push(city)
    localStorage.setItem("city", JSON.stringify(searches));
    fetch(fetchURL)
        .then(response => response.json())
        .then(data => { 
            console.log(data)
            cardSection.innerHTML=""
            const newCard = createWeatherCard1(data);
            cardSection.innerHTML+=newCard
            const lat = data.coord.lat
            const lon = data.coord.lon
            fetchWeatherData(lat, lon);
})
};



const createWeatherCard1 = function(data) {
    return `    
    <div class="box mt-5 ml-2 mr-2 widgets" style="height: auto; width: 15%">
        <h2 class="font is-size-4" style="text-align: center;">Today's Forecast</h2>
        <section class="box mt-5 mx-auto description line">Forecast: ${data.weather[0].description}</section>
        <section class="box mt-5 mx-auto temp line">Temperature: ${data.main.temp}</section>
        <section class="box mt-5 mx-auto humidity line">Humidy: ${data.main.humidity}%</section>
        <section class="box mt-5 mx-auto wind line">Wind Speed: ${data.wind.speed}</section>
    </div>
  `
};

const createWeatherCard = function(data){
    return `    
    <div class="box mt-5 ml-2 mr-2 widgets" style="height: auto; width: 15%">
        <h2 class="font is-size-4" style="text-align: center;">${data.dt_txt}</h2>
        <section class="box mt-5 mx-auto description line">Forecast: ${data.weather[0].description}</section>
        <section class="box mt-5 mx-auto temp line">Temperature: ${data.main.temp}</section>
        <section class="box mt-5 mx-auto humidity line">Humidy: ${data.main.humidity}%</section>
        <section class="box mt-5 mx-auto wind line">Wind Speed: ${data.wind.speed}</section>
    </div>
  `
}


searchBtn.addEventListener("click",() => fetchWeatherCoords(searchBar.value))

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        fetchWeatherCoords(searchBar.value);

    }
});


const setLinks = function() {
    links.innerHTML = "";
    var storageArr = localStorage.getItem("city");
    storageArr = JSON.parse(storageArr)
    console.log(storageArr)
    storageArr?.forEach((search) => { 
    const link = generateLink(search)
    console.log(link)
    links.innerHTML+=link;
    linkBtn = document.getElementById("linkBtn");
    
})
};

const generateLink = function(search){
    return `  
    <button id="linkBtn">${search}</button>  
`
};

const clearResults = function() {
    var cityArray = JSON.parse(localStorage.getItem("city"))
    cityArray = [];
    localStorage.setItem("city", JSON.stringify(cityArray))
    setLinks();
}
links.addEventListener("click", (e) => fetchWeatherCoords(e.target.innerText))

clearBtn.addEventListener("click", clearResults)

setLinks()

