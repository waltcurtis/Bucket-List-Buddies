
$(document).ready(function() {
var landingImages = ['assets/javascript/images/spring.jpg', 'assets/javascript/images/summer.jpg','assets/javascript/images/fall.jpg', 'assets/javascript/images/winter.png','assets/javascript/images/Outdoor.png','assets/javascript/images/indoor.png','assets/javascript/images/family.png','assets/javascript/images/adult.png']
var landingButtons=['Spring Activities','Summer Activities','Fall Activities','Winter Activities','Outdoor Fun','Indoor Fun','Family Activities','Adult Activities']
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
                    picture: ['assets/javascript/images/spring/cherry_blossom.png', 'assets/javascript/images/spring/hiking.png','assets/javascript/images/spring/horseback.png','assets/javascript/images/spring/picnic.png'], 
        
                    button: ["Cherry Blossom", "Hiking","Horseback Riding", "Picnic"],
        
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
                    picture: ['assets/javascript/images/summer/beach.png', 'assets/javascript/images/summer/camping.png','assets/javascript/images/summer/fishing.png','assets/javascript/images/summer/hike.png'], 
        
                    button: ["Beach", "Camping", "Fishing","Hiking"],
        
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
                    picture: ['assets/javascript/images/fall/apple_orchard.png', 'assets/javascript/images/fall/hayride.png','assets/javascript/images/fall/hiking.png','assets/javascript/images/fall/oktoberfest.png'], 
        
                    button: ["Apple Orchard", "Hayride", "Hiking","Oktoberfest"],
        
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
                    picture: ['assets/javascript/images/winter/ice_skating.png', 'assets/javascript/images/winter/mountain_climbing.png','assets/javascript/images/winter/skiing.png','assets/javascript/images/winter/snowboarding.png'], 
        
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
            var outdoor =

                {
                    picture: ['assets/javascript/images/outdoor/beach.png', 'assets/javascript/images/outdoor/camping.png','assets/javascript/images/outdoor/hiking.png','assets/javascript/images/outdoor/picnic.png'], 
        
                    button: ["Beach", "Camping", "Hiking","Picnic"],
        
                 }

                 $("#activity-selected").html("<h3>" + "Outdoor Activities" + "<h3>")  

                 for(let i = 0; i < outdoor.picture.length; i++){                  
                    $("#activities-images-first-row").html("<img src=" + outdoor.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img src=" + outdoor.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img src=" + outdoor.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img src=" + outdoor.picture[3] + " width='250px' height='250px'>")
                    //displayImage()
                }
                function displayImage() {
                    $("#slideshow").html("<img src=" + outdoor.picture[count] + " width='100%' height='100%'>");
                  }

                  function nextImage(){
                      count++
                    
                      setTimeout(displayImage, 1000);
                    
                      if (count === outdoor.picture.length) {
                    
                        count = 0;
                    
                      }
                  }
        }  
        else if (dataIndex === 5) {
            imageInterval = setInterval(nextImage,5000) 
            var indoor = 

                {
                    picture: ['assets/javascript/images/indoor/archery.png', 'assets/javascript/images/indoor/bowling.png','assets/javascript/images/indoor/indoor_rock_climbing.png','assets/javascript/images/indoor/museums.png'], 
        
                    button: ["Archery", "Bowling", "Indoor Rock Climbing", "Museums"],
        
                 }

                 $("#activity-selected").html("<h3>" + "Indoor Activities" + "<h3>")  

                 for(let i = 0; i < indoor.picture.length; i++){                  
                    $("#activities-images-first-row").html("<img src=" + indoor.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img src=" + indoor.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img src=" + indoor.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img src=" + indoor.picture[3] + " width='250px' height='250px'>")
                //displayImage()
                }
                function displayImage() {
                    $("#slideshow").html("<img src=" + indoor.picture[count] + " width='100%' height='100%'>");
                  }

                  function nextImage(){
                      count++
                    
                      setTimeout(displayImage, 1000);
                    
                      if (count === indoor.picture.length) {
                    
                        count = 0;
                    
                      }
                  }
        }  
        else if (dataIndex === 6) {
            imageInterval = setInterval(nextImage,5000) 
            var family = 

                {
                    picture: ['assets/javascript/images/family/apple_orchard.png', 'assets/javascript/images/family/camping.png','assets/javascript/images/family/hiking.png','assets/javascript/images/family/picnic.png'], 
        
                    button: ["Apple Orchard", "Camping", "Hiking","Picnic"],
        
                 }

                 $("#activity-selected").html("<h3>" + "Family Activities" + "<h3>")  

                 for(let i = 0; i < family.picture.length; i++){                  
                    $("#activities-images-first-row").html("<img src=" + family.picture[0] + " width='250px' height='250px'>") 
                    $("#activities-images-second-row").html("<img src=" + family.picture[1] + " width='250px' height='250px'>")
                    $("#activities-images-third-row").html("<img src=" + family.picture[2] + " width='250px' height='250px'>")
                    $("#activities-images-fourth-row").html("<img src=" + family.picture[3] + " width='250px' height='250px'>")
                   // displayImage()
                }
                function displayImage() {
                    $("#slideshow").html("<img src=" + family.picture[count] + " width='100%' height='100%'>");
                  }

                  function nextImage(){
                      count++
                    
                      setTimeout(displayImage, 1000);
                    
                      if (count === family.picture.length) {
                    
                        count = 0;
                    
                      }
                  }
        }  
        else {
            imageInterval = setInterval(nextImage,5000) 
            var adult =

                {
                    picture: ['assets/javascript/images/adult/bars.png', 'assets/javascript/images/adult/breweries.png','assets/javascript/images/adult/clubs.png','assets/javascript/images/adult/winery.png'], 
        
                    button: ["Bars", "Breweries", "Clubs","Wineries"],
        
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