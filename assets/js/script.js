// Global Variable
var searchButton = $('button')
var searchInput = $('input')
const searchEl = $('.search-section')
let cityName

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
  searchHistory = JSON.parse(localStorage.getItem('Search History:'));
  console.log(searchHistory);
  if (searchHistory === null) {
    searchHistory = [];
  } else {
    for (i = 0; i < searchHistory.length; i++) {
      var newButton = $(
        `<button type="submit" class="d-block btn btn-outline-secondary m-2">${searchHistory[i]}</button>`
      )
      searchEl.append(newButton);
    }
}}
displaySearchHistory();




// search button event trigger 
searchButton.on('click', function(event) {
  event.preventDefault();
  cityName = searchInput.val();
  console.log(cityName);
  saveSearchHistory(cityName);
})

// search history button event trigger
searchEl.on('click', 'button', function(event) {
  event.preventDefault();
  cityName = $(this).text();
  console.log(cityName)
})




// save search to
function saveSearchHistory(city) {
  searchHistory.push(cityName);
  var searchHistoryJSON = JSON.stringify(searchHistory);
  localStorage.setItem('Search History:', searchHistoryJSON);
  var newButton = $(
    `<button type="submit" class="d-block btn btn-outline-secondary m-2">${cityName}</button>`
  )
  searchEl.append(newButton);
}
