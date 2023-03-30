import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const refs = {
  searchBoxEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.searchBoxEl.addEventListener('input', debounce(onInput, 300));

function onInput(e) {
  e.preventDefault();

  const searchedCountry = e.target.value.trim();
  console.log(searchedCountry);

  if (searchedCountry === '') {
    clearMarkup();
    return;
  }

  fetchCountries(searchedCountry)
    .then(countries => {
      clearMarkup();

      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length <= 10 && countries.length >= 2) {
        makeListOfCountriesMarkup(countries);
      } else {
        makeCountryMarkup(countries[0]);
      }
    })
    .catch(error => {
      if ((error.massage = 404)) {
        clearMarkup();

        Notiflix.Notify.failure('Oops, there is no country with that name');
        refs.searchBoxEl.value = '';
        console.log(error);
      }
    });

  // Якщо користувач повністю очищає поле пошуку, то HTTP-запит не виконується, а розмітка списку країн або інформації про країну зникає.
  function clearMarkup() {
    refs.countryListEl.innerHTML = '';
    refs.countryInfoEl.innerHTML = '';
  }

  function makeCountryMarkup(country) {
    clearMarkup();
    const { name, capital, population, flags, languages } = country;

    refs.countryInfoEl.innerHTML = `
    <div class="country-card">
      <img src="${flags.svg}" width = 150px alt="${name.official} flag "/>
      <div class="country-info-card">
        <h2>${name.official}</h2>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population.toLocaleString()} people</p>
        <p><b>Languages:</b> ${Object.values(languages)}</p>
      </div>
    </div>`;
  }

  function makeListOfCountriesMarkup(countries) {
    const markupList = countries
      .map(country => {
        const { name, flags } = country;

        return `<li>
        <img src="${flags.svg}" width =40px alt="${name.official}">
        <p>${name.official}</p>
        </li>`;
      })
      .join('');

    refs.countryListEl.innerHTML = markupList;
  }
}
