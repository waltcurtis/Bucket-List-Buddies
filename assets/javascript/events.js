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

//    var currentBuddy = null;
    var currentEvent = null;
    var currentKey = null;

    var buddysEventList = [];
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
    var currentActivity = "Ballet";
    var currentLocation = "NYC, NY";
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
        console.log(activitiesArr);
        console.log(activitiesCntArr);
        var idx = activitiesArr.indexOf(act);
        console.log("idx for " + act + ": " + idx);
        if (idx == -1) {
            activitiesArr.push(act);
            activitiesCntArr.push(1);
        } else {
            activitiesCntArr[idx]++;
        }

        console.log(locationsArr);
        console.log(locationsCntArr);
        var idx = locationsArr.indexOf(loc);
        if (idx == -1) {
            locationsArr.push(loc);
            locationsCntArr.push(1);
        } else {
            locationsCntArr[idx]++;
        }

        console.log(stDateArr);
        console.log(stDateCntArr);
        var idx = stDateArr.indexOf(stDate);
        console.log("idx for " + stDate + ": " + idx);
        if (idx == -1) {
            stDateArr.push(stDate);
            stDateCntArr.push(1);
        } else {
            stDateCntArr[idx]++;
        }

        console.log("enDate: " + enDate);
        console.log(enDateArr);
        console.log(enDateCntArr);
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
                console.log(currentEvent);

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
        console.log("currentEvent:");
        console.log(currentEvent);

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
            console.log("stDate: " + stDate + "   enDate: " + enDate );

            var evnt = new EventObj(currentEvent.eventName);
            evnt.eventBuddies = currentEvent.eventBuddies;
            console.log(evnt);

            var idx = evnt.getEventBuddyIdx(currentBuddy);
            currentEvent.eventBuddies[idx].selections.startDate = stDate;
            currentEvent.eventBuddies[idx].selections.endDate = enDate;

            console.log(currentEvent);
            modEvent();

        } else {
            console.log ("missing current event or event buddy");
        }
    })

    $("#topPicks").click(function() {
        if (currentEvent != null &&  currentBuddy != null) {

            var evnt = new EventObj(currentEvent.eventName);
            evnt.eventBuddies = currentEvent.eventBuddies;
            console.log(evnt);

            var idx = evnt.getEventBuddyIdx(currentBuddy);
            currentEvent.eventBuddies[idx].selections.activity = favActivity;
            currentEvent.eventBuddies[idx].selections.location = favLocation;
            currentEvent.eventBuddies[idx].selections.startDate = favStDate;
            currentEvent.eventBuddies[idx].selections.endDate = favEnDate;

            console.log(currentEvent);
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
            $("#currEventName").text(eventName);
            currentEvent.eventName = eventName;
            console.log(currentEvent);
            // modify the event
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
                    updateCounts(buddy.selections.activity, buddy.selections.location);
    
                    console.log("current Buddy: " + currentBuddy);
                    console.log("buddy.buddyName: " + buddy.buddyName);
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
            console.log(event);
            console.log("currentBuddy: " + currentBuddy);

            if (currentBuddy == null  ||  currentBuddy.trim() == "") return;

            buddysEventList.length = 0;
            buddysEventList = [];

            initCounts();

            event.eventBuddies.forEach(function(buddy, idx) {
                var sels = buddy.selections;
                updateCounts(sels.activity, sels.location, sels.startDate, sels.endDate);

                console.log("current Buddy: " + currentBuddy);
                console.log("buddy.buddyName: " + buddy.buddyName);
                if (buddy.buddyName == currentBuddy) {
                    buddysEventList.push(event.eventName);
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

})