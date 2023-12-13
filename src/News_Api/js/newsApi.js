import NewsApi from './classNewsApi';

const newsGallery = document.querySelector('.js-newsApi');
const form = document.querySelector('.form');
const findNewsBtn = document.querySelector('.js-form-btn');
const loadMoreNewsBtn = document.querySelector('.js-load-more-news-btn');

findNewsBtn.textContent = 'Find news';
const fetchHotNews = new NewsApi();

form.addEventListener('submit', handleFindNewsBtn);
loadMoreNewsBtn.addEventListener('click', handleLoadNewsBtn);

loadMoreNewsBtn.hidden = true;

function markupNews(arr) {
  return arr
    .map(({ title, author, publishedAt, urlToImage, description, url }) => {
      return `
      <li class="news-card">
        <div class="news-image">
          <img
            src="${urlToImage}"
            alt="${title}"
          />
        </div>
        <div class="news-details">
          <h2 class="news-title">${title}</h2>
          <p class="news-author">${author}</p>
          <p class="news-publishedAt">Published at: ${dateFix(publishedAt)}</p>
          <p class="news-description">${description}</p>
          <a
            href="${url}"
            class="news-url"
            >Read more</a
          >
        </div>
      </li>
        `;
    })
    .join('');
}

function handleFindNewsBtn(e) {
  e.preventDefault();

  const searchNewsQuery = e.currentTarget.elements.query.value.trim();

  if (!searchNewsQuery) {
    alert('Bad request!');
    return;
  }

  fetchHotNews.searchQuery = searchNewsQuery;
  fetchHotNews.resetPage();
  clearNewsContainer();

  loadMoreNewsBtn.hidden = true;

  handleLoadNewsBtn();
}

async function handleLoadNewsBtn() {
  try {
    findNewsBtn.disabled = true;

    const news = await fetchHotNews.fetchNews();

    const { articles, totalResults } = news;

    if (totalResults > articles.length) {
      loadMoreNewsBtn.hidden = false;
    }
    if (!totalResults) {
      loadMoreNewsBtn.hidden = true;

      alert("Can't find such news");
      throw new Error('bad request');
    }

    loadMoreNewsBtn.disable = true;
    loadMoreNewsBtn.textContent = 'LOADING>>>';

    newsGallery.insertAdjacentHTML('beforeend', markupNews(articles));

    loadMoreNewsBtn.disable = false;
    loadMoreNewsBtn.textContent = 'Load more';
    findNewsBtn.disabled = false;
  } catch (error) {
    loadMoreNewsBtn.hidden = true;
    console.error(error);
    findNewsBtn.disabled = false;
  }
}

function clearNewsContainer() {
  newsGallery.innerHTML = '';
}

function dateFix(incomingDate) {
  const dateString = incomingDate;
  const date = new Date(dateString);

  // Отримання різних компонентів дати (день, місяць, рік, година, хвилина)
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Додаємо 1 до місяця, оскільки місяці в Date починаються з 0
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  // Форматування дати у потрібний вам формат ('YYYY-MM-DD HH:mm')
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDate;
}
