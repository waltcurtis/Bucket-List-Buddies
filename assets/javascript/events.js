$(document).ready(function() {

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
})