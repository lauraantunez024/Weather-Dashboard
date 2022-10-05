var searchForm = document.querySelector("#search-form");
var weatherDayTemp = document.querySelector("#weather-temp-day");
var weatherDayWind = document.querySelector("#weather-wind-day");
var weatherDayHumidity = document.querySelector("#weather-humidity-day");
var weatherWind = document.querySelector("#weather-wind");
var weatherTemp = document.querySelector("#weather-temp");
var weatherCity = document.querySelector("#weather-day-city");
var uv = document.querySelector("#city-uv");
var weatherContainer = document.querySelector("#weather-container");
var forecastContainerEl = document.querySelector("#forecast-container");
var outerForecastContainerEl = document.querySelector("#outer-forecast-container");
var weatherDayDateEl = document.querySelector("#weather-day-date");
var weatherDayIconEl = document.querySelector("#weather-day-icon");
var buttonContainerEl = document.querySelector("#button-container");
var searchFormInput = document.querySelector("#search-form-input")
var baseUrl = "https://api.openweathermap.org/";
var apiKey = "cf4aaca52a302ee9f63313ad83a08d7e";


// function populateForecast(data){
//     var forecastUrl = `${baseUrl}/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

//     forecastContainerEl.innerHTML = "";
//     data.forEach(function(day, index){
//         if(index === 0 || index > 5) {
//             return;
//         }
//     var dt = day.dt;
//     var date = moment(dt * 1000).format("L");
//     var temp = day.temp.day;
//     var wind = day.wind_speed;
//     var humidity = day.humidity;
//     var div = document.createElement("div");
//     var offsetClass = "";
//     if (index === 1) {
//         offsetClass = "col-lg-offset-1";
//     }
//     div.classList = `card-weather-container col-sm-12 ${offsetClass} col-lg-2 text-light`;
//     div.innerHTML = `
//     <div class=card-weather bg-dark p-3> 
//     <h4>${date}</h4>
//     <img src="https://openweathermap.org/img/wn/${icon}.png />
//     <dl>
//         <dt>Temp:</dt>
//         <dd>${temp}</dd>
//         <dt>Wind:</dt>
//         <dd>${wind}</dd>
//         <dt>Humidity:</dt>
//         <dd>${humidity}</dd>
//     <dl>
//     </div>
//     `;
//     forecastContainerEl.appendChild(div);
//     });
//     outerForecastContainerEl.classList.remove("hide");
//     };

function getCityWeather(city) {
    var url = `${baseUrl}/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            if (!data.length) {
                window.alert("No city matches");
                return;
            }
            storeCityLocation(city);
            populateButtons();

            var cityObject = data[0];
            var lat = cityObject.lat;
            var lon = cityObject.lon;

            var currentWeatherUrl = `${baseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

            fetch(currentWeatherUrl)
                .then(function(response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data);
                    var date = moment(Date.now()).format("L");
                    var temp = data.main.temp;
                    var wind = data.wind.speed;
                    var humidity = data.main.humidity;
                    var uvIndex= data.main.feels_like;
                    var icon = data.weather[0].icon;

                    weatherCity.textContent = city;
                    weatherDayDateEl.textContent = date;
                    weatherDayWind.textContent = wind;
                    weatherDayTemp.textContent = temp;
                    weatherDayHumidity.textContent = humidity;
                    uv.textContent = uvIndex;
                    if (uvIndex < 3) {
                        uv.classList.add("nice");
                    } else if (uv < 7) {
                        uv.classList.add("ok");
                    } else  { 
                        uv.classList.add("bad") 
                }
                weatherDayIconEl.src = `http://openweathermap.org/img/wn/${icon}.png`;
                weatherContainer.classList.remove("hide");
                // populateForecast(data.list);
               })
            })
        };

function populateButtons() {
    buttonContainerEl.innerHTML = "";
    var cities = window.localStorage.getItem("cities");
    if (cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }

    cities.forEach(function(city) {
        var button = document.createElement("button");
        button.classList = "btn btn-secondary col-12"
        button.textContent = city;
        button.setAttribute("data-city", city);
        buttonContainerEl.appendChild(button);
    });
}

function storeCityLocation(city) {
    city = city.toLowerCase();
    var cities = window.localStorage.getItem("cities");
    if (cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }
    if (cities.includes(city)) {
        return;
    } else {
        cities.push(city);
    }

    window.localStorage.setItem("cities", JSON.stringify(cities));
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    var city = searchFormInput.value;
    getCityWeather(city);
}
function handleButtonClick(evt) {
    var target = evt.target;
    var city = target.getAttribute("data-city");
    getCityWeather(city);
}

function addEventListeners() {
    searchForm.addEventListener("submit", handleFormSubmit);
    buttonContainerEl.addEventListener("click", handleButtonClick);
}

function init() {
    addEventListeners();
    populateButtons();
}

init();


