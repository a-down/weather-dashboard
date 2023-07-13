// Global Variable
var apiKey = '13dbd31c9feddad4ad5732ff7f8f432f'
var searchButton = $('button')
var searchInput = $('input')
const searchEl = $('.search-section')
const searchHistoryEl = $('.search-history')
let cityName
const currentWeatherEl = $('.current-weather-section')
var lat;
var lon;

let searchHistory = [];


// When I search for a city
  // presented with current weather conditions
  // presented with 5-day future weather conditions
  // that city is added to the search history




  // event listener
    // button - make an event listener for all buttons in this div. Then no matte
    // trigger get city function
    // trigger save to search history function
      // create button
    // trigger get API function
    // trigger getCityWeather function
    // trigger display current weather
    // triger display future weather






// display search history on load
function displaySearchHistory() {
  searchHistory = JSON.parse(localStorage.getItem('Weather Search History:'));
  console.log(searchHistory);
  if (searchHistory === null) {
    searchHistory = [];
  } else {
    for (i = 0; i < searchHistory.length; i++) {
      var newButton = $(
        `<button type="submit" class="d-block btn btn-outline-secondary m-2">${searchHistory[i]}</button>`
      )
      searchHistoryEl.append(newButton);
    }
}}
displaySearchHistory();




// search button event trigger 
searchButton.on('click', function(event) {
  event.preventDefault();
  cityName = searchInput.val();
  console.log(cityName);
  searchInput.val('');
  saveSearchHistory(cityName);
  updateCurrentWeather(cityName);
})



// save search to search history
function saveSearchHistory(city) {
  searchHistory.push(cityName);
  var searchHistoryJSON = JSON.stringify(searchHistory);
  localStorage.setItem('Weather Search History:', searchHistoryJSON);
  var newButton = $(
    `<button type="submit" class="d-block btn btn-outline-secondary m-2">${cityName}</button>`
  )
  searchHistoryEl.append(newButton);
}



// search history button event trigger
searchHistoryEl.on('click', 'button', function(event) {
  event.preventDefault();
  var cityNameHistory = $(this).text();
  console.log(cityNameHistory)
  updateCurrentWeather(cityNameHistory);
})


// 
function updateCurrentWeather(city) {
  currentWeatherEl.children().eq(0).text(city);
  cityName = city;
  console.log(cityName)
  getCityLocation();
}


// get lat and lon for cityName
function getCityLocation() {
  var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
  console.log(geocodeUrl);


  //  gary's quick fetch
  function quickFetch(url){
    return fetch(url)
    .then( function(resp) {
      return resp.json()
    })
    .then(function(data){
      return data
    })
  }
  
  // run quick fetch and get the lat and lon of city
  quickFetch(geocodeUrl).then( function(data){
    console.log(data)
    lat = data[0].lat;
    lon = data[0].lon;
    console.log(lon)
    getCityCurrentWeather();
  } )
}

function getCityCurrentWeather() {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`


  //  gary's quick fetch
  function quickFetch(url){
    return fetch(url)
    .then( function(resp) {
      return resp.json()
    })
    .then(function(data){
      return data
    })
  }
  
  // run quick fetch and get the lat and lon of city
  quickFetch(currentWeatherUrl).then( function(data){
    console.log(data);
    const tempDisplay = $('.temp-display');
    const windDisplay = $('.wind-display');
    const humidityDisplay = $('.humidity-display');
    tempDisplay.text(`Temp: ${data.main.temp}°F`)
    windDisplay.text(`Wind: ${data.wind.speed} MPH`)
    humidityDisplay.text(`Humidity: ${data.main.humidity}%`)
  } )
}

// get API data for cityName






// display current weather for cityName



// loop to display future weather