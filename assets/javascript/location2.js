//window.onload = console.log(localStorage.getItem("storageActivityName"));
 //window.onload = alert(localStorage.getItem("storageActivityName"));
 sharonTest = localStorage.getItem("storageActivityName")
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
var queryPlaces = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=best+" + sharonTest + "+united+states&key=" + placesAPI;

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
        console.log(queryWikiAgain);
        console.log(response);
        var title = response.displaytitle;
        var extract = response.extract;
        var imgURL = response.thumbnail.source;
        var contentURL = response.content_urls.mobile.page
        console.log("ContentURL: " + contentURL);
        console.log("ImgURL: " + imgURL);
        console.log("Place Title: " + title);
        console.log("Place Info: " + extract);

        var wikiResult = $("#wiki-snippet");
        //var image = $("<img>").attr("src", imgURL);
      //  var imagee = $("<ul class='d-flex-r nospace'><li class='hover1'>"  + image + "</li></ul>")
      //  var location = $("<a href="+contentURL+" target='_blank'><h1 class='title'>" + title + "</h1></a>")
       // var description = $("<h2 class='extract'>" + extract + "</h2>")
        
       
        wikiResult.append("<li class='hover1'><img src=" + imgURL + "><div class='overlay'><h2>" + title + "</h2></div><caption><h5 style=' padding: 20px;background-color:white'>" + extract + "<button  class='btn btn-success'>Select</button></h5></caption></li>")
                 // .prependTo('#wiki-snippet')         
                    //$("#sharonTests1").html(location[0])
                    //$("#sharonTests2").html(location[1])
                    //$("#sharonTests3").html(location[2])
                    //$("#sharonTests4").html(location[3])
                    //$("#sharonTests5").html(location[4]) 
// Tried to build it like JAson's but not working well :)
        // var rowOne = $("<ul>");
        // var hover = $("<li class='hover1'");
        // var rowOneImg = $("<img>").attr("src", imgURL);
        // var overlayDiv = $("<div class='overlay'>");
        // var locationName = $("<a href="+contentURL+" target='_blank'><h1 class='title'>" + title + "</h1></a>");

        // rowOne.append(hover).append(rowOneImg).append(overlayDiv).append(locationName);
        // $("#wiki-snippet").prepend(rowOne);
        // })
    });    
};
});

