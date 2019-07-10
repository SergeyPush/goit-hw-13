import InfiniteScroll from 'infinite-scroll';
import dataService from './services';
import imageTemplate from '../templates/image-item.hbs';

// Define variables
const searchForm = document.getElementById('search-form');
const imagesList = document.getElementById('gallery');
const searchQueryButton = document.getElementById('search-query');
const elem = document.querySelector('.gallery');
const overlay = document.querySelector('.overlay');
const overlayImg = document.querySelector('.overlay img');
const closeModal = document.querySelector('[data-action="close-modal"]');
const infScroll = new InfiniteScroll(elem, {
  path: '{{#}}',
  status: '.page-load-status',
  scrollThreshold: 100,
});

// Event listeners
searchForm.addEventListener('submit', searchFormHandler);
imagesList.addEventListener('click', handleClick);
overlay.addEventListener('click', handleBackdrop);
searchQueryButton.addEventListener('click', loadMoreHandler);

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

  searchQueryButton.disabled = false;
}

function loadMoreHandler() {
  dataService.fetchImage().then(data => {
    const markup = buildImageTemplate(data.hits);
    imagesList.insertAdjacentHTML('beforeend', markup);
  });
}

infScroll.on('load', loadMoreHandler);

function buildImageTemplate(images) {
  return imageTemplate(images);
}

// Events handlers for images
function handleClick(event) {
  const target = event.target;
  if (target.tagName !== 'IMG') {
    return;
  }
  overlayImg.src = event.target.currentSrc;
  overlayImg.alt = event.target.alt;
  overlay.classList.add('is-visible');
  closeModal.addEventListener('click', handleCloseModal);
  window.addEventListener('keydown', handleKeyPress);
}

function handleCloseModal() {
  overlay.classList.remove('is-visible');
  overlayImg.src = '';
  overlayImg.alt = '';
  window.removeEventListener('keydown', handleKeyPress);
}

function handleBackdrop(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  handleCloseModal();
}

function handleKeyPress(event) {
  if (event.code !== 'Escape') {
    return;
  }
  handleCloseModal();
}
