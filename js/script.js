async function getWeather() {
      const city = document.getElementById('cityInput').value;
      const apiKey = '516565d7236f4b42b34155753252406';
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        document.getElementById('cityName').textContent = `${data.location.name}, ${data.location.region}`;

        // Fix: Ensure icon URL includes https protocol
        const iconUrl = data.current.condition.icon;
        document.getElementById('icon').src = iconUrl.startsWith("//") ? `https:${iconUrl}` : iconUrl;

        document.getElementById('temperature').textContent = `${data.current.temp_c} °C`;
        document.getElementById('condition').textContent = `Condition: ${data.current.condition.text}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
        document.getElementById('wind').textContent = `Wind: ${data.current.wind_kph} kph`;

        document.getElementById('weatherBox').style.display = 'block';
      } catch (error) {
        alert(error.message);
        document.getElementById('weatherBox').style.display = 'none';
      }
    }