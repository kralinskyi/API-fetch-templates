export default class ApiPixabay {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 12;
    this.image_type = 'photo';
    this.baseUrl = 'https://pixabay.com/api/';
    this.apiUrl = '';
  }

  async fetchPhotos() {
    try {
      const API_KEY = '34842285-9ef26a99ee49cc306160c27d8';

      const params = new URLSearchParams({
        key: API_KEY,
        q: this.searchQuery,
        image_type: this.image_type,
        per_page: this.per_page,
        page: this.page,
      });

      const url = `${this.baseUrl}?${params}`;
      this.apiUrl = url;

      const response = await fetch(url);

      const responseData = await response.json();

      const { hits, total } = responseData;
      this.incrementPage();
      return { hits, total };
    } catch (error) {
      console.error(
        'Error fetching photos:',
        error,
        'Request URL:',
        this.apiUrl
      );
      throw error;
    }
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
