import { Notify } from 'notiflix';

const params = {
  BASE_URL: 'https://pixabay.com/api/',
  API_KEY: '34842285-9ef26a99ee49cc306160c27d8',
};

const options = {
  q: 'random',
  per_page: 20,
  image_type: 'photo',
  page: 1,
};

const formEl = document.querySelector('.form');
const photosListEl = document.querySelector('.photos');

formEl.addEventListener('submit', onFindPhotosClick);

function onFindPhotosClick(e) {
  e.preventDefault();

  const searchQuery = e.target.elements.query.value;
  if (!searchQuery.trim()) return;

  console.log(searchQuery);
}

function fetchPhoto() {
  fetch(
    `${params.BASE_URL}?key=${params.API_KEY}&q=${options.q}&image_type=${options.image_type}&per_page=${options.per_page}&page=${options.page}`
  )
    .then(res => res.json())
    .then(({ hits }) => {
      photosListEl.insertAdjacentHTML('beforeend', markupFetch(hits));
    });
}

fetchPhoto();

function markupFetch(arr) {
  return arr
    .map(({ largeImageURL, tags }) => {
      return `<li class="photo-item">
        <img src="${largeImageURL}" alt="${tags}" />
        <p>${tags}</p>
      </li>`;
    })
    .join('');
}
