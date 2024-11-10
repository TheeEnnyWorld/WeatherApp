function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;
  fetchTemperature(searchInputElement.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;

  let temperatureElement = document.querySelector("#present-temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let descriptionElement = document.querySelector("#description");
  console.log(response.data.condition.description);

  let cityElement = document.querySelector("#current-city");
  descriptionElement = response.data.condition.description;
  cityElement.innerHTML = city;
}

function fetchTemperature(city) {
  let apiKey = "3fe65bdtbe2f46e90e4839f06a35o867";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
