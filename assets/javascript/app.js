// -------------Log in JS--------------------------//

// file: script.js
$(document).ready(function(){
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

var landingImages = ['assets/javascript/images/spring.jpg', 'assets/javascript/images/summer.jpg','assets/javascript/images/fall.jpg', 'assets/javascript/images/winter.png','assets/javascript/images/sightseeing.PNG','assets/javascript/images/adult.PNG']
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
        console.log($(this).attr("data-entry"))
        var url = "location.html?location="+getActivities+"";
        localStorage.setItem("storageActivityName", getActivities);
        console.log(url)
        window.location.href = url
        })
        $("#activities-button-second-row").on("click",function(){
        var getActivities = $(this).attr("data-entry")
        console.log($(this).attr("data-entry"))
        var url = "location.html?location="+getActivities+"";
        localStorage.setItem("storageActivityName", getActivities);
        console.log(url)
        window.location.href = url
        })
        $("#activities-button-third-row").on("click",function(){
        var getActivities = $(this).attr("data-entry")
        console.log($(this).attr("data-entry"))
        var url = "location.html?location="+getActivities+"";
        localStorage.setItem("storageActivityName", getActivities);
        console.log(url)
        window.location.href = url
        })
        $("#activities-button-fourth-row").on("click",function(){
        var getActivities = $(this).attr("data-entry")
        console.log($(this).attr("data-entry"))
        var url = "location.html?location="+getActivities+"";
        localStorage.setItem("storageActivityName", getActivities);
        console.log(url)
        window.location.href = url
        })
    console.log(parseInt($(this).attr("data")))
    $("#activities-table").addClass("table table-striped table-condensed")
    dataIndex = parseInt($(this).attr("data"));
    clearInterval(imageInterval)
        if (dataIndex === 0) {
            imageInterval = setInterval(nextImage,5000) 
            var spring =

                {
                    picture: ['assets/javascript/images/spring/camping.PNG','assets/javascript/images/spring/cherry_blossom.PNG', 'assets/javascript/images/spring/hiking.PNG','assets/javascript/images/spring/picnic.PNG'], 
        
                    button: ["Camping","Cherry Blossom", "Hiking","Picnic Festival"],
        
                    }
                    
                $("#activity-selected").html("<h3>" + "Spring Activities" + "<h3>")   
                            
                $("#activities-images-first-row").html("<img class= 'img-responsive'src=" + spring.picture[0] + " width='250px' height='250px'>") 
                $("#activities-images-second-row").html("<img class= 'img-responsive' src=" + spring.picture[1] + " width='250px' height='250px'>")
                $("#activities-images-third-row").html("<img class= 'img-responsive' src=" + spring.picture[2] + " width='250px' height='250px'>")
                $("#activities-images-fourth-row").html("<img class= 'img-responsive' src=" + spring.picture[3] + " width='250px' height='250px'>")
            
                
                            
                $("#activities-button-first-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + spring.button[0] + "</button>").attr(
                    'data-entry', 'camping') 
                $("#activities-button-second-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + spring.button[1] + "</button>").attr(
                    'data-entry', 'cherry-blossom') 
                $("#activities-button-third-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + spring.button[2] + "</button>").attr(
                        'data-entry', 'hiking') 
                $("#activities-button-fourth-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + spring.button[3] + "</button>").attr(
                            'data-entry', 'picnic') 
                
                //var activities = $(this).attr("data-entry")
                            
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
                    picture: ['assets/javascript/images/summer/beach.PNG', 'assets/javascript/images/summer/kayaking.PNG','assets/javascript/images/summer/natural_springs.PNG','assets/javascript/images/summer/paddleboard.PNG'], 
        
                    button: ["Beaches", "Kayaking", "Natural Springs","Paddleboarding"],
        
                    }
                
                $("#activity-selected").html("<h3>" + "Summer Activities" + "<h3>")  

                $("#activities-images-first-row").html("<img class= 'img-responsive'src=" + summer.picture[0] + " width='250px' height='250px'>") 
                $("#activities-images-second-row").html("<img class= 'img-responsive' src=" + summer.picture[1] + " width='250px' height='250px'>")
                $("#activities-images-third-row").html("<img class= 'img-responsive' src=" + summer.picture[2] + " width='250px' height='250px'>")
                $("#activities-images-fourth-row").html("<img class= 'img-responsive' src=" + summer.picture[3] + " width='250px' height='250px'>")
            
                    //displayImage()
                $("#activities-button-first-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + summer.button[0] + "</button>").attr(
                    'data-entry', 'beaches') 
                $("#activities-button-first-row").on("click",function(){
                    console.log($(this).attr("data-entry"))
                    })
                $("#activities-button-second-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + summer.button[1] + "</button>").attr(
                    'data-entry', 'kayaking') 
                $("#activities-button-third-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + summer.button[2] + "</button>").attr(
                        'data-entry', 'natural-springs') 
                $("#activities-button-fourth-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + summer.button[3] + "</button>").attr(
                            'data-entry', 'paddleboarding') 
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
                    picture: ['assets/javascript/images/fall/apple_orchard.PNG', 'assets/javascript/images/fall/fishing.PNG','assets/javascript/images/fall/horseback.PNG','assets/javascript/images/fall/oktoberfest.PNG'], 
        
                    button: ["Apple Orchard", "Fishing", "Horseback Riding","Oktoberfest"],
        
                    }

            $("#activity-selected").html("<h3>" + "Fall Activities" + "<h3>")     
                
                    $("#activities-images-first-row").html("<img class= 'img-responsive' src=" + fall.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img class= 'img-responsive' src=" + fall.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img class= 'img-responsive' src=" + fall.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img class= 'img-responsive' src=" + fall.picture[3] + " width='250px' height='250px'>")
                    //   displayImage()
                    $("#activities-button-first-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + fall.button[0] + "</button>").attr(
                    'data-entry', 'apple-orchard') 
                    $("#activities-button-second-row").on("click",function(){
                    console.log($(this).attr("data-entry"))
                    })
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
                    picture: ['assets/javascript/images/winter/ice_skating.PNG', 'assets/javascript/images/winter/mountain_climbing.PNG','assets/javascript/images/winter/skiing.PNG','assets/javascript/images/winter/snowboarding.PNG'], 
        
                    button: ["Ice Skating", "Mnt Climbing", "Skiing","Snowboarding"],
        
                    }

                    $("#activity-selected").html("<h3>" + "Winter Activities" + "<h3>")  

                    $("#activities-images-first-row").html("<img class= 'img-responsive' src=" + winter.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img class= 'img-responsive' src=" + winter.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img class= 'img-responsive' src=" + winter.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img class= 'img-responsive' src=" + winter.picture[3] + " width='250px' height='250px'>")
                //   displayImage()
                    $("#activities-button-first-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + winter.button[0] + "</button>").attr(
                    'data-entry', 'ice-skating') 
                    $("#activities-button-third-row").on("click",function(){
                    console.log($(this).attr("data-entry"))
                })
                $("#activities-button-second-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + winter.button[1] + "</button>").attr(
                    'data-entry', 'mountain-climbing') 
                $("#activities-button-third-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + winter.button[2] + "</button>").attr(
                        'data-entry', 'skiing') 
                $("#activities-button-fourth-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + winter.button[3] + "</button>").attr(
                            'data-entry', 'snowboarding') 

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
                    picture: ['assets/javascript/images/sightseeing/monuments.PNG', 'assets/javascript/images/sightseeing/museums.PNG','assets/javascript/images/sightseeing/national_parks.PNG','assets/javascript/images/sightseeing/shopping.PNG'], 
        
                    button: ["Monuments", "Museums", "National Parks", "Shopping Centers"],
        
                    }

                    $("#activity-selected").html("<h3>" + "Sightseeing Activities" + "<h3>")  

                    $("#activities-images-first-row").html("<img class= 'img-responsive' src=" + sightseeing.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img class= 'img-responsive' src=" + sightseeing.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img class= 'img-responsive' src=" + sightseeing.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img class= 'img-responsive' src=" + sightseeing.picture[3] + " width='250px' height='250px'>")
                //   displayImage()
                    $("#activities-button-first-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + sightseeing.button[0] + "</button>").attr(
                    'data-entry', 'monuments') 
                    $("#activities-button-fourth-row").on("click",function(){
                    console.log($(this).attr("data-entry"))
                })
                $("#activities-button-second-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + sightseeing.button[1] + "</button>").attr(
                    'data-entry', 'museums') 
                $("#activities-button-third-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + sightseeing.button[2] + "</button>").attr(
                        'data-entry', 'national-parks') 
                $("#activities-button-fourth-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + sightseeing.button[3] + "</button>").attr(
                            'data-entry', 'shopping-centers') 
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
                    picture: ['assets/javascript/images/adult/breweries.PNG', 'assets/javascript/images/adult/distilleries.PNG','assets/javascript/images/adult/gambling.PNG','assets/javascript/images/adult/winery.PNG'], 
        
                    button: ["Breweries", "Distilleries","Gambling","Wineries"],
        
                    }

                    $("#activity-selected").html("<h3>" + "Adult Activities" + "<h3>")  

                    $("#activities-images-first-row").html("<img class= 'img-responsive' src=" + adult.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img class= 'img-responsive' src=" + adult.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img class= 'img-responsive' src=" + adult.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img class= 'img-responsive' src=" + adult.picture[3] + " width='250px' height='250px'>")
                //   displayImage()
                    $("#activities-button-first-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + adult.button[0] + "</button>").attr(
                    'data-entry', 'breweries') 
                    $("#activities-button-third-row").on("click",function(){
                    console.log($(this).attr("data-entry"))
                })
                $("#activities-button-second-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + adult.button[1] + "</button>").attr(
                    'data-entry', 'distilleries') 
                $("#activities-button-third-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + adult.button[2] + "</button>").attr(
                        'data-entry', 'gambling') 
                $("#activities-button-fourth-row").html("<button width='100%' class = 'btn btn-info'  value=''>" + adult.button[3] + "</button>").attr(
                            'data-entry', 'wineries') 
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



// ----------------Activity js--------------------------//  

  activityDB.on("child_added", function(sn) {
    if (sn) {
        sn.forEach(function(child) {
            var categoryKey = child.key;
            var categoryData = child.val();
        
            let catImg = $("<img>")
                            .addClass("catImg")
                            .attr("data-value", categoryData.categoryName)
                            .attr("src", category.categoryImageURL);
            let catTag = $("<span>")
                            .text(categoryData.categoryName);
            $("#...").append(catImg);
            $("#...").append(catTag);

            let actImg = $("<img>")
                            .addClass("actImg")
                            .attr("data-cat", categoryData.categoryName)
                            .attr("data-act", categoryData.activities[0].activityName)
                            .attr("src", categoryData.activities[0].activityImageURL);
            let actTag = $("<span>")
                            .text(categoryData.activities[0].activityName);
            $("#...").append(actImg);
            $("#...").append(actTag);
            
        })
    }
})

$(document).on("click", ".catImg", chgActivities)

function chgActivities() {
    var category = $(this).data("value");
    activityDB.orderByChild("categoryName").equalTo(category).once("value", function(sn) {
        if (sn) {
            $("#...").empty();
            sn.activities.forEach(function(activity) {
                let actImg = $("<img>")
                                .addClass("actImg")
                                .attr("data-cat", category)
                                .attr("data-act", activity.activityName)
                                .attr("src", activity.activityImageURL);
                let actTag = $("<span>")
                                .text(activity.activityName);
                $("#...").append(actImg);
                $("#...").append(actTag);
            })
        }
    })
}

$(document).on("click", ".actImg", selectActivity)

function selectActivity() {
    var uriString = "/location.html?category="
                    + $(this).data("cat") 
                    + "&activity="
                    + $(this).data("act");

    window.location.replace(uriString);
}


// ----------------------Locations js------------------------//

// var currentActivity = $(on click capture)
// var currentLocation = $(on click capture)


// Location call
var placesAPI = "AIzaSyCcEpCXMOs77i41Ulp2ErUyFWVXFw5yjDs"
// construct url to pass to the ajax call
var queryPlaces = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=best+ice+skating+united+states&key=" + placesAPI;

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
        var imgURL = response.originalimage.source;
        console.log(imgURL);
        console.log("Place Title: " + title);
        console.log("Place Info: " + extract);
        var wikiResult = $("<div class='wiki'>");
        var image = $("<img>").attr("src", imgURL);
        var location = $("<a href='https://en.wikipedia.org/api/rest_v1/page/summary/" + title + "' target='_blank'><h1 class='title'>" + title + "</h1></a>")
        var description = $("<h2 class='extract'>" + extract + "</h2>")
        
        wikiResult.append(image)
                    .append(location)
                    .append(description)
                    .prependTo('#wiki-snippet')
        })
    };    


