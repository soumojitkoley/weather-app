const API_KEY = "20355a1f1933d42392ca09506a29bb33";

let wrapper = document.querySelector('.wrapper')
let getLocation = document.querySelector('.search input');
let searchButton = document.querySelector('.search-btn');
let showWeatherIcon = document.querySelector('.weather-icon');
let showTemp = document.querySelector('.show-temp');
let showCity = document.querySelector('.show-city-name');
let grantLocationButton = document.querySelector('.permit-btn');
let grantLocationIcon = document.querySelector('.location-icon')
let yourWeatherButton = document.querySelector('.your-weather');
let searchWeatherButton = document.querySelector('.search-weather');
let loader = document.querySelector('.loader');
let setWindSpeed = document.querySelector('.set-wind-speed');
let setHumidity = document.querySelector('.set-humidity');
let setClouds = document.querySelector('.set-clouds');
let getWindSpeed = document.querySelector('.wind-speed');
let getHumidity = document.querySelector('.humidity');
let getClouds = document.querySelector('.clouds');
let setFlagIcon = document.querySelector('.flag-icon');


yourWeatherButton.addEventListener('click', () => {
    loader.style.display = 'block';
    if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' })
            .then(permissionStatus => {
                if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
                    grantLocationIcon.style.display = 'none';
                    grantLocationButton.style.display = 'none';
                    getWindSpeed.style.display = 'none';
                    getHumidity.style.display = 'none';
                    getClouds.style.display = 'none';
                    setFlagIcon.style.display = 'none';
                    //wrapper.style.height = '580px';
                    wrapper.style.transition = '0.3s linear';
                    yourWeatherButton.style.backgroundImage = 'linear-gradient( 112.1deg,  rgba(32,38,57,1) 11.4%, rgba(63,76,119,1) 70.2% )';
                    searchWeatherButton.style.backgroundImage = 'none';
                    grantLocationIcon.style.display = 'block';
                    grantLocationButton.style.display = 'block';
                    searchButton.style.display = 'none';
                    getLocation.style.display = 'none';
                    wrapper.style.height = '550px';
                    showWeatherIcon.style.display = 'none';
                    showTemp.style.display = 'none';
                    showCity.style.display = 'none';
                    getUserLocation();
                }
                else{
                    wrapper.style.height = '400px';
                    loader.style.display = 'block';
                    grantLocationIcon.style.display = 'block';
                    grantLocationButton.style.display = 'block';
                    showWeatherIcon.style.display = 'none';
                    showTemp.style.display = 'none';
                    showCity.style.display = 'none';
                    loader.style.display = 'none';
                    setFlagIcon.style.display = 'none';
                    searchButton.style.display = 'none';
                    getLocation.style.display = 'none';
                    yourWeatherButton.style.backgroundImage = 'linear-gradient( 112.1deg,  rgba(32,38,57,1) 11.4%, rgba(63,76,119,1) 70.2% )';
                    searchWeatherButton.style.backgroundImage = 'none';
                    getWindSpeed.style.display = 'none';
                    getHumidity.style.display = 'none';
                    getClouds.style.display = 'none';
                }
            })
    }
})

searchWeatherButton.addEventListener('click', () => {

    wrapper.style.height = '300px';
    wrapper.style.transition = '0.3s linear';
    yourWeatherButton.style.backgroundImage = 'none';
    searchWeatherButton.style.backgroundImage = 'linear-gradient( 112.1deg,  rgba(32,38,57,1) 11.4%, rgba(63,76,119,1) 70.2% )';
    getLocation.style.display = 'block';
    searchButton.style.display = 'block';
    grantLocationIcon.style.display = 'none';
    grantLocationButton.style.display = 'none';

    showWeatherIcon.style.display = 'none';
    showTemp.style.display = 'none';
    showCity.style.display = 'none';
    setFlagIcon.style.display = 'none';

    getWindSpeed.style.display = 'none';
    getHumidity.style.display = 'none';
    getClouds.style.display = 'none';
})


grantLocationButton.addEventListener('click', () => {
    getUserLocation();
})

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        
        grantLocationIcon.style.display = 'none';
    grantLocationButton.style.display = 'none';
    loader.style.display = 'block';

    } else {
        alert("Geolocation is not supported by your browser");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWeatherByLL(latitude, longitude);
}

function showError(error) {
    grantLocationIcon.style.display = 'block';
    grantLocationButton.style.display = 'block';
    loader.style.display = 'none';
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

async function getWeatherByLL(lat, lon) {
    showTemp.style.display = 'none';
    showCity.style.display = 'none';
    wrapper.style.height = '550px';
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        let data = await response.json();

        console.log(data);
        displayPhoto(data);
        displayData(data);
    }
    catch (error) {
        console.log(error);
    }
}

async function displayData(data) {
    showWeatherIcon.style.display = 'block';
    let flag = data.sys.country;
    setFlagIcon.src = `https://flagsapi.com/${flag}/flat/64.png`;
    setFlagIcon.style.display = 'block';
    showTemp.style.display = 'block';
    showCity.style.display = 'block';
    loader.style.display = 'none';
    getWindSpeed.style.display = 'block';
    getHumidity.style.display = 'block';
    getClouds.style.display = 'block';
    showTemp.textContent = Math.round(data.main.temp) + " °C";
    showCity.textContent = data.name;
    setWindSpeed.textContent = data.wind.speed + "m/s";
    setHumidity.textContent = data.main.humidity + "%";
    setClouds.textContent = data.clouds.all + "%";
}

async function displayPhoto(data) {
    if (data.weather[0].main == "Clouds") {
        showWeatherIcon.src = "icons/clouds.png";
        weather = "icons/clouds.png";
    }
    else if (data.weather[0].main == "Haze") {
        showWeatherIcon.src = "icons/haze.png";
    }
    else if (data.weather[0].main == "Clear") {
        showWeatherIcon.src = "icons/clear.png";
    }
    else if (data.weather[0].main == "Rain") {
        showWeatherIcon.src = "icons/rain.png";
    }
    else if (data.weather[0].main == "Drizzle") {
        showWeatherIcon.src = "icons/drizzle.png";
    }
    else if (data.weather[0].main == "Mist") {
        showWeatherIcon.src = "icons/mist.png";
    }
    else if (data.weather[0].main == "Smoke") {
        showWeatherIcon.src = "icons/smoke.png";
    }
}

async function getWeather(cityName) {
    showWeatherIcon.style.display = 'none';
    showTemp.style.display = 'none';
    showCity.style.display = 'none';
    wrapper.style.height = '570px';
    loader.style.display = 'block';
    getWindSpeed.style.display = 'none';
    getHumidity.style.display = 'none';
    getClouds.style.display = 'none';
    setFlagIcon.style.display = 'none';

    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);

        let data = await response.json();
        console.log(data);

        if(data.cod == "404") {
            displayCityError(data);

        }
        else{
            displayPhoto(data);
            displayData(data);
        }
    }
    catch (data) {
        alert(data);
    }
}

searchButton.addEventListener('click', () => {
    if(getLocation.value == "") alert("please enter a city name !!!");
    else{
        getWeather(getLocation.value);
        getLocation.value = "";
    }
})

getLocation.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        if(getLocation.value == "") alert("please enter a city name !!!");
        else{
            getWeather(getLocation.value);
            getLocation.value = "";
        }
    }
});

function displayCityError(data) {
    loader.style.display = 'none';
    alert(`${data.message}`);
}