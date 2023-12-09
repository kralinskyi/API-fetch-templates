// NewsApi key 51dbc0fa52b2439d86cda18bc3a4c116

export default class NewsApi {
  constructor() {
    this.query = '';
    this.page = 1;
    this.BASE_URL = 'https://newsapi.org/v2/everything';
    this.apiKey = '51dbc0fa52b2439d86cda18bc3a4c116';
    this.country = 'ua';
    this.category = 'general';
    this.pageSize = 24;
  }

  fetchNews() {
    const params = new URLSearchParams({
      from: Date.now(),
      to: Date.now(),
      sortBy: 'popularity',
      pageSize: this.pageSize,
      q: this.query,
      page: this.page,
    });

    const url = `${this.BASE_URL}?${params.toString()}`;

    const headers = {
      'X-Api-Key': this.apiKey,
    };

    return fetch(url, { headers })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error!');
        }
        return response.json();
      })
      .catch(error => console.error('Error fetching news:', error));
  }

  get searchQuery() {
    return this.query;
  }

  set searchQuery(newQuery) {
    this.query = newQuery;
  }
}