// --------------------Events js--------------------------//

var db = firebase.database();
var activityDB = db.ref("/activity");
var eventDB = db.ref("/event");
var buddyDB = db.ref("/buddy");

//    console.log("user: " + $user_id);
// check for info in parameters - if so use them
// var url_string = window.location.search.substring(1);
// console.log(url_string);
// var thisURL = new URL(url_string);
// var activity = url.searchParam.get("activity");

// 
// on getting event name 
//      look for signed in buddy
//      display their choices
//      for others,
//          display their name 
//          display their choices
//      count selections to determine most used
//      use these counts to fill groups favs
//      use event names for this person to fill pull-down selection - pre-select 1st
//      if shared list has elements, display them
//      if notes, display them
// 
// onclick for copy top button
// onclick for copy from someone else button
//
// onclick invite others
//
// onclick notes button
//

$("#noteAdd").on("click", function() {
    event.preventDefault();

    var noteMsg = $("#noteText").val().trim();

    var msg = new NoteObj(buddyName, noteMsg);
    buddyEvent.notes.push(msg);

    // modify the event


    $("#noteText").val("");

})

eventDB.on("child_added", function(sn) {
    if (sn) {
        var buddyEvent = sn.val();
        console.log(buddyEvent);

        var buddy = buddyEvent.eventBuddies[0];
        $("#currentBuddy").text(buddy.buddyName);
        $("#selActivity").text(buddy.selections.activity);
        $("#selDestination").text(buddy.selections.location);

        $("#start-date-input").val(moment(buddy.selections.startDate).format("YYYY-MM-DD"));
        $("#end-date-input").val(moment(buddy.selections.endDate).format("YYYY-MM-DD"));

        for (i=1; i < buddyEvent.eventBuddies.length; i++) {
            var article = $("<article>")
                            .attr("id", "buddy" + i)
                            .addClass("buddySelection bg-white m-2");
            var h2 = $("<h2>")
                            .addClass("buddyName h2")
                            .text(buddyEvent.eventBuddies[i].buddyName);
            var rowdiv = $("<div>")
                            .addClass("row m-0");
            var actdiv = $("<div>")
                            .addClass("col-6 border border-solid border-dark")
                            .text("Selected Activity:  " + buddyEvent.eventBuddies[i].selections.activity);
            var locdiv = $("<div>")
                            .addClass("col-6 border border-solid border-dark")
                            .text("Selected Destination:  " + buddyEvent.eventBuddies[i].selections.location);
            var rowdiv2 = $("<div>")
                            .addClass("row m-0");
            var sdtdiv = $("<div>")
                            .addClass("col-6 border border-solid border-dark")
                            .text("Start Date:  " + buddyEvent.eventBuddies[i].selections.startDate);
            var edtdiv = $("<div>")
                            .addClass("col-6 border border-solid border-dark")
                            .text("End Date:  " + buddyEvent.eventBuddies[i].selections.endDate);
            var btn = $("<button>")
                            .addClass("btn btn-secondary btn-block")
                            .text("Copy As My Selection");
            
            rowdiv.append(actdiv, locdiv);
            rowdiv2.append(sdtdiv, edtdiv);
            article.append(h2, rowdiv, rowdiv2, btn);
            $("#buddyArea").append(article);
  
        }

        buddyEvent.sharedEmails.forEach(function (email, idx) {
            $("#buddyList").append(
                    $("<div>").addClass("row m-0").append(
                        $("<span>").addClass("col m-0").text(email)
                    )
            );
        })

        buddyEvent.notes.forEach(function(note, idx) {
            var dt = Date(note.dateTime);
            console.log(dt)

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
    }
})

$("#invite").click(function(){
    var inviteEmail = $("#noteText").val().trim();

    var msg = new NoteObj(buddyName, noteMsg);
    buddyEvent.notes.push(msg);

    // modify the event


    $("#noteText").val("");


})

$('#calendar').datepicker({
    inline: true,
    firstDay:0,
    showOtherMonths: false,
    dayNamesMin: ['S','M','T','W','Th','F','S']
})