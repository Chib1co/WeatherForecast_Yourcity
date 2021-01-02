$( document ).ready(function() {
    console.log( "ready!" );



 function addingCities(){
    let citynames = $(".cityname");
    let cityList = JSON.parse(localStorage.getItem('city'))|| [];
   


 }

// .on("click") function associated with the Search Button
$(".search-city").on("click", function(event) {
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
    
    // let APIkey = '6241153efb39f75fa72c3541aa78f172';
    let cityname = $(".cityname").val()
    let queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityname + '&appid=6241153efb39f75fa72c3541aa78f172';
    let cityCurrent = $("<div>");
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
        console.log(response);

    let cityTemp = response.list[0].main.temp -273.15;
    cityTempC = cityTemp.toFixed(2)
    console.log(cityTempC);
    cityCurrent.append('Current Tempurature(C): ' + cityTempC);

    let cityWind = response.list[0].wind.speed;
    console.log(cityWind);
    cityCurrent.append('Current Wind :' + cityWind + ' km/h');

    let cityHumidity = response.list[0].main.humidity;
    console.log(cityHumidity);
    cityCurrent.append('Current Humidity:' + cityHumidity + ' %');

    //   UX index
    // let cityHumidity = response.list[0].main.humidity;
    // console.log(cityHumidity);
    // cityCurrent.append('Current Humidity' + cityHumidity + ' %');

    $(".city-info").append(cityCurrent);

    });
  });

  

});
