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
    const now = new Date(); // Поточна дата і час
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const formattedYesterday = yesterday.toISOString().slice(0, 10);
    const formattedToday = now.toISOString().slice(0, 10);

    const params = new URLSearchParams({
      from: formattedYesterday,
      to: formattedToday,
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

        this.page += 1;
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

  resetPage() {
    this.page = 1;
  }
}
