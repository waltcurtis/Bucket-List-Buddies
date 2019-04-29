
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

var queryImages = 'https://api.unsplash.com/photos/random?client_id=c78b989bbdcaf598069d3cecfec38cb28d4af8f1c22b7b30291c849cc98680eb'

$.ajax({
    url: queryImages,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

      // Log the queryURL
      //console.log(queryImages);

      // Log the resulting object
      //console.log(response);

      $('.api_image').html('<img src=' + response.urls.small + '> </img>')

    });


// Location call (based on activity/limit 10) need about location text
var placesAPI = "AIzaSyCcEpCXMOs77i41Ulp2ErUyFWVXFw5yjDs"

var queryPlaces = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=snowboarding+united+states&type=point_of_interest&key=" + placesAPI;

$.ajax({
    url: queryPlaces,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
        // Log the queryPlaces
        //console.log(queryPlaces);

        // Log the resulting object
        //console.log(response);
        
    });

// Category call
var categoryAPI = "-Ht0l2D-YjnqGHJVlEn578WeGPI1tVaiQJ1lTLzt3U3fyvMoxlBAkCqA7h0zD0XtcJyT2SX73l2PAwZ4iTEF8iocuPVvEKJwJrxBeVfJi1GDf4a1u87W7fzkACPGXHYx"

var queryCategory = "https://api.yelp.com/v3/categories/search?term=snowboarding&locale=en_US";

$.ajax({
    url: queryCategory,
    method: "GET",
    headers: {
        'Authorization': 'Bearer ' + categoryAPI
      },
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
        // Log the queryPlaces
        console.log(queryCategory);

        // Log the resulting object
        console.log(response);
        
    });
