/**
 * Обработчик перелючения дней недели на desktop. Отображает новое расписание для каждого дня.
 *
 */
function switchDay() {
  const date = new Date($(this).data("date"));
  $(this).parent().children().removeClass('filters__days-item_active');
  $(this).addClass('filters__days-item_active');
  
  renderGrid(date);
  
  $('.filters__genres').children().each((i,elem) => {
    const genre = $(elem).data("genre");
    if ($(elem).hasClass('filters__genres-'+genre+'_active')) $('[data-category="'+genre+'"] > .channel-events__time').toggleClass('channel-events__item-'+genre);
  });
}


/**
 * Обработчик перелючения дней недели на mobile. Отображает новое расписание для каждого дня.
 *
 */
function switchDaySelect() {
  const date = new Date($(this).val());
  renderGrid(date);
}


/**
 * Выделяет передачи, которые соответствуют выбраному фильтру. Desktop
 *
 */
function setGenre() {
  const genre = $(this).data("genre");
  
  $('[data-category="'+genre+'"] > .channel-events__time').toggleClass('channel-events__item-'+genre)
  $(this).toggleClass('filters__genres-'+genre+'_active');
}


/**
 * Показывает передачи, которые соответствуют выбраному фильтру. Mobile
 *
 */
function switchGenresSelect() {
  const genre = $(this).val();
  
  $('.channel').show()
  if (!genre) $('.channel-events__item').show();
  else {
    $('.channel').each((i,elem) => {
      if (!$(elem).has('[data-category="'+genre+'"]').length) $(elem).hide();
      $(elem).find('.channel-events__item').each((i,item) => {
        if ($(item).data("category") === genre) $(item).show();
        else $(item).hide();
      })
    });
  }
}


/**
 * Показывает popup окно с подробностями передачи через 0.8 секунд после наведения на элемент передачи
 *
 */
function showDescription() {
  const id = $(this).data("programmeid");
  const title = tv.programme[id].title.text.slice(0, tv.programme[id].title.text.length-6);
  const desc = (tv.programme[id].desc) ? tv.programme[id].desc.text : 'К сожалению, для данной передачи описание отсутствует.';
  
  const description = `
  <div class="desc-window">
    <div class="programme-image">
      <img src="${'dist/images/img.png'}"></img>
    </div>
    <div class="programme-title">${title}</div>
    <div class="programme-desc">${desc}</div>
  </div>
`;
  
  timeout = setTimeout(() => {
    $(this).append(description);
  }, 800);
}


/**
 * Прячет popup окно и сбрасывает таймер.
 *
 */
function hideDescription() {
  clearTimeout(timeout);
  $(this).find('.desc-window').remove();
}


