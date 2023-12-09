// import './API_Pixabey/js/pixabeyApi';
import './News_Api/js/classNewsApi';

import NewsApi from './News_Api/js/classNewsApi';

const newsGallery = document.querySelector('.js-newsApi');
const form = document.querySelector('.form');
const findNewsBtn = document.querySelector('.js-form-btn');
const loadMoreNewsBtn = document.querySelector('.js-load-more-news-btn');

findNewsBtn.textContent = 'Find news';

form.addEventListener('submit', handleFindNewsBtn);
loadMoreNewsBtn.addEventListener('click', handleLoadNewsBtn);

loadMoreNewsBtn.hidden = true;
const fetchHotNews = new NewsApi();

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
          <p class="news-publishedAt">Published at: ${publishedAt}</p>
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

  fetchHotNews
    .fetchNews()
    .then(news => {
      const { articles, totalResults } = news;

      if (totalResults > articles.length) {
        loadMoreNewsBtn.hidden = false;
      }

      newsGallery.insertAdjacentHTML('beforeend', markupNews(articles));
    })
    .catch(console.log);
}

function handleLoadNewsBtn() {
  fetchHotNews
    .fetchNews()
    .then(news => {
      const { articles, totalResults } = news;

      if (totalResults > articles.length) {
        loadMoreNewsBtn.hidden = false;
      }

      newsGallery.insertAdjacentHTML('beforeend', markupNews(articles));
    })
    .catch(console.log);
}