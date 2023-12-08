import { Notify } from 'notiflix';
import ApiPixabey from './js/classApiPixabey';

const formEl = document.querySelector('.form');
const photosListEl = document.querySelector('.photos');
const loadMoreBtn = document.querySelector('.load-more-btn');
const findPhotosBtn = document.querySelector('.js-form-btn');

loadMoreBtn.hidden = true;

const apiPixabey = new ApiPixabey();

formEl.addEventListener('submit', onFindPhotosClick);
loadMoreBtn.addEventListener('click', onMoreLoadBtnClick);

function onFindPhotosClick(e) {
  e.preventDefault();
  // findPhotosBtn.disabled = false;

  const searchQuery = e.target.elements.query.value;
  if (!searchQuery.trim()) return;

  apiPixabey.query = searchQuery.trim();

  loadMoreBtn.hidden = false;
  loadMoreBtn.disable = true;

  apiPixabey.resetPage(); // При submit завжди починаємо з першої сторінки
  apiPixabey.fetchPhotos().then(hits => {
    clearPhotosContainer(); //Очищуємо попередні результати запиту

    photosListEl.insertAdjacentHTML('beforeend', markupFetch(hits));

    loadMoreBtn.disable = false;
  });
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

function onMoreLoadBtnClick() {
  loadMoreBtn.disable = true;
  loadMoreBtn.textContent = 'LOADING>>>'; // Як приклад  + спінер потрібно
  apiPixabey.fetchPhotos().then(hits => {
    photosListEl.insertAdjacentHTML('beforeend', markupFetch(hits));
    loadMoreBtn.disable = false;
    loadMoreBtn.textContent = 'Load more';
  });
}

function clearPhotosContainer() {
  photosListEl.innerHTML = '';
}
