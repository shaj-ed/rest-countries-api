// DOM selects
const detailsSection = document.querySelector(".country-details");
const query = new URLSearchParams(window.location.search);
const params = query.get("name");

// URL
const url = "https://restcountries.eu/rest/v2/alpha/";

console.log(url + params);

// Events //
window.addEventListener("DOMContentLoaded", (e) => {
  getCoutryData();
});

// Functions //

// Get country data
async function getCoutryData() {
  const response = await fetch(url + params);
  const data = await response.json();

  showCountryDetails(data);
}

// Show country details at html docs
function showCountryDetails(data) {
  detailsSection.innerHTML = `<div class="country-details__flag"><img src="${
    data.flag
  }" alt="Country Flag"></div>

    <div class="country-details__main">
      <h2 class="country-name country-details--name">${data.name}</h2>

      <div class="country-details--top">
        <p class="country-info">
          Native Name: <span class="light-text">${data.nativeName}</span>
        </p>
        <p class="country-info">
          Population: <span class="light-text">${data.population}</span>
        </p>
        <p class="country-info">
          Region: <span class="light-text">${data.region}</span>
        </p>
        <p class="country-info">
          Subregion: <span class="light-text">${data.subregion}</span>
        </p>
        <p class="country-info">
          Capital: <span class="light-text">${data.capital}</span>
        </p>
      </div>

      <div class="country-details--bottom">
        <p class="country-info">
          Top Level Domain: <span class="light-text">${
            data.topLevelDomain[0]
          }</span>
        </p>
        <p class="country-info">
          Currencies: <span class="light-text">${data.currencies[0].name}</span>
        </p>
        <p class="country-info">
          Languages: <span class="light-text">
            ${data.languages.map((lang) => lang.name)}
          </span>
        </p>
      </div>

      <div class="country-details--border">
        <p class="country-info">Border Countries:</p>
        <div class="buttons">        
          ${data.borders
            .map((border) => {
              return `<a href="country.html?name=${border}" class="country-button">
                  ${border}
                </a>`;
            })
            .join(" ")}
        </div>
      </div>
    </div>`;
}
