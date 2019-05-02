
window.onload = console.log(localStorage.getItem("storageActivityName"));
window.onload = alert(localStorage.getItem("storageActivityName"));

//var location = $("#test")
//var divClone
$(document).ready(function(){
    

for(var i = 0; i < 19; i++){
 //  divClone = location.cloneNode(true)
  // document.body.appendChild(divClone)
 //   $("#location-sections").append("#try")
 $("#location-sections").append("<main class='container'><section class='main-section'><img src='assets/javascript/images/sightseeing/monuments.PNG' class='auth-image'><p id='locationDescription'></p><p id='locationWeather'>test</p><p id='locationSimilarities' >test</p></section></main>")
}
})