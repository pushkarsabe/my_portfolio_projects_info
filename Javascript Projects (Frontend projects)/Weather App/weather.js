const API_KEY = `b7f713ad492c442c65855997028faa82`
const weather = document.querySelector("#weather")

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    console.log("Geolocation is not supported by this browser.");
}

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("Latitude: " + latitude + ", Longitude: " + longitude);

    // Call a function to get the city name from the coordinates
    getCityName(latitude, longitude);
}

function error() {
    console.log("Unable to retrieve your location.");
}

function getCityName(lat, lon) {
    const apiKey = API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const city = data.name;
            console.log("City: " + city);
            //pass the city to getWeather function which will fetch the weather
            getWeather(city);   
        })
        .catch(error => console.error('Error:', error));
}

const getWeather = async(city) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return showWeather(data);
}

const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h2> City Not Found <h2>`
        return;
    }
    weather.innerHTML = `
        <div>
            <h1>${data.name}</h1>
        </div>
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4> ${data.weather[0].main} Wind = ${data.wind.speed}</h4>
        </div>
    `
}