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

  class CategoryOBJ {
    constructor(categoryName, catImageURL) {
      this.categoryName     = categoryName;
      this.catImageURL      = catImageURL;
      this.activities       = [];
    }
    addActivity(activityName, activityImageURL) {
      this.activities.push( new ActivityObj(activityName, activityImageURL) ); 
    }
    getActivityIdx(activityName) { 
      this.activities.forEach(function(activity, i) {
        var idx = -1;
        if (activity.activityName == activityName) idx = i; 
      })
      return idx;
    }
  }

  class ActivityObj {
    constructor(activityName, activityImageURL) {
      this.activityName     = activityName;
      this.activityImageURL = activityImageURL;
    }
  }

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


// ====================================

// this area used for testing 

  // var cat = new CategoryOBJ("Custom", "")
  // cat.addActivity("Wine Tasting", "")
  // cat.addActivity("Gambling", "")
  // activityDB.push(cat)

  // cat = new CategoryOBJ("Family Activities", "")
  // cat.addActivity("Reunion", "")
  // activityDB.push(cat)

  // cat = new CategoryOBJ("Summer Events", "")
  // cat.addActivity("Hiking", "")
  // cat.addActivity("Fishing", "")
  // activityDB.push(cat)

  // var buddy = new BuddyObj("SeanUgar", "sugar@hotmail.com")
  // buddyDB.push(buddy)

  // var event1 = new EventObj("freds get-together")
  
  // event1.addEventBuddy("FredHollywood")

  // idx = event1.getEventBuddyIdx("FredHollywood")
  // event1.eventBuddies[idx].selections.activity  = "Gambling"
  // event1.eventBuddies[idx].selections.location  = "Reno, Nv"
  // event1.eventBuddies[idx].selections.startDate = new Date("04-01-2020").toJSON()
  // event1.eventBuddies[idx].selections.endDate   = new Date("04-08-2020").toJSON()

  // event1.addEventBuddy("SeanUgar")
  // idx = event1.getEventBuddyIdx("SeanUgar")
  // event1.eventBuddies[idx].selections.activity  = "Gambling"
  // event1.eventBuddies[idx].selections.location  = "Las Vegas, Nv"
  // event1.eventBuddies[idx].selections.startDate = new Date("04-01-2020").toJSON()
  // event1.eventBuddies[idx].selections.endDate   = new Date("04-08-2020").toJSON()

  // event1.sharedEmails.push("lane@hotmail.com")
  // event1.sharedEmails.push("sugar@hotmail.com")

  // var note = new NoteObj("fred", "this is my latest event")
  // event1.notes.push(note);
  // note = new NoteObj("buddyName", "have invited all of my friends")
  // event1.notes.push(note);

  // eventDB.push(event1);

  function loadEvent() {
    eventDB.once("value", function(sn) {
      if (sn) {
        sn.forEach(function(child) {
          var eventKey = child.key;
          var eventData = child.val();

          var ul = $("<ul>");
          
          var li = $("<li>").text(eventData.eventName);
          ul.append(li);

          eventData.eventBuddies.forEach(function (buddy) {
            let li = $("<li>").text(buddy.buddyName);
            ul.append(li);

            let li2 = $("<li>").text(buddy.selections.activity + "|" 
                                  + buddy.selections.location + "|"
                                  + buddy.selections.startDate + "|"
                                  + buddy.selections.endDate );
            ul.append(li2);
          })
          $("#stuff").append(ul);
        })
      }
    })
  }

  // loadEvent();


})  