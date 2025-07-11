document.addEventListener('DOMContentLoaded', function () {
  const cityInput = document.getElementById('city-input');
  const cityButton = document.getElementById('get-weather-btn');
  const weatherInfo = document.getElementById('weather-info');
  const cityName = document.getElementById('city-name');
  const temperatureDisplay = document.getElementById('temperature');
  const descriptionDisplay = document.getElementById('description');
  const errorMessageDisplay = document.getElementById('error-message');

  const Api_key = '7dd05a63c9a2ae990610355ece69844a';

  cityButton.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  }

  function displayWeatherData(data) {
    const { name, main, weather } = data;
    cityName.textContent = name;
    temperatureDisplay.textContent = ` temperature: ${main.temp}°C`;
    descriptionDisplay.textContent = ` weather: ${weather[0].description} `;
    weatherInfo.classList.remove('hidden');
    errorMessageDisplay.classList.add('hidden');
  }

  function showError() {
    weatherInfo.classList.add('hidden');
    errorMessageDisplay.classList.remove('hidden');
  }
});
