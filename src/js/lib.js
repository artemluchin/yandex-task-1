/**
 * Читает Json, парсит его и возвращает объект
 * 
 * @param {string}
 * @return {object}
 */
function readFromJson(filePath) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', filePath, false);
  xhr.send();

  if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
    return false;
  }
  else {
    return JSON.parse(xhr.responseText);
  }
}


/**
 * Устанавливает вместо текущей даты 13 апреля 2016 года.
 * Когда будут смотреть задние не известно, а данные о программах есть только
 * на период с 11 по 17 апреля. Поэтому решил сделать такое решение проблемы.
 * 
 * @param {string}
 * @returns {date}
 */
function makeCurrentDate(date) {
  date.setFullYear(2016);
  date.setMonth(3);
  date.setDate(13);
  
  return date;
}


/**
 * Парсит дату из строки с нестандартным форматом даты -> e.g "20160413092000 +0300"
 *
 * @param {string}
 * @returns {date}
 */
function getDate(string) {
  const stringDate = string.replace(/(^\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\W([\+||\-]\d{2})(\d{2})/,'$1-$2-$3T$4:$5:$6.000$7:$8');
  const ms = Date.parse(stringDate);
  
//   return new Date(ms);
  const date = new Date(ms);
  return date;

}


/**
 * Предоставляет сокращенное русское название дня недели в зависимости от даты
 *
 * @param {date}
 * @returns {string}
 */
function getWeekDay(date) {
  var days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

  return days[date.getDay()];
}


/**
 * Возвращает время из строки даты -> 03:50
 *
 * @param {date}
 * @returns {string}
 */
function modifyDate(date) {
  return date.toTimeString().slice(0,5);
}


/**
 * Возвращает наименование телеканала
 * 
 * @param {number} 
 * @returns {string}
 */
function getChannelName(channelId) {
  return tv.channel.filter(elem => (elem.id === channelId))[0]['display-name'].text;
}


/**
 * Возвращает путь к логотипу телеканала
 * 
 * @param {number}
 * @returns {string}
 */
function getChannelLogoPath(channelId) {
  return tv.channel.filter(elem => (elem.id === channelId))[0].icon.src;
}


/**
 * Возвращает дату первого дня недели, основываясь на текущей дате.
 * 
 * @param {date}
 * @returns {date}
 */
function getFirstDateOfWeek(date) {
  let firstDate = new Date;
  
  if (date.getDay() !== 0) firstDate.setDate(date.getDate() - date.getDay() + 1);
  else firstDate.setDate(date.getDate() - 6);
  
  return firstDate;
}

/**
 * Возвращает дату последнего дня недели, основываясь на текущей дате.
 * 
 * @param {date}
 * @returns {date}
 */
function getLastDateOfWeek(date) {
  let lastDate = new Date;
  
  if (date.getDay() !== 0) lastDate.setDate(date.getDate() + 7 - date.getDay());
  else lastDate = date;
  
  return lastDate;
}

/**
 * Проверяет является ли дата дня недели текущей датой.
 * 
 * @param {date}
 * @param {date}
 * @returns {boolean}
 */
function isToday(weekDate, currentDate) {
  return (weekDate.getDay() === currentDate.getDay());
}