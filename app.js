let latitude = "9.55";

let longitude = "44.050000";

let  countries = [];

getCities();


const KELVIN_VALUE = 273.15;
document.querySelector(".locationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let city = document.querySelector(".locationInput");
  if (city.value == "") {
    city.style.border = "1px solid red";
    city.value = "";
    let btn = document.querySelector(".locationBtn");
    btn.disabled = true;
    city.focus();
    let error = document.querySelector(".locationError");
    error.textContent = "Erreur : le champ est obligatoire";
    error.style.display = "block";
  } else if (isCityReel(city.value)) {
    console.log("ok");
    let btn = document.querySelector(".locationBtn");
    btn.disabled = true;
    getWeather(city.value);
    city.value = "";
  } else {
    let error = document.querySelector(".locationError");
    error.textContent = "Erreur : résultat introuvable";
    let btn = document.querySelector(".locationBtn");
    btn.disabled = true;
    error.style.display = "block";
    city.style.border = "1px solid red";
    city.value = "";
    city.focus();
  }
});

document.querySelector(".locationInput").addEventListener("input", (e) => {
  let error = document.querySelector(".locationError");
  error.style.display = "none";
  let city = document.querySelector(".locationInput");
  city.style.border = "none";
  let btn = document.querySelector(".locationBtn");
  btn.disabled = false;
});

document.querySelector(".temperature-value").addEventListener("click", (e) => {
  e.preventDefault();
  const temperature = document.getElementById("temperature");
  if (temperature.textContent.includes("C")) {
    temperature.textContent = temperature.textContent.includes("-")?"- ° F":CeltoFah(temperature.textContent.split(' ')[0]) + " ° F";
  } else {
    temperature.textContent = temperature.textContent.includes("-")?"- ° C":FahtoCel(temperature.textContent.split(' ')[0]) + " ° C";
  }
});

function FahtoCel(fahValue) {
      return parseInt((Math.ceil(fahValue - 32) / 1.8), 10);
}

function CeltoFah(celValue) {
  return parseInt((Math.ceil(celValue * 1.8)) + 32, 10);
}

function isCityReel(city) {
  return countries.some(country => country.CapitalName.toLowerCase() == city.toLowerCase());
}

function getLatLong(city) {
  return  countries.find(country => country.CapitalName.toLowerCase() == city.toLowerCase());
}

async function getCities() {
  return await fetch("./country-capitals.json").then((response) => response.json()).then((data) => {
    countries = data;
    console.log(countries);
    return countries;
  });
}

function getWeather(city){
  console.log(city);
  let tmp = getLatLong(city);
  console.log(tmp);
  document.querySelector(".locationImg").display = "block";
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    tmp.CapitalLatitude +
    "&lon=" +
    tmp.CapitalLongitude +
    "&appid=82005d27a116c2880c8f0fcb866998a0"
    )
    .then((degree) =>{
      return degree.json() //REcup que les data
    }
      )
      .then((json) => {
        const temperature = document.getElementById("temperature");
        const description = document.getElementById("description");
        const location = document.getElementById("location");
        const icon = document.getElementById("icon");
        let TempTmp;
        if (temperature.textContent.includes("C")) {
          TempTmp = kelvToCel(json.main.temp);
          temperature.textContent = TempTmp + " ° C";
        } else {
          TempTmp = kelvToFah(json.main.temp);
          temperature.textContent = TempTmp + " ° F";
        }
        description.innerHTML = json.weather[0].description;
        location.innerHTML = tmp.CapitalName;
        icon.src = "./icons/" + json.weather[0].icon + ".png";
        document.querySelector(".locationImg").display = "none";
      })
      .catch((error) => {
        console.log("error", error);
      });
    }

    function kelvToCel(kelvinValue) {
      return parseInt(kelvinValue - KELVIN_VALUE, 10);
    }
    
    function kelvToFah(kelvinValue) {
      return parseInt((kelvinValue - KELVIN_VALUE) * 1.8 + 32, 10);
    }
    
