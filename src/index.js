import './styles.css';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

import countryCardTpl from '../templates/country-card.hbs';
import fetchCountries from './js/fetchCountries';

import getRefs from './js/getRefs';

const refs = getRefs();

const debounce = require('lodash.debounce');

refs.searchInput.addEventListener(
    'input',
    debounce(() => {
        searchCountry();
    }, 500)
);

function searchCountry() { 
    fetchCountries(refs.searchInput.value)
        .then(contries => {
            if (contries.length > 10) {
                error({
                    text: 'Too many matches found. Please enter a more specific query!',
                    type: 'info'
                });
            } else if (contries.length > 1) { 
                renderContriesList(contries);
            } else if (contries.length === 1) { 
                 renderCountryCard(contries[0])
            }
        })
    .catch(error => console.log(error));
}

function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    refs.cardContainer.innerHTML = markup;
}

function renderContriesList(countries) {
    let markup = '<ul>';
    for (let country of countries) {
        markup += `<li>${country.name}</li>`;
    }
    markup +='</ul>'
    refs.cardContainer.innerHTML = markup;
}


