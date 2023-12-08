export default class ApiPixabay {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 12;
    this.image_type = 'photo';
  }

  fetchPhotos() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '34842285-9ef26a99ee49cc306160c27d8';

    const params = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: this.image_type,
      per_page: this.per_page,
      page: this.page,
    });

    return fetch(`${BASE_URL}?${params}`)
      .then(response => response.json())
      .then(({ hits, total }) => {
        this.incrementPage();
        return { hits, total };
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
