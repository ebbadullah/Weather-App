const apiKey = '34140ee1f732bebcd656d333eecac3ae'
const weatherInfo = document.getElementById("weatherInfo");
const weatherDetails = document.getElementById("weatherDetails");
const spinner = document.getElementById("spinner");
const background = document.querySelector(".background");

function fetchWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    spinner.style.display = "block";
    weatherDetails.innerHTML = "";
    weatherInfo.classList.remove("visible");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            spinner.style.display = "none";
            if (data.cod === 200) {
                const { name, main, weather, wind } = data;
                const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

                weatherDetails.innerHTML = `
                    <img src="${iconUrl}" alt="${weather[0].description}" class="weather-icon">
                    <h2>${name}</h2>
                    <div class="weather-details">
                        <p><strong>Temperature:</strong> ${main.temp}°C</p>
                        <p><strong>Weather:</strong> ${weather[0].description}</p>
                        <p><strong>Humidity:</strong> ${main.humidity}%</p>
                        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
                    </div>
                `;
                weatherInfo.classList.add("visible");
                updateBackground(weather[0].main);
            } else {
                alert("City not found. Please try again.");
            }
        })
        .catch(() => {
            spinner.style.display = "none";
            alert("An error occurred. Please try again.");
        });
}

function updateBackground(weatherCondition) {
    let gradient;

    switch (weatherCondition.toLowerCase()) {
        case "clear":
            gradient = "linear-gradient(135deg, #ff9a9e, #fad0c4)";
            break;
        case "clouds":
            gradient = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
            break;
        case "rain":
        case "drizzle":
        case "thunderstorm":
            gradient = "linear-gradient(135deg, #4b6cb7, #182848)";
            break;
        case "snow":
            gradient = "linear-gradient(135deg, #e6e9f0, #eef1f5)";
            break;
        default:
            gradient = "linear-gradient(135deg, #1e3c72, #2a5298)";
    }

    background.style.background = gradient;
}