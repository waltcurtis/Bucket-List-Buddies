

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


  var activityOBJ = {
    categoryName : "",
    activityName : "",
    catImageURL  : "",
    actImageURL  : "",
    locationURL  : ""
  }

  function activityOBJ (categoryName, activityName, catImageURL, actImageURL) {
    this.categoryName = categoryName;
    this.activityName = activityName;
    this.catImageURL  = catImageURL;
    this.actImageURL  = actImageURL;
  }

  var eventObj = {
    eventName      : "",
    savedActivity  : "",
    savedLocation  : "",
    savedStartDate : "",
    savedEndDate   : "",
    eventBuddies   : [],
    sharedEmails   : [],
    notes          : []
  }

  function eventObj (eventName) {
    this.eventName = eventName;
  }

  var buddyObj = {
    name             : "",
    email            : "",
    selectedActivity : "",
    selectedLocation : "",
    selectedStartDate: "",
    selectedEndDate  : ""
  }

  function buddyObj (name, email) {
    this.name   = name;
    this.emnail = email;
  }
