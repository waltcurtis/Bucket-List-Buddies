
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAplMbqcM4ZA9nF2C7ZqT-ntyTNzfPujAA",
    authDomain: "bucket-list-buil-1556142938245.firebaseapp.com",
    databaseURL: "https://bucket-list-buil-1556142938245.firebaseio.com",
    projectId: "bucket-list-buil-1556142938245",
    storageBucket: "bucket-list-buil-1556142938245.appspot.com",
    messagingSenderId: "97852412014"
  };
  firebase.initializeApp(config);

// image calls

// var queryImages = 'https://api.unsplash.com/photos/random?client_id=c78b989bbdcaf598069d3cecfec38cb28d4af8f1c22b7b30291c849cc98680eb'

// $.ajax({
//     url: queryImages,
//     method: "GET"
//   })
//     // We store all of the retrieved data inside of an object called "response"
//     .then(function(response) {

//       // Log the queryURL
//       console.log(queryImages);

//       // Log the resulting object
//       console.log(response);

//       $('.api_image').html('<img src=' + response.urls.small + '> </img>')

//     });

// Category call

// var categoryAPI = "-Ht0l2D-YjnqGHJVlEn578WeGPI1tVaiQJ1lTLzt3U3fyvMoxlBAkCqA7h0zD0XtcJyT2SX73l2PAwZ4iTEF8iocuPVvEKJwJrxBeVfJi1GDf4a1u87W7fzkACPGXHYx"

// var queryCategory = "https://api.yelp.com/v3/categories/axethrowing";

// $.ajax({
//     url: queryCategory,
//     method: "GET",
//     headers: {
//         'Authorization': 'Bearer ' + categoryAPI
//       },
//   })
//     // We store all of the retrieved data inside of an object called "response"
//     .then(function(response) {
//         // Log the queryPlaces
//         console.log(queryCategory);

//         // Log the resulting object
//         console.log(response);
        
//     });



// Example on how to write out a javascript api call:
//   var request = new XMLHttpRequest()

//     request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
//     request.onload = function() {
//       // Begin accessing JSON data here
//       var data = JSON.parse(this.response)

//       if (request.status >= 200 && request.status < 400) {
//         data.forEach(movie => {
//           console.log(movie.title)
//         })
//       } else {
//         console.log('error')
//       }
// }

// request.send()


// Location call (based on activity/limit 10) need about location text
var placesAPI = "AIzaSyCcEpCXMOs77i41Ulp2ErUyFWVXFw5yjDs"
var activityArray = ["skating", "mountain climbing", "skiing", "snowboarding", "beaches", "paddleboarding", "natural springs", "kayaking", "camping", "hiking", "cherry blossom festivals", "picnics", "apple orchards", "oktoberfest", "fishing", "horseback riding", "gambling", "breweries", "distilleries", "wineries", "museums", "monuments", "national parks", "shopping"];

// var queryPlaces = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + activityArray[i] + "+united+states&type=point_of_interest&key=" + placesAPI;

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
      $(".wiki-snippet").text(JSON.stringify(search_result.snippet));
      $('<div class="wiki"></div>').append("<a href='https://en.wikipedia.org/wiki/" + search_result.title + "' target='_blank'><h1 class='title'>" + search_result.title + "</h1></a>")
									.append("<h2 class='snippet'>" + search_result.snippet + "</h2>")
									.prependTo('#wiki-snippet')
      })
};

