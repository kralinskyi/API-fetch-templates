export default class ApiPixabey {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 12;
    this.image_type = 'photo';
  }

  // const params = new URLSearchParams({})

  fetchPhotos() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '34842285-9ef26a99ee49cc306160c27d8';

    return fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=${this.image_type}&per_page=${this.per_page}&page=${this.page}`
    )
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage(); // якщо успішно - збільшуємо сторінку
        return hits;
      });
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
