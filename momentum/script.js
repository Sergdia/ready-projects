// DOM Elements
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

// Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

function showDate() {
  let today = new Date(),
    weekday = weekdayFn(today.getDay()),
    day = today.getUTCDate(),
    mounth = mounthFn(today.getUTCMonth());


  // Output Time
  date.innerHTML = `${weekday}<span> </span>${day}<span> </span>${mounth}`;

  setTimeout(showDate, 1000);
}



function weekdayFn(day) {
  let result;
  if (day === 1) {
    result = 'Monday'
  } else if (day === 2) {
    result = 'Tuesday'
  } else if  (day === 3) {
    result = 'Wednesday'
  } else if  (day === 4) {
    result = 'Thursday'
  } else if  (day === 5) {
    result = 'Friday'
  } else if  (day === 6) {
    result = 'Saturday'
  } else {
    result = 'Sunday'
  } return result
}

function mounthFn(mounth) {
  let result;
  if (mounth === 1) {
    result = 'February'
  } else if (mounth === 2) {
    result = 'Mart'
  } else if  (mounth === 3) {
    result = 'April'
  } else if  (mounth === 4) {
    result = 'May'
  } else if  (mounth === 5) {
    result = 'June'
  } else if  (mounth === 6) {
    result = 'July'
  } else if  (mounth === 7) {
    result = 'August'
  } else if  (mounth === 8) {
    result = 'September'
  } else if  (mounth === 9) {
    result = 'October'
  } else if  (mounth === 10) {
    result = 'November'
  } else if  (mounth === 11) {
    result = 'December'
  } else {
    result = 'January'
  } return result
}


// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//Quotes
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');
 
async function getQuote() {  
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quote.quoteText;
  figcaption.textContent = data.quote.quoteAuthor;
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

//Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=08ee844e43e19b7abe220ab083b1f69e&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
    
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}


// Run
getWeather()
showTime();
showDate();
setBgGreet();
getName();
getFocus();