//window.onload = console.log(localStorage.getItem("storageActivityName"));
 //window.onload = alert(localStorage.getItem("storageActivityName"));
 currentActivity = localStorage.getItem("storageActivityName")
$(document).ready(function(){
    
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

// Location call
var placesAPI = "AIzaSyCcEpCXMOs77i41Ulp2ErUyFWVXFw5yjDs"
// construct url to pass to the ajax call
var queryPlaces = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=best+" + currentActivity + "+united+states&key=" + placesAPI;

$.ajax({
    url: queryPlaces,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      // var resultsLength = response.results.length
      // have to manually limit results (can't do it in the url for google places api)
      console.log(response);
      for(var i in response.results.slice(0,5)){
        // Log the resulting object
        place = response.results[i]
        console.log("Place: " + place.name);
        getWikiInfo(place.name); 
        
    };
});

function getWikiInfo(name){ 
    // Wiki call using location
    var queryWiki = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + name + "&utf8=&format=json"
    
    $.ajax({
        url: queryWiki,
        method: "GET",
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
        // Log the resulting object
            console.log(response);
            search_result = response.query.search[0]
            console.log("Place Title: " + search_result.title);
            moreWikiInfo(search_result.title)
            
    });
};  

function moreWikiInfo(extract){
    var queryWikiAgain = "https://en.wikipedia.org/api/rest_v1/page/summary/" + extract;
    $.ajax({
    url: queryWikiAgain,
    method: "GET",
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
        // Log the resulting object
        var title = response.displaytitle;
        var extract = response.extract;
        var imgURL = response.thumbnail.source;
        var contentURL = response.content_urls.mobile.page
        console.log("ContentURL: " + contentURL);
        console.log("ImgURL: " + imgURL);
        console.log("Place Title: " + title);
        console.log("Place Info: " + extract);
        
        var wikiResult = $("<div class='wiki card m-2' style='width: 20rem;'>");

        var image = $("<img class='card-img-top'>").attr("src", imgURL);

        var location = $("<a target='_blank'><h5 class='wiki-title card-title text-center'>" + title + "</h5></a>").attr('href', contentURL);

        var description = $("<p class='card-text wiki-extract'>" + extract + "</p>");

        var locationButton = $('<button>').addClass('test-button btn btn-success text center').attr('data-name', title).text('Select');

        wikiResult.append(image)

                    .append(location)

                    .append(description)

                    .append(locationButton)

                    .prependTo('#wiki-results')
                        
                        
        $('.test-button').on("click", function(){
            var currentLocation = $(this).attr("data-name")
            console.log(currentLocation);     
            localStorage.setItem("storeLocation", currentLocation);     
            })
            
        });

    };  


});