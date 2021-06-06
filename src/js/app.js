// DOM Select //
// const body = document.querySelector("body");
const inputSearch = document.querySelector("#input-search");
const filterButton = document.querySelector(".filter__button");
const filterList = document.querySelector(".filter__list");
const filterItems = document.querySelectorAll(".filter__item");
const countriesSection = document.querySelector(".countries");

console.log(filterList);

// Initalize variables
const BASE_URL = "https://restcountries.eu/rest/v2";
let region = "asia";

// EVENTS //

// When dom content loaded
window.addEventListener("DOMContentLoaded", () => {
  getCountries(region);
});

// Show filter items
filterButton.addEventListener("click", () => {
  const arrow = document.querySelector("#arrow");
  arrow.classList.toggle("fa-chevron-up");
  filterList.classList.toggle("show-list");
});

// Show result based on search
inputSearch.addEventListener("keyup", (e) => {
  const countries = document.querySelectorAll(".country");
  const searchValue = e.target.value.toLocaleLowerCase();

  countries.forEach((country) => {
    const countryName = country.querySelector(".country__name");
    const nameValue = countryName.textContent.toLocaleLowerCase();
    const parentDiv = countryName.parentElement.parentElement;

    if (nameValue.indexOf(searchValue) !== -1) {
      parentDiv.style.display = "block";
    } else {
      parentDiv.style.display = "none";
    }
  });
});

// Functions //

// Get data by filter
filterItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    let value = e.currentTarget.textContent.toLowerCase();
    region = value;

    getCountries(region);
  });
});

// get countries from api
async function getCountries(region) {
  const response = await fetch(BASE_URL + "/region/" + region);
  //   console.log(BASE_URL + region);
  const data = await response.json();

  showCountryData(data, region);
}

// Show country data
function showCountryData(data, region) {
  data.forEach((country) => {
    let countryA = document.createElement("a");
    countryA.href = `country.html?name=${country.alpha2Code}`;
    countryA.classList.add("country");
    countryA.innerHTML = `
                        <div class="country__flag"><img src="${country.flag}" alt="Country Flag"></div>

                        <div class="country__info">
                        <h2 class="country__name country-name">${country.name}</h2>
                        <p class="country__population country-info">
                            Population: <span class="light-text">${country.population}</span>
                        </p>
                        <p class="country__region country-info">
                            Region: <span class="light-text">${country.region}</span>
                        </p>
                        <p class="country__capital country-info">
                            Capital: <span class="light-text">${country.capital}</span>
                        </p>
                        </div>`;
    countriesSection.appendChild(countryA);
  });
  const allDivs = countriesSection.querySelectorAll(".country");
  showByFilter(allDivs, region);
}

// Show by filter
function showByFilter(countries, region) {
  countries.forEach((country) => {
    const regionNameTag = country.querySelector(".country__region span");
    let regionName = regionNameTag.textContent.toLowerCase();
    if (regionName !== region) {
      let parent = regionNameTag.parentElement.parentElement.parentElement;
      parent.style.display = "none";
    }
  });
}
