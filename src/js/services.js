const baseUrl = 'https://pixabay.com/api/';
const KEY = '12937632-34918ac446e6c937e0643541b';

//pixabay.com/api/?key=12937632-34918ac446e6c937e0643541b&q=yellow+flowers&image_type=photo&pretty=true
export default {
  page: 1,
  query: '',
  set searchQuery(query) {
    this.query = query;
  },
  get searchQuery() {
    return this.query;
  },
  fetchImage() {
    const requestString = `?key=${KEY}&q=${this.query}&page=${
      this.page
    }&image_type=photo&per_page=12`;
    return fetch(baseUrl + requestString).then(response => {
      this.incrementPage();
      return response.json();
    });
  },
  incrementPage() {
    this.page += 1;
  },
};
