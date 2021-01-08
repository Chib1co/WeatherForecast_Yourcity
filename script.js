$( document ).ready(function() {
    console.log( "ready!" );

  generateCityList();

 function addingCities(){
    let citynames = $(".cityname");
    let cityList = JSON.parse(localStorage.getItem('city'))|| [];
 }//addingCities close

 function resetDashboard(){
   $(".city-info").text("");
   $(".weather-forecast").text("");
 }//resetDashboard close

 function createDiv(content){
  const div  = document.createElement('div');
  div.textContent = content;
  return div
 };//create Div close


 function generateCityList() {
   // grab local storage city entries
   let cities = JSON.parse(window.localStorage.getItem("cities")) || [];

   const ul = $('<ul>');

   // loop thru cities, and create a list item for each of them
   for (let index = 0; index < cities.length; index++) {
     const city = cities[index];

     const li = $('<li>');
     li.text(city);
     li.attr('class', 'cursor-pointer');
     ul.append(li);
   }

   ul.on('click', function(event){
     
     const city = event.target.textContent;
     searchWeather(city);

   })
   // put these li to the dom
   $('.city-list').text('');
   $('.city-list').append(ul);
 }//generateCityList close

 function searchWeather(cityName){
  let queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=6241153efb39f75fa72c3541aa78f172';
  let cityCurrent = $("<div>");

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
      console.log(response);

  //let nameOfCity = $("<div>");
  //nameOfCity.attr('class', 'nameOfCity');
  let placeName = response.city.name;
  //nameOfCity.text(placeName); 
  cityCurrent.append(placeName);
  //$(".city-info").append(nameOfCity);

  let date   = new Date();
    console.log(date)
  let dateOfCity = date.toLocaleDateString("en-AU");
  cityCurrent.append(" (" + dateOfCity + ")");

 let currentWeather = response.list[3].weather[0].description;
   console.log(currentWeather);
  cityCurrent.append(currentWeather);

  let cityTemp = response.list[3].main.temp -273.15;
   cityTempC = cityTemp.toFixed(2)
   console.log(cityTempC);
  cityCurrent.append(createDiv('Current Tempurature(C): ' + cityTempC));

  let cityWind = response.list[3].wind.speed;
   console.log(cityWind);
  cityCurrent.append(createDiv('Current Wind :' + cityWind + ' km/h'));

  let cityHumidity = response.list[3].main.humidity;
   console.log(cityHumidity);
  cityCurrent.append(createDiv('Current Humidity:' + cityHumidity + ' %'));

  //   UX index
  // let cityHumidity = response.list[3].main.humidity;
  // console.log(cityHumidity);
  // cityCurrent.append('Current Humidity' + cityHumidity + ' %');
  resetDashboard();
  $(".city-info").append(cityCurrent);
}); //ajax close

// 5 days forecatse
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
      console.log(response);
   

for (let i = 0; i < response.list.length; i++) {
if (response.list[i].dt_txt.indexOf("09:00:00") !== -1){
  let eachDayWeather = $("<div>");
  let eachDayDescription = $("<p>")

  let dayTwoWeather= response.list[i].dt_txt ;
  eachDayWeathere.text(dayTwoWeather);
  
  //eachDayWeather.append(dayTwoWeather);
  console.log(eachDayWeather);
  $("#5dayweather").append(eachDayWeather);
       
}
  
}




}); //ajax2 close
 }//serchWeather close


// .on("click") function associated with the Search Button
$(".search-city").on("click", function(event) {
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
    
    // let APIkey = '6241153efb39f75fa72c3541aa78f172';
    let cityName = $(".cityname").val()

    searchWeather(cityName);
    

    let chosenCity = JSON.parse(window.localStorage.getItem("cities")) || [];
    console.log(chosenCity)
    let cityInput = $(".cityname").val();
    chosenCity.unshift(cityInput);

    chosenCity = chosenCity.slice(0, 5);

    console.log(chosenCity)

    localStorage.setItem("cities", JSON.stringify(chosenCity));


    generateCityList()


  }); //onclick close



});//document ready close
