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

    const url = `${BASE_URL}?${params.toString()}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits, total, totalHits }) => {
        this.incrementPage();
        return { hits, total, totalHits };
      })
      .catch(console.log);
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
