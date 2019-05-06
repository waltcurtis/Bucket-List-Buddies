// -------------Log in JS--------------------------//

// file: script.js
$(document).ready(function(){
    $('#wiki').hide();
    //initialize the firebase app
    var config = {
        apiKey: "AIzaSyAplMbqcM4ZA9nF2C7ZqT-ntyTNzfPujAA",
        authDomain: "bucket-list-buil-1556142938245.firebaseapp.com",
        databaseURL: "https://bucket-list-buil-1556142938245.firebaseio.com",
        projectId: "bucket-list-buil-1556142938245",
        storageBucket: "bucket-list-buil-1556142938245.appspot.com",
        messagingSenderId: "97852412014"
      };
      firebase.initializeApp(config);
    //create firebase references
    var Auth = firebase.auth(); 
    var dbRef = firebase.database();
    var contactsRef = dbRef.ref('contacts')
    var usersRef = dbRef.ref('users')
    var auth = null;
    //Register 
    $('#registerForm').on('submit', function (e) {
      e.preventDefault();
      $('#registerModal').modal('hide');
      $('#messageModalLabel').html(spanText('<i class="fa fa-cog fa-spin"></i>', ['center', 'info']));
      $('#messageModal').modal('show');
      var data = {
        email: $('#registerEmail').val(), //get the email from Form
        firstName: $('#registerFirstName').val(), // get firstName
        lastName: $('#registerLastName').val(), // get lastName
      };
      var passwords = {
        password : $('#registerPassword').val(), //get the pass from Form
        cPassword : $('#registerConfirmPassword').val(), //get the confirmPass from Form
      }
      if( data.email != '' && passwords.password != ''  && passwords.cPassword != '' ){
        if( passwords.password == passwords.cPassword ){
          //create the user
          
          firebase.auth()
            .createUserWithEmailAndPassword(data.email, passwords.password)
            .then(function(user) {
              return user.updateProfile({
                displayName: data.firstName + ' ' + data.lastName
              })
            })
            .then(function(user){
              //now user is needed to be logged in to save data
              auth = user;
              //now saving the profile data
              usersRef.child(user.uid).set(data)
                .then(function(){
                  console.log("User Information Saved:", user.uid);
                })
              $('#messageModalLabel').html(spanText('Success!', ['center', 'success']))
              
              $('#messageModal').modal('hide');
            })
            .catch(function(error){
              console.log("Error creating user:", error);
              $('#messageModalLabel').html(spanText('ERROR: '+error.code, ['danger']))
            });
        } else {
          //password and confirm password didn't match
          $('#messageModalLabel').html(spanText("ERROR: Passwords didn't match", ['danger']))
        }
      }  
    });
    //Login
    $('#loginForm').on('submit', function (e) {
      e.preventDefault();
      $('#loginModal').modal('hide');
      $('#messageModalLabel').html(spanText('<i class="fa fa-cog fa-spin"></i>', ['center', 'info']));
      $('#messageModal').modal('show');
      if( $('#loginEmail').val() != '' && $('#loginPassword').val() != '' ){
        //login the user
        var data = {
          email: $('#loginEmail').val(),
          password: $('#loginPassword').val()
        };
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
          .then(function(authData) {
            auth = authData;
            $('#messageModalLabel').html(spanText('Success!', ['center', 'success']))
            $('#messageModal').modal('hide');
          })
          .catch(function(error) {
            console.log("Login Failed!", error);
            $('#messageModalLabel').html(spanText('ERROR: '+error.code, ['danger']))
          });
      }
    });
    $('#logout').on('click', function(e) {
      e.preventDefault();
      firebase.auth().signOut()
    });
    //save contact
    $('#contactForm').on('submit', function( event ) {  
      event.preventDefault();
      if( auth != null ){
        if( $('#name').val() != '' || $('#email').val() != '' ){
          contactsRef.child(auth.uid)
            .push({
              name: $('#name').val(),
              email: $('#email').val(),
              location: {
                city: $('#city').val(),
                state: $('#state').val(),
                zip: $('#zip').val()
              }
            })
            document.contactForm.reset();
        } else {
          alert('Please fill at-lease name or email!');
        }
      } else {
        //inform user to login
      }
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        auth = user;
        $('body').removeClass('auth-false').addClass('auth-true');
        usersRef.child(user.uid).once('value').then(function (data) {
          var info = data.val();
          if(user.photoUrl) {
            $('.user-info img').show();
            $('.user-info img').attr('src', user.photoUrl);
            $('.user-info .user-name').hide();
          } else if(user.displayName) {
            $('.user-info img').hide();
            $('.user-info').append('<span class="user-name">'+user.displayName+'</span>');
          } else if(info.firstName) {
            $('.user-info img').hide();
            $('.user-info').append('<span class="user-name">'+info.firstName+'</span>');
          }
        });
        contactsRef.child(user.uid).on('child_added', onChildAdd);
      } else {
        // No user is signed in.
        $('body').removeClass('auth-true').addClass('auth-false');
        auth && contactsRef.child(auth.uid).off('child_added', onChildAdd);
        $('#contacts').html('');
        auth = null;
      }
    });
  
  function onChildAdd (snap) {
    $('#contacts').append(contactHtmlFromObject(snap.key, snap.val()));
  }
   
  //prepare contact object's HTML
  function contactHtmlFromObject(key, contact){
    return '<div class="card contact" style="width: 18rem;" id="'+key+'">'
      + '<div class="card-body">'
        + '<h5 class="card-title">'+contact.name+'</h5>'
        + '<h6 class="card-subtitle mb-2 text-muted">'+contact.email+'</h6>'
        + '<p class="card-text" title="' + contact.location.zip+'">'
          + contact.location.city + ', '
          + contact.location.state
        + '</p>'
      + '</div>'
    + '</div>';
  }
  function spanText(textStr, textClasses) {
    var classNames = textClasses.map(c => 'text-'+c).join(' ');
    return '<span class="'+classNames+'">'+ textStr + '</span>';
  }

// ----------------Landing js---------------------------//

var landingImages = ['assets/images/spring.jpg', 'assets/images/summer.jpg','assets/images/fall.jpg', 'assets/images/winter.png','assets/images/sightseeing.PNG','assets/images/adult.PNG']
var landingButtons=['Spring Activities','Summer Activities','Fall Activities','Winter Activities','Sightseeing Activities','Adult Activities']
var count = 0;

displayImage();

    for(let i = 0; i < landingImages.length ;i++){
        $("#landing_images")
        var imageTag = $("<div> <img src=" + landingImages[i] + " width='100%' height='200px' > </div>")
        imageTag.attr({
            data: i,
            class: "col-sm-3 landing__scroll-box" 
        })
      
    $("#landing_images").append(imageTag ) 
    
    }
    
    for(let i = 0; i < landingButtons.length ;i++){
        $("#landing_buttons")
        var buttonTag = $("<div> <button width='100%' class = 'btn btn-info'>" + landingButtons[i] + "</button> </div>")
        buttonTag.attr({
            data: i,
            class: "col-sm-3 landing__scroll-box",
        })
    $("#landing_buttons").append(buttonTag ) 
    console.log(buttonTag  )
    }
    
var imageInterval = setInterval(nextImage,5000) 

function nextImage(){
    count++
    
    setTimeout(displayImage, 1000);
    
    if (count === landingImages.length) {
    
        count = 0;
    
    }
}
function displayImage() {
    $("#slideshow").html("<img src=" + landingImages[count] + " width='100%' height='100%'>");
    }
    $(".landing__scroll-box").on("click", function () {
    $("#activities-button-first-row").on("click",function(){
        var getActivities = $(this).attr("data-entry")
        var url = "index.html#destinations";
        localStorage.setItem("storageActivityName", getActivities);
        $('#placeholder').hide();
        $('#wiki').show();
        window.location.href = url
        })
        $("#activities-button-second-row").on("click",function(){
        var getActivities = $(this).attr("data-entry")
        var url = "index.html#destinations";
        localStorage.setItem("storageActivityName", getActivities);
        $('#placeholder').hide();
        $('#wiki').show();
        window.location.href = url
        })
        $("#activities-button-third-row").on("click",function(){
        var getActivities = $(this).attr("data-entry")
        var url = "index.html#destinations";
        localStorage.setItem("storageActivityName", getActivities);
        $('#placeholder').hide();
        $('#wiki').show();
        window.location.href = url
        })
        $("#activities-button-fourth-row").on("click",function(){
        var getActivities = $(this).attr("data-entry")
        var url = "index.html#destinations";
        localStorage.setItem("storageActivityName", getActivities);
        $('#placeholder').hide();
        $('#wiki').show();
        window.location.href = url
        })
    $("#activities-table").addClass("table table-striped table-condensed")
    dataIndex = parseInt($(this).attr("data"));
    clearInterval(imageInterval)
        if (dataIndex === 0) {
            imageInterval = setInterval(nextImage,5000) 
            var spring =

                {
                    picture: ['assets/images/spring/camping.PNG','assets/images/spring/cherry_blossom.PNG', 'assets/images/spring/hiking.PNG','assets/images/spring/picnic.PNG'], 
        
                    button: ["Camping","Cherry Blossom", "Hiking","Picnic Festival"],
        
                    }
                    
                $("#activity-selected").html("<h3>" + "Spring Activities" + "<h3>")   
                //   displayImage            
                $("#activities-images-first-row").html("<img class= 'img-responsive'src=" + spring.picture[0] + " width='250px' height='250px'>") 
                $("#activities-images-second-row").html("<img class= 'img-responsive' src=" + spring.picture[1] + " width='250px' height='250px'>")
                $("#activities-images-third-row").html("<img class= 'img-responsive' src=" + spring.picture[2] + " width='250px' height='250px'>")
                $("#activities-images-fourth-row").html("<img class= 'img-responsive' src=" + spring.picture[3] + " width='250px' height='250px'>")
                  //  Dynamically created buttons                     
                $("#activities-button-first-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + spring.button[0] + "</button>").attr('data-entry', 'camping') 
                $("#activities-button-second-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + spring.button[1] + "</button>").attr('data-entry', 'cherry-blossom') 
                $("#activities-button-third-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + spring.button[2] + "</button>").attr('data-entry', 'hiking') 
                $("#activities-button-fourth-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + spring.button[3] + "</button>").attr('data-entry', 'picnic') 
                            
                function displayImage() {
                        $("#slideshow").html("<img class= 'img-responsive' src=" + spring.picture[count] + " width='100%' height='100%'>");
                        }

                        function nextImage(){
                            count++
                        
                            setTimeout(displayImage, 1000);
                        
                            if (count === spring.picture.length) {
                        
                            count = 0;
                        
                            }
                        }
                    
        }
        else if (dataIndex === 1) {
            imageInterval = setInterval(nextImage,5000) 
            var summer =
                
                {
                    picture: ['assets/images/summer/beach.PNG', 'assets/images/summer/kayaking.PNG','assets/images/summer/natural_springs.PNG','assets/images/summer/paddleboard.PNG'], 
        
                    button: ["Beaches", "Kayaking", "Natural Springs","Paddleboarding"],
        
                    }
                
                $("#activity-selected").html("<h3>" + "Summer Activities" + "<h3>")  
                //displayImage
                $("#activities-images-first-row").html("<img class= 'img-responsive'src=" + summer.picture[0] + " width='250px' height='250px'>") 
                $("#activities-images-second-row").html("<img class= 'img-responsive' src=" + summer.picture[1] + " width='250px' height='250px'>")
                $("#activities-images-third-row").html("<img class= 'img-responsive' src=" + summer.picture[2] + " width='250px' height='250px'>")
                $("#activities-images-fourth-row").html("<img class= 'img-responsive' src=" + summer.picture[3] + " width='250px' height='250px'>")
                //  Dynamically created buttons
                $("#activities-button-first-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + summer.button[0] + "</button>").attr('data-entry', 'beaches') 
                $("#activities-button-second-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + summer.button[1] + "</button>").attr('data-entry', 'kayaking') 
                $("#activities-button-third-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + summer.button[2] + "</button>").attr('data-entry', 'natural-springs') 
                $("#activities-button-fourth-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + summer.button[3] + "</button>").attr('data-entry', 'paddleboarding') 
                function displayImage() {
                    $("#slideshow").html("<img class='img-responsive' src=" + summer.picture[count] + " width='100%' height='100%'>");
                    }

                    function nextImage(){
                        count++
                    
                        setTimeout(displayImage, 1000);
                    
                        if (count === summer.picture.length) {
                    
                        count = 0;
                    
                        }
                    }
                    
        }  
        else if (dataIndex === 2) {
            imageInterval = setInterval(nextImage,5000) 
            var fall =

                {
                    picture: ['assets/images/fall/apple_orchard.PNG', 'assets/images/fall/fishing.PNG','assets/images/fall/horseback.PNG','assets/images/fall/Oktoberfest.PNG'], 
        
                    button: ["Apple Orchard", "Fishing", "Horseback Riding","Oktoberfest"],
        
                    }

            $("#activity-selected").html("<h3>" + "Fall Activities" + "<h3>")     
                    //   displayImage
                    $("#activities-images-first-row").html("<img class= 'img-responsive' src=" + fall.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img class= 'img-responsive' src=" + fall.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img class= 'img-responsive' src=" + fall.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img class= 'img-responsive' src=" + fall.picture[3] + " width='250px' height='250px'>")
                     //  Dynamically created buttons
                    $("#activities-button-first-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + fall.button[0] + "</button>").attr(
                    'data-entry', 'apple-orchard') 
                    $("#activities-button-second-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + fall.button[1] + "</button>").attr(
                    'data-entry', 'fishing') 
                    $("#activities-button-third-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + fall.button[2] + "</button>").attr(
                        'data-entry', 'horseback-riding') 
                    $("#activities-button-fourth-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + fall.button[3] + "</button>").attr(
                            'data-entry', 'oktoberfest') 

                function displayImage() {
                    $("#slideshow").html("<img class= 'img-responsive' src=" + fall.picture[count] + " width='100%' height='100%'>");
                    }

                    function nextImage(){
                        count++
                    
                        setTimeout(displayImage, 1000);
                    
                        if (count === fall.picture.length) {
                    
                        count = 0;
                    
                        }
                    }
        }  
        else if (dataIndex === 3) {
            imageInterval = setInterval(nextImage,5000) 
            var winter =

                {
                    picture: ['assets/images/winter/ice_skating.PNG', 'assets/images/winter/mountain_climbing.PNG','assets/images/winter/skiing.PNG','assets/images/winter/snowboarding.PNG'], 
        
                    button: ["Ice Skating", "Mt Climbing", "Skiing","Snowboarding"],
        
                    }

                    $("#activity-selected").html("<h3>" + "Winter Activities" + "<h3>")  
                    //   displayImage
                    $("#activities-images-first-row").html("<img class= 'img-responsive' src=" + winter.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img class= 'img-responsive' src=" + winter.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img class= 'img-responsive' src=" + winter.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img class= 'img-responsive' src=" + winter.picture[3] + " width='250px' height='250px'>")
                    //  Dynamically created buttons
                    $("#activities-button-first-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + winter.button[0] + "</button>").attr('data-entry', 'ice-skating') 
                    $("#activities-button-second-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + winter.button[1] + "</button>").attr('data-entry', 'mountain-climbing') 
                    $("#activities-button-third-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + winter.button[2] + "</button>").attr('data-entry', 'skiing') 
                    $("#activities-button-fourth-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + winter.button[3] + "</button>").attr('data-entry', 'snowboarding') 

                function displayImage() {
                    $("#slideshow").html("<img class= 'img-responsive' src=" + winter.picture[count] + " width='100%' height='100%'>");
                    }

                    function nextImage(){
                        count++
                    
                        setTimeout(displayImage, 1000);
                    
                        if (count === winter.picture.length) {
                    
                        count = 0;
                    
                        }
                    }
        }  
        else if (dataIndex === 4) {
            imageInterval = setInterval(nextImage,5000) 
            var sightseeing = 

                {
                    picture: ['assets/images/sightseeing/monuments.PNG', 'assets/images/sightseeing/museums.PNG','assets/images/sightseeing/national_parks.PNG','assets/images/sightseeing/shopping.PNG'], 
        
                    button: ["Monuments", "Museums", "National Parks", "Shopping Centers"],
        
                    }

                    $("#activity-selected").html("<h3>" + "Sightseeing Activities" + "<h3>")  
                    //   displayImage
                    $("#activities-images-first-row").html("<img class= 'img-responsive' src=" + sightseeing.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img class= 'img-responsive' src=" + sightseeing.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img class= 'img-responsive' src=" + sightseeing.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img class= 'img-responsive' src=" + sightseeing.picture[3] + " width='250px' height='250px'>")
                    //  Dynamically created buttons
                    $("#activities-button-first-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + sightseeing.button[0] + "</button>").attr('data-entry', 'monuments') 
                    $("#activities-button-second-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + sightseeing.button[1] + "</button>").attr('data-entry', 'museums') 
                    $("#activities-button-third-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + sightseeing.button[2] + "</button>").attr('data-entry', 'national-parks') 
                    $("#activities-button-fourth-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + sightseeing.button[3] + "</button>").attr('data-entry', 'shopping-centers') 
                function displayImage() {
                    $("#slideshow").html("<img class= 'img-responsive' src=" + sightseeing.picture[count] + " width='100%' height='100%'>");
                    }

                    function nextImage(){
                        count++
                    
                        setTimeout(displayImage, 1000);
                    
                        if (count === sightseeing.picture.length) {
                    
                        count = 0;
                    
                        }
                    }
        }  
        else {
            imageInterval = setInterval(nextImage,5000) 
            var adult =

                {
                    picture: ['assets/images/adult/breweries.PNG', 'assets/images/adult/distilleries.PNG','assets/images/adult/gambling.PNG','assets/images/adult/winery.PNG'], 
        
                    button: ["Breweries", "Distilleries","Gambling","Wineries"],
        
                    }

                    $("#activity-selected").html("<h3>" + "Adult Activities" + "<h3>")  
                    //   displayImage
                    $("#activities-images-first-row").html("<img class= 'img-responsive' src=" + adult.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img class= 'img-responsive' src=" + adult.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img class= 'img-responsive' src=" + adult.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img class= 'img-responsive' src=" + adult.picture[3] + " width='250px' height='250px'>")
                    //  Dynamically created buttons
                    $("#activities-button-first-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + adult.button[0] + "</button>").attr(
                    'data-entry', 'breweries') 
                    $("#activities-button-second-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + adult.button[1] + "</button>").attr('data-entry', 'distilleries') 
                    $("#activities-button-third-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + adult.button[2] + "</button>").attr('data-entry', 'gambling') 
                    $("#activities-button-fourth-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + adult.button[3] + "</button>").attr('data-entry', 'wineries') 
                function displayImage() {
                    $("#slideshow").html("<img class= 'img-responsive' src=" + adult.picture[count] + " width='100%' height='100%'>");
                    }

                    function nextImage(){
                        count++
                    
                        setTimeout(displayImage, 1000);
                    
                        if (count === adult.picture.length) {
                    
                        count = 0;
                    
                        }
                    }
        }  
        displayImage()   
    })

// ----------------------Locations js------------------------//

 var currentActivity = localStorage.getItem("storageActivityName")

// Location call
var placesAPI = "AIzaSyCcEpCXMOs77i41Ulp2ErUyFWVXFw5yjDs"
// construct url to pass to the ajax call
var queryPlaces = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=best+" + currentActivity + "+united+states&key=" + placesAPI;

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
        getWikiInfo(place.name);
    };
});

function getWikiInfo(name){ 
    // Wiki call using location
    var queryWiki = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + name + "&utf8=&format=json"
    
    $.ajax({
        url: queryWiki,
        method: "GET",
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
        // Log the resulting object
            search_result = response.query.search[0]
            moreWikiInfo(search_result.title)
            
    });
};  

function moreWikiInfo(extract){
  var queryWikiAgain = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/api/rest_v1/page/summary/" + extract;
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
      
      // Populate results onto html
      var wikiResult = $("<div class='wiki card m-2' style='width: 20rem;'>");

      var image = $("<img class='card-img-top'>").attr("src", imgURL);

      var location = $("<a target='_blank'><h5 class='wiki-title card-title text-center'>" + title + "</h5></a>").attr('href', contentURL);

      var description = $("<p class='card-text wiki-extract'>" + extract + "</p>");

      var locationButton = $('<button>').addClass('location-button btn btn-success text center').attr('data-name', title).text('Select');

      wikiResult.append(image)
                  .append(location)
                  .append(description)
                  .append(locationButton)
                  .prependTo('#wiki-results')
                                         
      $('.location-button').on("click", function(){
          var currentLocation = $(this).attr("data-name")   
          console.log(currentLocation); 
          var url = "index.html#events";
          localStorage.setItem("storeLocation", currentLocation);
          window.location.href = url
              
          })
          
      });

  }; 
  
// --------------------Events js--------------------------//
var currentLocation = localStorage.getItem("storeLocation")
// currentLocation = localStorage.getItem("storageEventName")
// console.log(currentLocation)

// currentLocation2 = localStorage.getItem("storageEventName2")
// console.log(currentLocation2)

var db = firebase.database();
var eventDB = db.ref("/event");

//    var currentBuddy = null;
var currentEvent = null;
var currentKey = null;

var buddysEventList = [];
var buddysKeyList = [];

var activitiesArr = [];
var activitiesCntArr = [];
var locationsArr = [];
var locationsCntArr = [];
var stDateArr = [];
var stDateCntArr = [];
var enDateArr = [];
var enDateCntArr = [];

var favActivity = "";
var favActivityCnt = 0;
var favLocation = "";
var favLocationCnt = 0;
var favStDate = "";
var favStDateCnt = 0;
var favEnDate = "";
var favEnDateCnt = 0;

var screenFilled = false;

// remember to comment these out once the real ones are available
// var currentActivity = "Ballet";
// var currentLocation = "NYC, NY";
var currentBuddy = "SeanUgar";

// ====================================

class EventObj {
constructor(eventName) {
  this.eventName        = eventName;
  this.eventBuddies     = [],  // array of eventBuddy objects
  this.sharedEmails     = [],  // array of email addresses
  this.notes            = []   // array of note objects
}
addEventBuddy(buddyName) { 
  this.eventBuddies.push( new EventBuddyObj(buddyName) ); 
}
getEventBuddyIdx(buddyName) { 
  var idx = -1;
  this.eventBuddies.forEach(function(buddy, i) {
    if (buddy.buddyName == buddyName) idx = i; 
  })
  return idx;
}
}

class EventBuddyObj {
constructor(buddyName) {
  this.buddyName = buddyName;
  this.selections = {
    activity : "",
    location : "",
    startDate: "",
    endDate  : "" 
  }
}
}

class NoteObj {
constructor(buddyName, noteText) {
  this.dateTime = moment().format();
  this.buddyName = buddyName;
  this.noteText = noteText;
}
}

// ====================================


console.log("***** Events Page Load *****");

if (typeof currentActivity === "undefined") {
    console.log("currentActivity undefined");
} else {
    console.log("currActivity: " + currentActivity);
    if (currentActivity != null  &&  currentActivity.trim().length != "") {
        //   set selActivity to currActivity
        $("#selActivity").text(currentActivity);
    }
}

if (typeof currentLocation === "undefined") {
    console.log("currentLocation undefined");
} else {
    console.log("currLocation: " + currentLocation);
    if (currentLocation != null  &&  currentLocation.trim().length != ""){
        //  set selDestination to currLocation
            $("#selDestination").text(currentLocation);
        }
    }

if (typeof auth === "undefined") {
    console.log("auth undefined");
} else {
    console.log("auth:");
    // console.log(auth);
    if (auth != null) {
        // set currBuddy to username
        currentBuddy = auth.displayName;
        if (currentBuddy.trim() != "")
            $("#buddyName").text(currentBuddy);
    }
}   


// =======================================

function eventToScreen(event){

    event.eventBuddies.forEach (function(buddy, idx) {
        if (buddy.buddyName == currentBuddy) {
            $("#currentBuddy").text(buddy.buddyName);
            $("#selActivity").text(buddy.selections.activity);
            $("#selDestination").text(buddy.selections.location);
    
            $("#start-date-input").val(moment(buddy.selections.startDate).format("YYYY-MM-DD"));
            $("#end-date-input").val(moment(buddy.selections.endDate).format("YYYY-MM-DD"));

        } else {
            $("#buddy" + idx).remove();

            var article = $("<article>")
                            .attr("id", "buddy" + idx)
                            .addClass("buddySelection bg-white m-2");
            var h2 = $("<h2>")
                            .addClass("buddyName h2")
                            .text(buddy.buddyName);
            var rowdiv = $("<div>")
                            .addClass("row m-0");
            var actdiv = $("<div>")
                            .addClass("col-6 border border-solid border-dark")
                            .text("Selected Activity:  " + buddy.selections.activity);
            var locdiv = $("<div>")
                            .addClass("col-6 border border-solid border-dark")
                            .text("Selected Destination:  " + buddy.selections.location);
            var rowdiv2 = $("<div>")
                            .addClass("row m-0");
            var sdtdiv = $("<div>")
                            .addClass("col-6 border border-solid border-dark")
                            .text("Start Date:  " + buddy.selections.startDate);
            var edtdiv = $("<div>")
                            .addClass("col-6 border border-solid border-dark")
                            .text("End Date:  " + buddy.selections.endDate);
            var btn = $("<button>")
                            .attr("id", "copySel")
                            .attr("data-index", idx)
                            .addClass("btn btn-secondary btn-block")
                            .text("Copy As My Selection");

            rowdiv.append(actdiv, locdiv);
            rowdiv2.append(sdtdiv, edtdiv);
            article.append(h2, rowdiv, rowdiv2, btn);
            $("#buddyArea").append(article);
        }
    }) 

    $("#buddyList").empty();
    event.sharedEmails.forEach(function (email, idx) {
        $("#buddyList").append(
                $("<div>").addClass("row m-0").append(
                    $("<span>").addClass("col m-0").text(email)
                )
        );
    })

    $("#noteFeed").empty();
    event.notes.forEach(function(note, idx) {
        var dt = Date(note.dateTime);

        $("#noteFeed")
            .append(
                $("<span>")
                    .addClass("pl-2 m-0 text-dark col-3")
                    .text(moment(note.dateTime).format("MMM DD H:mm")),
                $("<span>")
                    .addClass("pl-2 m-0 text-info col-3")
                    .text(note.buddyName),
                $("<span>")
                    .addClass("pl-2 m-0 text-primary col-6")
                    .text(note.noteText)
            )
    })

    $("#grpTopAct").text(favActivity);
    $("#grpActCnt").text(favActivityCnt);
    $("#grpTopDest").text(favLocation);
    $("#grpDestCnt").text(favLocationCnt);
    $("#currEventName").text(currentEvent.eventName);

    buddysEventList.forEach(function(eventName) {
        var opt = $("<option>").attr("value", eventName);
        if (eventName == currentEvent.eventName) {
            opt.attr("selected", "selected");
        }
        $("#eventNameList").append(opt);
    })
}

function initCounts() {
    activitiesArr.length = 0;
    activitiesArr = [];
    locationsArr.length = 0;
    locationsArr = [];
    activitiesCntArr.length = 0;
    activitiesCntArr = [];
    locationsCntArr.length = 0;
    locationsCntArr = [];

    stDateArr.length = 0;
    stDateArr = [];
    enDateArr.length = 0;
    enDateArr = [];
    stDateCntArr.length = 0;
    stDateCntArr = [];
    enDateCntArr.length = 0;
    enDateCntArr = [];
}

function updateCounts(act, loc, stDate, enDate) {
    var idx = activitiesArr.indexOf(act);
    if (idx == -1) {
        activitiesArr.push(act);
        activitiesCntArr.push(1);
    } else {
        activitiesCntArr[idx]++;
    }

    var idx = locationsArr.indexOf(loc);
    if (idx == -1) {
        locationsArr.push(loc);
        locationsCntArr.push(1);
    } else {
        locationsCntArr[idx]++;
    }

    var idx = stDateArr.indexOf(stDate);
    if (idx == -1) {
        stDateArr.push(stDate);
        stDateCntArr.push(1);
    } else {
        stDateCntArr[idx]++;
    }

    var idx = enDateArr.indexOf(enDate);
    if (idx == -1) {
        enDateArr.push(enDate);
        enDateCntArr.push(1);
    } else {
        enDateCntArr[idx]++;
    }
}

function getFavorites() {
    var hiCnt = 0;
    var hiIdx = -1;
    activitiesCntArr.forEach(function(cnt, idx) {
        if (cnt > hiCnt) {
            hiCnt = cnt;
            hiIdx = idx;
        }
    })
    favActivity = activitiesArr[hiIdx];
    favActivityCnt = activitiesCntArr[hiIdx];

    hiCnt = 0;
    hiIdx = -1;
    locationsCntArr.forEach(function(cnt, idx) {
        if (cnt > hiCnt) {
            hiCnt = cnt;
            hiIdx = idx;
        }
    })
    favLocation = locationsArr[hiIdx];
    favLocationCnt = locationsCntArr[hiIdx];

    var hiCnt = 0;
    var hiIdx = -1;
    stDateCntArr.forEach(function(cnt, idx) {
        if (cnt > hiCnt) {
            hiCnt = cnt;
            hiIdx = idx;
        }
    })
    favStDate = stDateArr[hiIdx];
    favStDateCnt = stDateCntArr[hiIdx];

    hiCnt = 0;
    hiIdx = -1;
    enDateCntArr.forEach(function(cnt, idx) {
        if (cnt > hiCnt) {
            hiCnt = cnt;
            hiIdx = idx;
        }
    })
    favEnDate = enDateArr[hiIdx];
    favEnDateCnt = enDateCntArr[hiIdx];
}

function modEvent() {
    if (currentKey != null) {
        eventDB.child(currentKey).transaction(function(p) {
            if (p) {
                p.eventName = currentEvent.eventName;
                p.eventBuddies = currentEvent.eventBuddies;
                p.notes = currentEvent.notes;
                p.sharedEmails = currentEvent.sharedEmails;
            }
            return p;
        })
    }
}
// =====

$("#noteSend").on("click", function() {
    if (currentEvent != null &&  currentBuddy != null) {
        event.preventDefault();

        var noteMsg = $("#noteText").val().trim();

        if (noteMsg != "") {
            var msg = new NoteObj(currentBuddy, noteMsg);
            currentEvent.notes.push(msg);

            modEvent();
        } else {
            console.log ("empty note");
        }
    } else {
        console.log ("missing current event or buddy");
    }
    $("#noteText").val("");

})


$("#invite").click(function(){

    if (currentEvent != null ) {
        var inviteEmail = $("#invAddr").val().trim();
        if (inviteEmail != "") {
            var reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            if (reg.test(inviteEmail)) {
                console.log ("validated email");
                currentEvent.sharedEmails.push(inviteEmail);

                modEvent();
                // call to email api
            } else {
                console.log ("in-validated email");
            }
        } else {
            console.log ("empty email");
        }
    } else {
        console.log ("missing current event");
    }
    $("#invAddr").val("");
})

$("#modDates").click(function() {
    if (currentEvent != null &&  currentBuddy != null) {
        var stDate = moment($("#start-date-input").val()).format("MM/DD/YYYY");
        var enDate = moment($("#end-date-input").val()).format("MM/DD/YYYY");

        var evnt = new EventObj(currentEvent.eventName);
        evnt.eventBuddies = currentEvent.eventBuddies;

        var idx = evnt.getEventBuddyIdx(currentBuddy);
        currentEvent.eventBuddies[idx].selections.startDate = stDate;
        currentEvent.eventBuddies[idx].selections.endDate = enDate;

        modEvent();

    } else {
        console.log ("missing current event or event buddy");
    }
})

$("#topPicks").click(function() {
    if (currentEvent != null &&  currentBuddy != null) {

        var evnt = new EventObj(currentEvent.eventName);
        evnt.eventBuddies = currentEvent.eventBuddies;

        var idx = evnt.getEventBuddyIdx(currentBuddy);
        currentEvent.eventBuddies[idx].selections.activity = favActivity;
        currentEvent.eventBuddies[idx].selections.location = favLocation;
        currentEvent.eventBuddies[idx].selections.startDate = favStDate;
        currentEvent.eventBuddies[idx].selections.endDate = favEnDate;

        modEvent();

    } else {
        console.log ("missing current event or event buddy");
    }
})

$(document).on("click", "#copySel", function() {
    if (currentEvent != null  &&  currentBuddy != null) {

        var index = $(this).data("index");

        var evnt = new EventObj(currentEvent.eventName);
        evnt.eventBuddies = currentEvent.eventBuddies;

        var idx = evnt.getEventBuddyIdx(currentBuddy);
        currentEvent.eventBuddies[idx].selections.activity = currentEvent.eventBuddies[index].selections.activity;
        currentEvent.eventBuddies[idx].selections.location = currentEvent.eventBuddies[index].selections.location;
        currentEvent.eventBuddies[idx].selections.startDate = currentEvent.eventBuddies[index].selections.startDate;
        currentEvent.eventBuddies[idx].selections.endDate = currentEvent.eventBuddies[index].selections.endDate;

        modEvent();

    } else {
        console.log ("missing current event or event buddy");
    }
})

$("#newName").on("change", function(){
    console.log("changed");
    console.log($(this).val());

    var eventName = $(this).val().trim();
    if (eventName != "") {
        // if its a new event name, save to that name
        // else if existing event grab other event and display

        var pos = buddysEventList.indexOf(eventName);
        if (pos == -1) {
            var newEvent = new EventObj(eventName);
            newEvent.addEventBuddy(currentBuddy);
            var idx = newEvent.getEventBuddyIdx(currentBuddy);
            newEvent.eventBuddies[idx].selections.activity = currentActivity;
            newEvent.eventBuddies[idx].selections.location = currentLocation;
            currentEvent.eventBuddies[idx].selections.startDate = favStDate;
            currentEvent.eventBuddies[idx].selections.endDate = favEnDate;
            eventDB.push(newEvent);

        } else {
            eventDB
                .orderByKey(buddysKeyList[pos])
                .equalTo(buddysKeyList[pos])
                .once("value", function(sn){
                    currentEvent = sn.val();
                    eventToScreen(currentEvent);
                })
        }

        $("#currEventName").text(currentEvent.eventName);
        console.log(currentEvent);
    }
})

// =====

eventDB.on("child_changed", function(sn) {
    if (sn) {
        if (sn.key == currentKey) {
            currentEvent = sn.val();

            screenFilled = false;

            buddysEventList.length = 0;
            buddysEventList = [];

            initCounts();

            currentEvent.eventBuddies.forEach(function(buddy, idx) {
                var sels = buddy.selections;
                updateCounts(sels.activity, sels.location, sels.startDate, sels.endDate);
    
                if (buddy.buddyName == currentBuddy) {
                    buddysEventList.push(currentEvent.eventName);
                }
            })

            if (currentEvent != null  &&  !screenFilled) {
                getFavorites();
                eventToScreen(currentEvent);
                screenFilled = true;
            }
        }
    }
})

eventDB.on("child_added", function(sn) {
    if (sn) {
        var key = sn.key;
        var event = sn.val();

        if (currentBuddy == null  ||  currentBuddy.trim() == "") return;

        buddysEventList.length = 0;
        buddysEventList = [];
        buddysKeyList.length = 0;
        buddysKeyList = [];

        initCounts();

        event.eventBuddies.forEach(function(buddy, idx) {
            var sels = buddy.selections;
            updateCounts(sels.activity, sels.location, sels.startDate, sels.endDate);

            if (buddy.buddyName == currentBuddy) {
                buddysEventList.push(event.eventName);
                buddysKeyList.push(key);

                currentEvent = event;
                currentKey = key;
            }
        })

        if (currentEvent != null  &&  !screenFilled) {
            getFavorites();
            eventToScreen(currentEvent);
            screenFilled = true;
        }
    }
})

$('#calendar').datepicker({
    inline: true,
    firstDay:0,
    showOtherMonths: false,
    dayNamesMin: ['S','M','T','W','Th','F','S']
})

});
