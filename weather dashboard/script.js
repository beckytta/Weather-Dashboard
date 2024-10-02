// Assigning DOM elements to variables for easier reference
let cityInput = document.getElementById('city_input'),// City input field
    searchBtn = document.getElementById('search_btn'), //Search button
    locationBtn = document.getElementById('location_btn'),//Location button
    currentWeatherCard = document.querySelectorAll('.weather-left .card')[0],//card for current weather
    sixDaysForecastCard = document.querySelector('.day-forecast'),//card for six day weather forecast
    apiCard = document.querySelectorAll('.highlights .card')[0],//Card for air quality index display
    aqiList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'],//List of air quality levels
    sunriseCard = document.querySelectorAll('.highlights .card')[1],//Card for sunrise and sunset times
    hourlyForecastCard = document.querySelector('.hourly-forecast'), //Card for hourly weather forecast
    humidityVal = document.getElementById('humidityVal'),
    pressureVal = document.getElementById('pressureVal'),
    visibilityVal = document.getElementById('visibilityVal'),
    windSpeedVal = document.getElementById('windSpeedVal'),
    feelsVal = document.getElementById('feelsVal'),
    themeToggleBtn = document.getElementById('theme-toggle-btn');

    //OpenWeatherMap API key
const api_Key = "7bfff8480401c47a93c687da39a9e34c"; 

    // Check local storage for theme preference and apply it
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.add('light-mode');
}
 
  // Toggle between dark and light mode when the theme toggle button is clicked
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

     // Save the current theme preference to local storage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Function to get weather details based on location (name, lat, lon, etc.)
function getWeatherDetails(name, lat, lon, country, state) {
    // URLs for weather, forecast, and air pollution data from OpenWeather API
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_Key}`,
        WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_Key}`,
        AIR_POLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_Key}`,
        days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ],
        months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
 
        // Fetch air pollution data from API and update the air quality card
    fetch(AIR_POLLUTION_API_URL).then(res => res.json()).then(data => {
        let { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = data.list[0].components;
        apiCard.innerHTML = `
             <div class="card-head">
                  <p>Air Quality Index</p>
                  <p class="air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].main.aqi - 1]}</p>
                </div>
                <div class="air-indices">
                  <i class="fa-solid fa-wind" style="font-size: 3rem;"></i>
                  <div class="item">
                    <p>PM2.5</p>
                    <h2>${pm2_5}</h2>
                  </div>
                  <div class="item">
                    <p>PM10</p>
                    <h2>${pm10}</h2>
                  </div>
                  <div class="item">
                    <p>CO</p>
                    <h2>${co}</h2>
                  </div>
                  <div class="item">
                    <p>SO2</p>
                    <h2>${so2}</h2>
                  </div>
                  <div class="item">
                    <p>NO</p>
                    <h2>${no}</h2>
                  </div>
                  <div class="item">
                    <p>NO2</p>
                    <h2>${no2}</h2>
                  </div>
                  <div class="item">
                    <p>NH3</p>
                    <h2>${nh3}</h2>
                  </div>
                  <div class="item">
                    <p>O3</p>
                    <h2>${o3}</h2>
                  </div>
                </div>
        `;
    })

    // Fetch current weather data and update the current weather card
    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        if (data.cod !== 200) {
            throw new Error(data.message);// Handle error if data is not available
        }

        let date = new Date(); // Get current date
        currentWeatherCard.innerHTML = `
            <div class="current-weather">
                <div class="details">
                    <p>Now</p>
                    <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                    <p>${data.weather[0].description}</p>
                </div>
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                </div>
            </div>
            <hr>
            <div class="card-footer">
                <p><i class="fa-regular fa-calendar"></i> ${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}</p>
                <p><i class="fa-solid fa-location-dot"></i> ${name}, ${country}</p>
            </div>
        `;

         // Update sunrise, sunset, and other weather parameters
        let { sunrise, sunset } = data.sys,
            { timezone, visibility } = data,
            { humidity, pressure, feels_like } = data.main,
            { speed } = data.wind,
            sRiseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm A'),
            sSetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm A');
       
       // Update sunrise and sunset card
            sunriseCard.innerHTML = `
                  <div class="crd-head">
                  <p>Sunrise and Sunset</p>
                </div>
                <div class="srise-sset">
                  <div class="item">
                    <div class="icon">
                      <img src="images/sunrise.png" alt="">
                    </div>
                    <div>
                      <p>Sunrise</p>
                      <h2>${sRiseTime}</h2>
                    </div>
                  </div>
                  <div class="item">
                    <div class="icon">
                      <img src="images/sunset.png" alt="">
                    </div>
                    <div>
                      <p>Sunset</p>
                      <h2>${sSetTime}</h2>
                    </div>
                  </div>
                </div>
       `;

       // Update other weather values
        humidityVal.innerHTML = `${humidity}%`;
        pressureVal.innerHTML = `${pressure}hPa`;
        visibilityVal.innerHTML = `${visibility / 1000}km`; // Convert visibility to kilometers
        windSpeedVal.innerHTML = `${speed}m/s`;
        feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`; // Convert feels-like temperature to Celsius
    }).catch((error) => {
        alert('Failed to fetch current weather' + error.message); // Display error message if fetching weather fails
    });

     // Fetch six-day weather forecast data and update the forecast card
    fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
        let specificForecastDays = [];
        let sixDaysForecast = data.list.filter(forecast => {
            let forecastDate = new Date(forecast.dt_txt).getDate();
            if (!specificForecastDays.includes(forecastDate)) {
                return specificForecastDays.push(forecastDate); // Filter unique days for the forecast
            }
        });
        sixDaysForecastCard.innerHTML = ''; // Clear previous forecast content
       
      
        for (let i = 1; i < sixDaysForecast.length; i++) {
            let date = new Date(sixDaysForecast[i].dt_txt);
            sixDaysForecastCard.innerHTML += `
             <div class="forecast-thing">
                  <div class="icon-wrapper">
                  <img src="https://openweathermap.org/img/wn/${sixDaysForecast[i].weather[0].icon}.png" alt="">
                  <span>${(sixDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                  </div>
                  <p>${date.getDate()} ${months[date.getMonth()]}</p>
                  <p>${days[date.getDay()]}</p>
                </div>
            `;
        }

        // Add hourly forecast
        hourlyForecastCard.innerHTML = '';
        let hourlyData = data.list.slice(0, 12); // Show 12 hours of forecast

        hourlyData.forEach(hour => {
            let hourDate = new Date(hour.dt_txt);
            hourlyForecastCard.innerHTML += `
                <div class="hour-card">
                    <p>${hourDate.getHours()}:00</p>
                    <img src="https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png" alt="">
                    <p>${(hour.main.temp - 273.15).toFixed(2)}&deg;C</p>
                </div>
            `;
        });
    }).catch((error) => {
        alert(`Failed to fetch weather forecast of ${cityName}. Please try again`);
    });
}

