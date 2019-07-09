const InfiniteScroll = require('infinite-scroll');
import dataService from './services';
import imageTemplate from '../templates/image-item.hbs';

const searchForm = document.getElementById('search-form');
const imagesList = document.getElementById('gallery');
const searchQueryButton = document.getElementById('search-query');
const elem = document.querySelector('.gallery');

searchForm.addEventListener('submit', searchFormHandler);

searchQueryButton.addEventListener('click', loadMoreHandler);

const infScroll = new InfiniteScroll(elem, {
  path: '{{#}}',
});

function searchFormHandler(event) {
  event.preventDefault();
  imagesList.innerHTML = '';
  let inputValue = event.target.query.value;
  dataService.searchQuery = inputValue;
  inputValue = '';

  dataService.fetchImage().then(data => {
    const markup = buildImageTemplate(data.hits);
    imagesList.insertAdjacentHTML('beforeend', markup);
    searchForm.elements.query.value = '';
  });
}

function loadMoreHandler() {
  dataService.fetchImage().then(data => {
    const markup = buildImageTemplate(data.hits);
    imagesList.insertAdjacentHTML('beforeend', markup);
  });
}

infScroll.on('scrollThreshold', loadMoreHandler);

function buildImageTemplate(images) {
  return imageTemplate(images);
}
