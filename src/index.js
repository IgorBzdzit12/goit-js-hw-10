import { fetchCountries } from './fetchCountries.js';

var debounce = require('lodash.debounce');

function clearCountryList() {
    var list = document.querySelector('.country-list');
    list.innerHTML = '';
}

function clearCountryCard() {
    var card = document.querySelector('.country-info');
    card.innerHTML = '';
}

function renderCountryList(data) {
    var list = document.querySelector('.country-list');
    list.innerHTML = '';
    data.forEach(country => {
        var item = document.createElement('li');
        item.classList.add('country-item');
        var flag = document.createElement('img');
        flag.src = country.flags.png;
        flag.height = 35;
        item.appendChild(flag);
        var name = document.createElement('span');
        name.textContent = ' '+country.name.common;
        item.appendChild(name);
        list.appendChild(item);
    });
}

function renderCountryCard(data) {
    var card = document.querySelector('.country-info');
    card.innerHTML = '';
    var country = data[0];
    var flag = document.createElement('img');
    flag.src = country.flags.png;
    flag.width = 200;
    card.appendChild(flag);
    var name = document.createElement('h1');
    name.textContent = country.name.common;
    card.appendChild(name);
    var capital = document.createElement('p');
    capital.textContent = `Capital: ${country.capital}`;
    card.appendChild(capital);
    var population = document.createElement('p');
    population.textContent = `Population: ${country.population}`;
    card.appendChild(population);
    var languages = document.createElement('p');
    languages.textContent = `Languages: ${Object.values(country.languages).join(', ')}`;
    card.appendChild(languages);
}

function handleResponseData(data) {
    if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (data.length > 1) {
        clearCountryCard();
        renderCountryList(data);
    } else if (data.length === 1) {
        clearCountryList();
        renderCountryCard(data);
    }
}

document.querySelector('.search-box').addEventListener('input', debounce(function() {
    console.log('search button pressed');
    var name = document.querySelector('.search-box').value.trim();
    if (name === '') {
        clearCountryCard();
        clearCountryList();
        return;
    }
    fetchCountries(name).then(data => {
        console.log(data);
        handleResponseData(data);
    })
    .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        clearCountryCard();
        clearCountryList();
    })
}, 300));