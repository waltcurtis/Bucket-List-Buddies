$(document).ready(function() {


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


  var db = firebase.database();
  var activityDB = db.ref("/activity");
  var eventDB = db.ref("/event");
  var buddyDB = db.ref("/buddy");

// ====================================

  class ActivityOBJ {
    constructor(categoryName, activityName, catImageURL, actImageURL) {
      this.categoryName = categoryName;
      this.activityName = activityName;
      this.catImageURL = catImageURL;
      this.actImageURL = actImageURL;
    }
  }

// ====================================

  function EventObj (eventName) {
    this.eventName   = eventName;
    this.eventBuddies     = [],  // array of eventBuddy objects
    this.sharedEmails     = [],  // array of email addresses
    this.notes            = [],  // array of note objects
    this.addEventBuddy    = function(buddyName) { this.eventBuddies.push( new EventBuddyObj(buddyName) ); },
    this.getEventBuddyIdx = function(buddyName) { 
                                                  this.eventBuddies.forEach(function(buddy, idx) {
                                                    if (buddy.buddyName == buddyName) return idx; 
                                                  });
                                                  return -1;
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
      this.dateTime = new Date().toJSON();
      this.buddyName = buddyName;
      this.noteText = noteText;
    }
  }

// ====================================
  
  class BuddyObj {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
  }

// ====================================

  // this function should prolly be in the act.js, instead of the common
  function loadActivityInCatOrder() {
    activityDB.orderByChild("categoryName").once("value", function(sn) {
      // the commented code was just used for testing - example

      // var arr = [];
      // var ul = $("<ul>");

      if (sn) {
        sn.forEach(function(child) {
          var actKey = child.key;
          var actData = child.val();
          
          // var li = $("<li>").text(actData.categoryName + " - " + actData.activityName);
          // ul.append(li);
        })

        // $("#act").append(ul);
      }
    }, function(error) {console.log("error" + error)})
  }

// ====================================


// ====================================

// this area used for testing 

// activityDB.push( new ActivityOBJ("Adult Activities", "Wine Tasting", "", ""))
// activityDB.push( new ActivityOBJ("Family Activities", "Reunion", "", ""))
// activityDB.push( new ActivityOBJ("Summer Events", "Fishing", "", ""))
// activityDB.push( new ActivityOBJ("Adult Activities", "Gambling", "", ""))

// loadActivityInCatOrder();

});  