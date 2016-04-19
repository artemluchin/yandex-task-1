/**
 * Отображает все каналы на текущую дату
 * 
 * @param {date}
 *
 */
function renderGrid(date) {
  $('.grid__list').empty();
  tv.channel.forEach(elem => {
    $('.grid__list').append(renderChannel(elem.id, date));
  });
}


/**
 * Шаблон для создания элемента телеканала.
 * 
 * @param {number} id канала
 * @param {date} текущая дата
 * @returns {string}
 *
 */
function renderChannel(channelId, date) {
  const channelName = getChannelName(channelId);
  const logoPath = getChannelLogoPath(channelId);
  return `
  <div class="channel">
    <div class="channel__title">
      <div class="channel__logo">
        <img src="${logoPath}"></img>
      </div>
      <div class="channel__name">${channelName}</div>
    </div>
    <div class="channel-events">${renderEvents(channelId, date)}</div>
  </div>
  `;
}


/**
 * Шаблон для создания списка передач телеканала на текущую дату
 * 
 * @param {number} id канала
 * @param {date} текущая дата
 * @returns {string}
 *
 */
function renderEvents(channelId, date) {
  let events = '';
  
  tv.programme.forEach((elem, index) => {
    if (elem.channel === channelId) {
      const eventStartDate = getDate(elem.start);
      const eventEndDate = getDate(elem.stop);
      const eventExpiredClass = (eventStartDate < currentDate) ? 'channel-events__item-expired' : '';
      const eventOnAirClass = (eventStartDate < currentDate && currentDate < eventEndDate) ? 'channel-events__item-on-air' : '';
      const eventName = elem.title.text.slice(0, elem.title.text.length-6);
      const eventCategory = (elem.category) ? elem.category.text : '';
      
      if (eventStartDate.getDate() === date.getDate()) {
        events += `
          <div data-programmeId="${index}" class="channel-events__item ${eventExpiredClass} ${eventOnAirClass}" data-category="${eventCategory}">
            <div class="channel-events__time">${modifyDate(eventStartDate)}</div>
            <div class="channel-events__name">${eventName}</div>
          </div>
        `;
      }
    }
  });
  return events;
}


/**
 * Отображает фильтры по дням недели. Один для desktop, второй для mobile
 *
 */
function renderFilters() {
  $('.filters__days').append(renderDays());
  $('.filters__days-select select').append(renderSelectDays());
}

/**
 * Шаблон для создания элемента дня недели для desktop фильтра.
 * 
 * @returns {string}
 *
 */
function renderDays() {
  let days = '';
  let weekDay = getFirstDateOfWeek(currentDate);
  const weekEnd = getLastDateOfWeek(currentDate);

  while (weekDay <= weekEnd) {
    const dayExpiredClass = (weekDay.getDay() < currentDate.getDay() && weekDay.getDay() !== 0) ? 'filters__days-item-expired' : '';
    const weekendClass = (weekDay.getDay() == 0 || weekDay.getDay() == 6) ? 'filters__days-item-weekend' : '';
    const activeClass = (isToday(weekDay,currentDate)) ? 'filters__days-item_active' : '';
    
    days += `
      <div data-date="${weekDay.toISOString()}" class="filters__days-item ${dayExpiredClass} ${weekendClass} ${activeClass}">
        ${(isToday(weekDay, currentDate)) ? 'Сегодня' : weekDay.getDate() + ", " + getWeekDay(weekDay)}
      </div>
    `;
    
    weekDay = new Date(weekDay.setDate(weekDay.getDate() + 1));
  }
  return days;
}


/**
 * Шаблон для создания элемента дня недели для mobile фильтра.
 * 
 * @returns {string}
 *
 */
function renderSelectDays() {
  let days = '';
  
  let weekDay = getFirstDateOfWeek(currentDate);
  const weekEnd = getLastDateOfWeek(currentDate);
  
  while (weekDay <= weekEnd) {
    days += `
      <option value="${weekDay.toISOString()}"${(isToday(weekDay, currentDate)) ? ' selected' : ''}>${(isToday(weekDay, currentDate)) ? 'Сегодня' : weekDay.getDate() + ", " + getWeekDay(weekDay)}</option>
    `;
    
    weekDay = new Date(weekDay.setDate(weekDay.getDate() + 1));
  }
  return days;
}