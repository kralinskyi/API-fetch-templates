import ApiPixabey from './classApiPixabey';

const formEl = document.querySelector('.form');
const photosListEl = document.querySelector('.photos');
const loadMoreBtn = document.querySelector('.load-more-btn');
const findPhotosBtn = document.querySelector('.js-form-btn');
const inputEl = document.querySelector('.form-input');

const apiPixabey = new ApiPixabey();
loadMoreBtn.hidden = true;

formEl.addEventListener('submit', onFindPhotosClick);
loadMoreBtn.addEventListener('click', fetchPhotosFunction);

function onFindPhotosClick(e) {
  e.preventDefault();

  const searchQuery = e.target.elements.query.value;

  if (!searchQuery.trim()) return;
  apiPixabey.query = searchQuery.trim(); // записуємо в екз. класу query без пробілів

  apiPixabey.resetPage(); // При submit завжди починаємо з першої сторінки
  clearPhotosContainer(); //Очищуємо попередні результати запиту

  fetchPhotosFunction(); // fetch query
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

  apiPixabey
    .fetchPhotos()
    .then(({ hits, total }) => {
      if (!hits.length) {
        loadMoreBtn.hidden = true;

        alert("Can't find such photos");
        throw new Error('bad request');
      }

      // Перевірка, чи потрібна кнопка LOAD MORE
      if (
        total <= hits.length ||
        hits.length * apiPixabey.page >= total ||
        total === 0
      ) {
        loadMoreBtn.hidden = true;
      }

      loadMoreBtn.disable = true;
      loadMoreBtn.textContent = 'LOADING>>>'; // loader краще

      photosListEl.insertAdjacentHTML('beforeend', markupFetch(hits));

      loadMoreBtn.disable = false;
      loadMoreBtn.textContent = 'Load more';
      findPhotosBtn.disabled = false;
    })
    .catch(error => {
      loadMoreBtn.hidden = true;
      console.error(error);
      findPhotosBtn.disabled = false;
    });
}

function clearPhotosContainer() {
  photosListEl.innerHTML = '';
}
