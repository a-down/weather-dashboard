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


// function I wrote (and saved for later) to get the regular date from a unix timestamp (in seconds)
function getRegularDate(unix) {
  let newDate = new Date(unix * 1000);
  let day = newDate.getDate();
  let month = newDate.getMonth();
  let year = newDate.getFullYear();
  var fullNewDate = `${month + 1}/${day}/${year}`
  return fullNewDate
  }


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


// run quick fetch and get the lat and lon of city
function getCityLocation() {
  var geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
  console.log(geocodeUrl);

  quickFetch(geocodeUrl).then( function(data){
    console.log(data)
    lat = data[0].lat;
    lon = data[0].lon;
    console.log(lon)
    getCityCurrentWeather();
  } )
}


// run quick fetch and display current weather
function getCityCurrentWeather() {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  
  quickFetch(currentWeatherUrl).then( function(data){
    console.log(data);
    const tempDisplay = $('.temp-display');
    const windDisplay = $('.wind-display');
    const humidityDisplay = $('.humidity-display');
    tempDisplay.text(`Temp: ${data.main.temp}°F`)
    windDisplay.text(`Wind: ${data.wind.speed} MPH`)
    humidityDisplay.text(`Humidity: ${data.main.humidity}%`)
    getCityFutureWeather();
  } )
}


// function to get future weather
function getCityFutureWeather() {
  var futureWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  console.log(futureWeatherUrl);
  

  quickFetch(futureWeatherUrl).then( function(data){
    console.log(data);
    const newForecastArr = [] 
    for( let i=0; i<40; i=i+8 ){
      newForecastArr.push( data.list[i])
    }
    console.log(newForecastArr)
    
    displayFutureWeather(newForecastArr);
  } )
}


// display future weather
function displayFutureWeather(weatherArr) {
  const futureWeatherDisplay = $('.future-weather-display');
  futureWeatherDisplay.text('');

  // for loop to display future weather cards
  for (i=0; i < 5; i++) {
    var fullDate = getRegularDate(weatherArr[i].dt);
    console.log(fullDate);

    var newCard = $(`
      <div class="card col-12 col-lg-2 m-2">
        <div class="card-header">
          ${fullDate}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${`<img src="https://openweathermap.org/img/wn/${weatherArr[i].weather[0].icon}@2x.png"/>`}</li>
          <li class="list-group-item">Temp: ${weatherArr[i].main.temp}°F</li>
          <li class="list-group-item">Wind: ${weatherArr[i].wind.speed} MPH</li>
          <li class="list-group-item">Humidity: ${weatherArr[i].main.humidity}%</li>
        </ul>
      </div>
    `)
    futureWeatherDisplay.append(newCard);
  }
}




