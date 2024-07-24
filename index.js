const WEATHER_API_KEY = "LVP2BAZE38STTXRBX55CEXHLE";
const weatherToday = document.querySelector(".weather-today");
const weatherHourly = document.querySelector(".weather-hourly");
const weatherDaily = document.querySelector(".weather-daily");
const searchLocation = document.querySelector("#search-location");
const searchBtn = document.querySelector(".search-btn");

async function getWeatherReport(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e.message);
  }
}

function updateCurrentWeatherDisplay(data) {
  const weatherCurrent = document.querySelector(".weather-current");

  // create current weather display location & time
  const weatherCurrentInfo = document.createElement("div");
  weatherCurrentInfo.classList.add("weather-current-info");
  weatherCurrentInfo.textContent = `${data.resolvedAddress} As of ${data.currentConditions.datetime} ${data.timezone}`;

  // create current temperature display
  const weatherCurrentTemp = document.createElement("div");
  weatherCurrentTemp.classList.add("weather-current-temp");
  weatherCurrentTemp.textContent = `${data.currentConditions.temp} ℃`;

  // create current conditions display
  const weatherCurrentConditions = document.createElement("div");
  weatherCurrentConditions.classList.add("weather-current-condition");
  weatherCurrentConditions.textContent = `${data.currentConditions.conditions}`;

  // create current conditions description
  const weatherCurrentDescription = document.createElement("div");
  weatherCurrentDescription.classList.add("weather-current-description");
  weatherCurrentDescription.textContent = `${data.description}`;

  // create current conditions icon
  const weatherCurrentIcon = document.createElement("img");
  weatherCurrentIcon.classList.add("weather-current-icon");
  weatherCurrentIcon.src = `weather-icons/${data.currentConditions.icon}.svg`;

  weatherCurrent.replaceChildren();
  weatherCurrent.appendChild(weatherCurrentInfo);
  weatherCurrent.appendChild(weatherCurrentTemp);
  weatherCurrent.appendChild(weatherCurrentConditions);
  weatherCurrent.appendChild(weatherCurrentIcon);
  weatherCurrent.appendChild(weatherCurrentDescription);
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getWeatherReport(searchLocation.value).then((data) => {
    updateCurrentWeatherDisplay(data);
  });
  searchLocation.value = "";
});

searchLocation.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeatherReport(searchLocation.value).then((data) => {
      updateCurrentWeatherDisplay(data);
    });
    searchLocation.value = "";
  }
});
