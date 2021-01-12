$( document ).ready(function() {
    console.log( "ready!" );

  generateCityList();
  document.querySelector('.city-info').style.display = "none";



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
  document.querySelector('.city-info').style.display = "block";
  let queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=6241153efb39f75fa72c3541aa78f172';
  let cityCurrent = $("<div>");

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
      console.log(response);

 console.log(response.dt_txt)
  let placeName = $("<h3>");
  placeName.attr("text-align", "center")
  placeName.text(response.name);
  cityCurrent.append(placeName);

  let date   = new Date();
    console.log(date)
  let dateOfCity = date.toLocaleDateString("en-AU");
  cityCurrent.append( dateOfCity);
  // dateOfCity.attr("class", "dateOfcity");

//  let currentWeather = response.weather[0].description;
//    console.log(currentWeather);
//   cityCurrent.append(currentWeather);

  let weatherIcon =  $("<img>");
  let iconcode = response.weather[0].icon;
  console.log(iconcode)
  let iconurl =  "http://openweathermap.org/img/w/" + iconcode + ".png";
  weatherIcon.attr("src", iconurl);
  weatherIcon.attr("alt", "weather-icon");
  cityCurrent.append(weatherIcon)
  

  let cityTemp = response.main.temp -273.15;
   cityTempC = cityTemp.toFixed(2)
   console.log(cityTempC);
  cityCurrent.append(createDiv('Current Tempurature(C): ' + cityTempC  + "\xB0C"));

  let cityWind = response.wind.speed;
   console.log(cityWind);
  cityCurrent.append(createDiv('Current Wind Speed: ' + cityWind + ' km/h'));

  let cityHumidity = response.main.humidity;
   console.log(cityHumidity);
  cityCurrent.append(createDiv('Current Humidity: ' + cityHumidity + ' %'));

  //   UX index

  resetDashboard();
  $(".city-info").append(cityCurrent);
}); //ajax close

let fiveDaysURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=6241153efb39f75fa72c3541aa78f172';
// 5 days forecatse
  $.ajax({
    url: fiveDaysURL,
    method: "GET"
  }).then(function(response){
      console.log(response);
  
$("#fivedaysweather").text("");

let fiveDays = $("<div>");
fiveDays.attr("class", "titleFiveDays")
fiveDays.text("5 Days Forecast");
$(".weather-forecast").append(fiveDays);

const daily = response.list.filter(function(weather, index){
  return index % 8 === 7
})


for (let i = 0; i < daily.length; i++) {
  const weatherItem = daily[i];
  let fiveDaysWeather = $("<div>");
  fiveDaysWeather.attr("class", "fiveDaysWeather card");
  // fiveDaysWeather.attr("class", "card");
  fiveDaysWeather.attr("style", "width:6rem");
  

let eachDayDate = $("<h5>");
eachDayDate.attr("class", "eachdate")
const datetime = luxon.DateTime.fromSeconds(weatherItem.dt);

 let numebrOfDayToAdd = 0;
 eachDayDate.text(datetime.toFormat('dd LLL yyyy'));
  fiveDaysWeather.append(eachDayDate)


  // console.log(response.list[i].weather[0].description)
  // let eachDayDescription = $("<p>")
  // eachDayDescription.text(response.list[i].weather[0].description);
  // fiveDaysWeather.append(eachDayDescription);


  let weatherIconEach =  $("<img>");
  weatherIconEach.attr("width", "50px")
  weatherIconEach.attr("class", 'mx-auto')
  let iconcodeFiveDays = weatherItem.weather[0].icon;
  console.log(weatherItem)
  let iconurlFive =  "http://openweathermap.org/img/w/" + iconcodeFiveDays+ ".png";
  weatherIconEach.attr("src", iconurlFive);
  weatherIconEach.attr("alt", "weather-icon");
  fiveDaysWeather.append(weatherIconEach);


  let eachDayTemp = $("<p>")
  let eachDayTempC = weatherItem.main.temp -273.15
  eachDayTemp.text("Temp: " + eachDayTempC.toFixed(2) + "\xB0C");
  fiveDaysWeather.append(eachDayTemp);

  let eachDayHumidity = $("<p>")
  eachDayHumidity.text("Humidity: " +weatherItem.main.humidity + "%");
  fiveDaysWeather.append( eachDayHumidity);

 

  // let eachDayWeather = $(`<div>
  // <h1> The weather is ${eachDayDescription}. </h1>
  // <p> The temperature is ${eachDayTemp}. </p>
  // <p> The date is ${eachDayDate}</p>
  // <p> The humidity is ${eachDayHumidity}</p>
  // </div>`);
  
  $("#fivedaysweather").append(fiveDaysWeather);
       
}
  





}); //ajax2 close
 }//serchWeather close


// .on("click") function associated with the Search Button
$(".search-city").on("click", function(event) {
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
    
    
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



});//document ready 
