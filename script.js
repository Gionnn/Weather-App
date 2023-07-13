function getWeatherForCity(cityname) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=e6c18f92c0b1eb2535ace7c6c9bee521`;
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();
  request.onload = () => {
    displayData(JSON.parse(request.response));
  };
}

function displayData(data) {
  console.log(data);
  if (
    document.getElementById("city-input").value != "" &&
    data != [] &&
    data["cod"] != 404
  ) {
    document.getElementById("weather-info").style.display = "flex";
  }

  let temperatures = data["main"];
  let currentTemperature = Math.round(temperatures["temp"] * 10) / 10;
  let minTemperature = Math.round(temperatures["temp_min"] * 10) / 10;
  let maxTemperature = Math.round(temperatures["temp_max"] * 10) / 10;

  let rainStatus = data["weather"][0]["description"];

  let windSpeed = data["wind"]["speed"];

  document.getElementById("current-temperature").innerHTML =
    currentTemperature + "°C";
  document.getElementById("min-temperature").innerHTML = minTemperature + "°C";
  document.getElementById("max-temperature").innerHTML = maxTemperature + "°C";

  document.getElementById("rain-description").innerHTML = rainStatus;

  document.getElementById("windspeed-info").innerHTML = windSpeed + "km/h";
  console.log(data);
}

document
  .getElementById("city-input")
  .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key == "Enter") {
      let cityInput = document.getElementById("city-input").value;
      getWeatherForCity(cityInput);
    }
  });
