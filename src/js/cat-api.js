import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_u3yEvYAxGPL6AUaoQgzmpefMY5Xt0C5cztwzIhJ5Bkgdn8atxyREoXu89TrCC4ua';

function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

function fetchCatByBreed(breedId) {
  const query = new URLSearchParams({ breed_ids: breedId });
  return axios.get(`https://api.thecatapi.com/v1/images/search?${query}`);
}

export { fetchBreeds, fetchCatByBreed };
