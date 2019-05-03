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
    var eventDB = db.ref("/event");

    var currBuddy = null;
    var currEvent = null;
    var eventsArr = [];

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

    // if currActivities
    console.log("currActivity: " + currActivity);
    if (currActivities != null  &&  currActivities.trim().length != "")
        //   set selActivity to currActivity
        $("#selActivity").text(currActivity);

    // if currLocation
    console.log("currLocation: " + currLocation);
    if (currLocation != null  &&  currLocation.trim().length != "")
    //   set selDestination to currLocation
        $("@selDestination").text(currLocation);

    console.log("auth:");
    console.log(auth);
    if (auth != null) {
        // set currBuddy to username
        currBuddy = auth.displayName;
        if (currBuddy.trim() != "")
            $("#buddyName").text(currBuddy);
    }

    // get events for user
    if (currBuddy != null  &&  currBuddy.trim() != "")
        eventsArr = findEventsForBuddy(currBuddy);
    // if any events, and curr selections are not made
    //    load first event to screen
    if (eventsArr.length > 0) {
        loadEventToScreen(eventsArr[0]);
    }
    eventsArr.forEach(function(event){
        $("#eventNameList").append($("<option>").attr("value", event.eventName))
    })


    //  load all events to group events drop-down   


    function findEventsForBuddy(buddy) {
        console.log("find events for " + buddy);
        eventArr = eventDB
                    .orderByChild(eventBuddies.buddyName)
                    .equalTo(buddy)
                    .once("value", function(snap){
                        console.log(snap.val());
                    })
                    
    }

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

})