import { Notify } from 'notiflix';
import ApiPixabey from './js/classApiPixabey';

const formEl = document.querySelector('.form');
const photosListEl = document.querySelector('.photos');
const loadMoreBtn = document.querySelector('.load-more-btn');
const findPhotosBtn = document.querySelector('.js-form-btn');

loadMoreBtn.hidden = true;

const apiPixabey = new ApiPixabey();

formEl.addEventListener('submit', onFindPhotosClick);
loadMoreBtn.addEventListener('click', fetchPhotosFunction);

function onFindPhotosClick(e) {
  e.preventDefault();

  const searchQuery = e.target.elements.query.value;
  if (!searchQuery.trim()) return;

  apiPixabey.query = searchQuery.trim();

  apiPixabey.resetPage(); // При submit завжди починаємо з першої сторінки
  clearPhotosContainer(); //Очищуємо попередні результати запиту

  fetchPhotosFunction();
  loadMoreBtn.hidden = false;
}

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

function fetchPhotosFunction() {
  findPhotosBtn.disabled = true;

  // Як приклад  + спінер потрібно

  apiPixabey.fetchPhotos().then(({ hits, total }) => {
    // Перевірка, чи потрібна кнопка LOAD MORE
    if (total <= hits.length) {
      loadMoreBtn.hidden = true;
    }

    loadMoreBtn.disable = true;
    loadMoreBtn.textContent = 'LOADING>>>'; // loader краще

    photosListEl.insertAdjacentHTML('beforeend', markupFetch(hits));

    loadMoreBtn.disable = false;
    loadMoreBtn.textContent = 'Load more';
    findPhotosBtn.disabled = false;
  });
}

function clearPhotosContainer() {
  photosListEl.innerHTML = '';
}
