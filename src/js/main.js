'use strict'

const filePath = 'dist/data/tv.json';
const tv = readFromJson(filePath);
const currentDate = makeCurrentDate(new Date);
let timeout;


$(document).ready(() => {
  renderFilters();
  renderGrid(currentDate);
  
  $('.filters__days').on('click','.filters__days-item', switchDay);
  $('.filters__days-select').on('change','select', switchDaySelect);
  $('.filters__genres-select').on('change','select', switchGenresSelect);
  $('.filters__genres').on('click', '.filters__genres-item', setGenre);
  $('.grid__list').on('mouseenter','.channel-events__item', showDescription);
  $('.grid__list').on('mouseleave','.channel-events__item', hideDescription);
})