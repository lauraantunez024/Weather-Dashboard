var searchForm = document.querySelector("#search-form");
var weatherDayTemp = document.querySelector("#weather-temp-day");
var weatherDayWind = document.querySelector("weather-wind-day");
var weatherDayHumidity = document.querySelector("weather-humidity-day");
var weatherHumidity = document.querySelector("weather-humidity");
var weatherWind = document.querySelector("weather-wind");
var weatherTemp = document.querySelector("weather-temp");
var weatherCity = document.querySelector("weather-city");
var uv = document.querySelector("city-uv");
var weatherContainer = document.querySelector("#weather-container");
var forecastContainerEl = document.querySelector("#forecast-container");
var outerForecastContainerEl = document.querySelector("#outer-forecast-container");
var weatherDayDateEl = document.querySelector("#weather-day-date");

var baseUrl = "http://api.openweathermap.org/";
var apiKey = "18e3e4ab32179be2cd6762b22f329d49";


function populateForecast(data){
    forecastContainerEl.innerHTML = "";
    data.forEach(function (day, index){
        if(index === 0 || index > 5) {
            return;
        }
    var dt = day.dt;
    var date = moment(dt * 1000).format("L");
    var temp = day.temp.day;
    var wind = day.wind_speed;
    var humidity = day.humidity;
    var div = document.createElement("div");
    var offsetClass = "";
    if (index === 1) {
        offsetClass = "col-lg-offset-1";
    }
    div.classList = `card-weather-container col-sm-12 ${offsetClass} col-lg-2 text-light`;
    div.innerHTML = `
    <div class=card-weather bg-dark p-3> 
    <h4>${date}</h4>
    <img src="https://openweathermap.org/img/wn/${icon}.png />
    <dl>
        <dt>Temp:</dt>
        <dd>${temp}</dd>
        <dt>Wind:</dt>
        <dd>${wind}</dd>
        <dt>Humidity:</dt>
        <dd>${humidity}</dd>
    `;
    forecastContainerEl.appendChild(div);
    });
    outerForecastContainerEl.classList.remove("hide");
    }
    


