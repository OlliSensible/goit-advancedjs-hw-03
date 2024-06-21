import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
import iziToast from 'izitoast/dist/js/iziToast.min.js';

import 'modern-normalize/modern-normalize.css';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  breedsList: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  catInfo: document.querySelector('div.cat-info'),
};

renderBreeds();

elements.breedsList.addEventListener('change', onBreedSelect);

function onBreedSelect(e) {
  renderCatInfo(e.target.value);
}

function renderCatInfo(id) {
  showLoader();
  elements.catInfo.innerHTML = '';
  fetchCatByBreed(id)
    .then(({ data: [cat] }) => {
      elements.catInfo.innerHTML = getCatInfoCardHTML(cat);
      hideLoader();
      elements.breedsList.classList.remove('hidden'); 
    })
    .catch(err => {
      hideLoader();
      showApiError(err);
    });
}

function renderBreeds() {
  showLoader();
  fetchBreeds()
    .then(({ data: breeds }) => {
      elements.breedsList.innerHTML = breeds
        .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
        .join('');
      hideLoader();
      elements.breedsList.classList.remove('hidden');
    })
    .catch(err => {
      hideLoader();
      showApiError(err);
    });
}

function getCatInfoCardHTML(cat) {
  return `<div class="cat-info-card flex mt-5 pr-2 lg:pr-20">
            <img class="cat-info-image relevant w-1/3 object-cover pr-10" src="${cat.url}" alt="cat" />
            <div class="cat-info-holder flex flex-col px-2.5">
              <h2 class="cat-info-title mb-2.5 text-2xl font-bold">${cat.breeds[0].name}</h2>
              <p class="cat-info-text my-2.5 text-lg">${cat.breeds[0].description}</p>
              <p class="cat-info-text my-2.5 text-lg"><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
            </div>
          </div>`;
}

function showLoader() {
  elements.loader.classList.remove('hidden');
  elements.breedsList.classList.add('hidden'); 
}

function hideLoader() {
  elements.loader.classList.add('hidden');
}

function showApiError(err) {
  elements.catInfo.innerHTML = '<p class="text-red-500 text-center text-3xl pt-40">Oops! We did not find the cat you requested 😢</p>';
  elements.breedsList.classList.remove('hidden'); 
}
