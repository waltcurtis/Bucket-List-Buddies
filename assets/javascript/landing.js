
$(document).ready(function() {
var landingImages = ['assets/javascript/images/spring.jpg', 'assets/javascript/images/summer.jpg','assets/javascript/images/fall.jpg', 'assets/javascript/images/winter.png','assets/javascript/images/sightseeing.PNG','assets/javascript/images/adult.PNG']
var landingButtons=['Spring Activities','Summer Activities','Fall Activities','Winter Activities','Sightseeing Activities','Adult Activities']
var count = 0;
displayImage();
for(let i = 0; i < landingImages.length ;i++){
    $("#landing_images")
    var imageTag = $("<div> <img src=" + landingImages[i] + " width='450px' height='200px'> </div>")
    imageTag.attr({
        data: i,
        class: "col-4 landing__scroll-box" 
    })
  
$("#landing_images").append(imageTag ) 

}

for(let i = 0; i < landingButtons.length ;i++){
    $("#landing_buttons")
    var buttonTag = $("<div> <button class = 'btn btn-info'>" + landingButtons[i] + "</button> </div>")
    buttonTag.attr({
        data: i,
        class: "col-4 landing__scroll-box",
    })
$("#landing_buttons").append(buttonTag ) 

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
    console.log(parseInt($(this).attr("data")))
    
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
            for(let i = 0; i < spring.picture.length; i++){                  
                $("#activities-images-first-row").html("<img src=" + spring.picture[0] + " width='250px' height='250px'>") 
                $("#activities-images-second-row").html("<img src=" + spring.picture[1] + " width='250px' height='250px'>")
                $("#activities-images-third-row").html("<img src=" + spring.picture[2] + " width='250px' height='250px'>")
                $("#activities-images-fourth-row").html("<img src=" + spring.picture[3] + " width='250px' height='250px'>")
         
         
            }
            for(let i = 0; i < spring.button.length; i++){                  
                    $("#activities-button-first-row").html("<button width='250px' class = 'btn btn-info'>" + spring.button[0] + "</button>") 
                    $("#activities-button-second-row").html("<button width='250px' class = 'btn btn-info'>" + spring.button[1] + "</button>") 
                    $("#activities-button-third-row").html("<button width='250px' class = 'btn btn-info'>" + spring.button[2] + "</button>") 
                   
                    }
                function displayImage() {
                        $("#slideshow").html("<img src=" + spring.picture[count] + " width='100%' height='100%'>");
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

                for(let i = 0; i < summer.picture.length; i++){                  
                    $("#activities-images-first-row").html("<img src=" + summer.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img src=" + summer.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img src=" + summer.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img src=" + summer.picture[3] + " width='250px' height='250px'>")
                   //displayImage()
                }
                function displayImage() {
                    $("#slideshow").html("<img src=" + summer.picture[count] + " width='100%' height='100%'>");
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
                    picture: ['assets/javascript/images/fall/apple_orchard.PNG', 'assets/javascript/images/fall/fishing.PNG','assets/javascript/images/fall/horseback.PNG','assets/javascript/images/fall/Oktoberfest.PNG'], 
        
                    button: ["Apple Orchard", "Fishing", "Horseback Riding","Oktoberfest"],
        
                 }

            $("#activity-selected").html("<h3>" + "Fall Activities" + "<h3>")     

             for(let i = 0; i < fall.picture.length; i++){                  
                    $("#activities-images-first-row").html("<img src=" + fall.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img src=" + fall.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img src=" + fall.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img src=" + fall.picture[3] + " width='250px' height='250px'>")
                 //   displayImage()
                }
                function displayImage() {
                    $("#slideshow").html("<img src=" + fall.picture[count] + " width='100%' height='100%'>");
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

                 for(let i = 0; i < winter.picture.length; i++){                  
                    $("#activities-images-first-row").html("<img src=" + winter.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img src=" + winter.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img src=" + winter.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img src=" + winter.picture[3] + " width='250px' height='250px'>")
                    //displayImage()
                }
                function displayImage() {
                    $("#slideshow").html("<img src=" + winter.picture[count] + " width='100%' height='100%'>");
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

                 for(let i = 0; i < sightseeing.picture.length; i++){                  
                    $("#activities-images-first-row").html("<img src=" + sightseeing.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img src=" + sightseeing.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img src=" + sightseeing.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img src=" + sightseeing.picture[3] + " width='250px' height='250px'>")
                //displayImage()
                }
                function displayImage() {
                    $("#slideshow").html("<img src=" + sightseeing.picture[count] + " width='100%' height='100%'>");
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

                 for(let i = 0; i < adult.picture.length; i++){                  
                    $("#activities-images-first-row").html("<img src=" + adult.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img src=" + adult.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img src=" + adult.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img src=" + adult.picture[3] + " width='250px' height='250px'>")
                    //displayImage()
                }
                function displayImage() {
                    $("#slideshow").html("<img src=" + adult.picture[count] + " width='100%' height='100%'>");
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

      
});