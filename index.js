const WEATHER_API_KEY = "LVP2BAZE38STTXRBX55CEXHLE";

async function getWeatherReport(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }
}

getWeatherReport("london");
