
window.onload = console.log(localStorage.getItem("storageActivityName"));
window.onload = alert(localStorage.getItem("storageActivityName"));

//var location = $("#test")
//var divClone
$(document).ready(function(){
    // Location call (based on activity/limit 10) need about location text
var placesAPI = "AIzaSyCcEpCXMOs77i41Ulp2ErUyFWVXFw5yjDs"

// user chooses activity on click to get places that have the activity
// $("#pick-activity").on("click", function(event){
//   // prevents the button from trying to submit a form when clicked
//   event.preventDefault();

  // get text from button
  // var activity = $("#activity-name").val();

  // construct url to pass to the ajax call
  var queryPlaces = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=ice+skating+united+states&type=point_of_interest&key=" + placesAPI;

$.ajax({
    url: queryPlaces,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      // var resultsLength = response.results.length
      // have to manually limit results (can't do it in the url for google places api)
      
      for(var i in response.results.slice(0,5)){
        // Log the resulting object
        place = response.results[i]
        console.log("Place: " + place.name);
        GetWikiInfo(place.name)
    };
     

  });
// });

function GetWikiInfo(name){ 
// Wiki call using location
var queryWiki = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + name + "&utf8=&format=json"
$.ajax({
  url: queryWiki,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {
      // Log the resulting object
      search_result = response.query.search[0]
      console.log("Place Title: " + search_result.title);
      console.log("Place Info: " + search_result.snippet);
      $('<div class="wiki"></div>').append("<a href='https://en.wikipedia.org/wiki/" + search_result.title + "' target='_blank'><h1 class='title'>" + search_result.title + "</h1></a>")
									.append("<h2 class='snippet'>" + search_result.snippet + "</h2>")
									.prependTo('#wiki-snippet')
      })
};



for(var i = 0; i < 6; i++){
 //  divClone = location.cloneNode(true)
  // document.body.appendChild(divClone)
 //   $("#location-sections").append("#try")
 $("#location-sections").append("<main class='container'><section class='main-section'><img src='assets/javascript/images/sightseeing/monuments.PNG' class='auth-image'><p id='locationDescription'></p><p id='locationWeather'>test</p><p id='locationSimilarities' >test</p></section></main>")
}
})