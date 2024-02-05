// Storing ApiKey in a variable here 
const apiKey = "bd894118ef89fd4cc0c3c75960a6e13c";


// This function will fetch data from API
async function fetchData(receieve) {
  
  // using try and catch method to catch the error
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${receieve}&units=metric&appid=${apiKey}`
    );

    const data = await response.json();

    // Handling response from the server
    if (!response.ok) {
      console.log(data.message);
    }
    renderWeather(data);
    // console.log(data);
  } catch (error) {
    console.log("Error", error);
  }
}

// Seleccting all the elements which we want to update
const cityName = document.querySelector(".city");
const date = new Date();
const dateIs = document.querySelector(".date");
const description = document.querySelector(".description-text");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const icon = document.querySelector(".description i");



// This function will render the weather info on screen
function renderWeather(data) {

  // setting all the elements data to the data recieved from API
  cityName.textContent = data.name;
  description.textContent = data.weather[0].description;
  temp.textContent = Math.round(data.main.temp);
  wind.textContent = `${data.wind.speed}KM/H`;
  humidity.textContent = `${data.main.humidity}%`;
  visibility.textContent = `${data.visibility / 1000}KM/H`;
  dateIs.textContent = date.toDateString();
  icon.textContent = getIcon(data.weather[0].main);
  // console.log(icon)
}


// This form will take city name as input to show that city weather
const form = document.querySelector(".search-form");
const input = document.querySelector(".city-input");

// Adding event listner to form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // taking user input 
  const cityInput = input.value;
  if (cityInput !== "") {
    fetchData(cityInput);
  }
  input.value = "";
});


// This function will update weather icon according to weather condition
function getIcon(weather) {
  const iconMap = {
    
    // The value stored in these keys are actually icon classes from google-font library
    Clear: "wb_sunny",
    Clouds: "wb_cloudy",
    Rain: "umbrella",
    Thunderstorm: "flash_on",
    Drizzle: "grain",
    Snow: "ac_unit",
    Mist: "cloud",
    Smoke: "cloud",
    Haze: "cloud",
    Fog: "cloud",
  };
  return iconMap[weather];
}