function getCityCoordinates() {
   // Get the city name from the input field and trim any extra spaces
    let cityName = cityInput.value.trim();
    // Get the city name from the input field and trim any extra spaces
    cityInput.value = '';

// Construct the API URL to fetch city coordinates (latitude and longitude) from OpenWeatherMap
    let API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${api_Key}`;
  
    // Fetch the city coordinates using the API
    fetch(API_URL).then(res => res.json()) // Parse the response as JSON
    .then(data => {
       // If no data is returned, throw an error (city not found)
        if (data.length === 0) {
            throw new Error('City not found');
        }

        // Destructure the latitude, longitude, name, country, and state from the first result
        let { lat, lon, name, country, state } = data[0];
        // Call getWeatherDetails to fetch weather information for the selected city
        getWeatherDetails(name, lat, lon, country, state);
    }).catch(error => {
      // Display an alert if there is an error in fetching the city coordinates
        alert(`Failed to fetch coordinates of ${cityName}.Please try again`);
    });
}

 function getUserCoordinates(){
  // Get the user's current geolocation (latitude and longitude) using the browser's Geolocation API
  navigator.geolocation.getCurrentPosition(position => {
     // Destructure the latitude and longitude from the position object
     let {latitude, longitude} = position.coords;
 // Construct the reverse geocoding API URL to get the city name based on the user's coordinates
     let REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_Key}`;
 // Fetch the city name and country based on the user's latitude and longitude
    fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
      let {name, country, state} = data[0];
      getWeatherDetails(name, latitude, longitude, country, state);

    }).catch(() => {
      alert(`Failed to fetch user coordinates`);
    });
  }, error => {
    if(error.code === error.PERMISSION_DENIED){
      alert('Geolocation permission denied. Please reset location permission so as to grant access again');
    }
  });
 }  
// Event listener for search button, triggers weather fetching based on city input
searchBtn.addEventListener('click', getCityCoordinates);
//Event listener for location button
locationBtn.addEventListener('click', getUserCoordinates);

cityInput.addEventListener('keyup', e => e.key === 'Enter' && getCityCoordinates());
