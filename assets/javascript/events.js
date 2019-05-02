$(document).ready(function() {

    var db = firebase.database();
    var activityDB = db.ref("/activity");
    var eventDB = db.ref("/event");
    var buddyDB = db.ref("/buddy");
  
  
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

    function extractChat(chat) {
        var dts = new Date(chat.val().sentTime);
                
        dts = dts.toLocaleTimeString();

        var time = $("<span>")
                        .addClass("text-dark col-4")
                        .text(dts + " ");
        var sndr = $("<span>")
                        .addClass("text-info col-2")
                        .text(chat.val().screenName + " ");
        var msg  = $("<span>")
                        .addClass("text-primary col-6")
                        .text(chat.val().chatMsg);

        $("#chatFeed").append(time, sndr, msg);
        $("#chatFeed").stop().animate({ scrollTop: $("#chatFeed")[0].scrollHeight}, 500);
    }

    eventDB.on("child_added", function(sn) {
        if (sn) {
            var buddyEvent = sn.val();
            console.log(buddyEvent);

            var buddy = buddyEvent.eventBuddies[0];
            $("#currentBuddy").text(buddy.buddyName);
            $("#selActivity").text(buddy.selections.activity);
            $("#selDestination").text(buddy.selections.location);

            $("#start-date-input").val(buddy.selections.startDate);
            $("#end-date-input").val(buddy.selections.endDate);

            for (i=1; i < buddyEvent.eventBuddies.length; i++) {
                var article = $("<article>")
                                .attr("id", "buddy" + i)
                                .addClass("buddySelection bg-white m-2");
                var h2 = $("<h2>")
                                .addClass("buddyName h2")
                                .text(buddyEvent.eventBuddies[i].buddyName);
                var rowdiv = $("<div>")
                                .addClass("row");
                var actdiv = $("<div>")
                                .addClass("col-6 border border-solid border-dark")
                                .text("Selected Activity:  " + buddyEvent.eventBuddies[i].selections.activity);
                var locdiv = $("<div>")
                                .addClass("col-6 border border-solid border-dark")
                                .text("Selected Destination:  " + buddyEvent.eventBuddies[i].selections.location);
                var rowdiv2 = $("<div>")
                                .addClass("row");
                var sdtdiv = $("<div>")
                                .addClass("col-6 border border-solid border-dark")
                                .text("Start Date:  " + buddyEvent.eventBuddies[i].selections.startDate);
                var edtdiv = $("<div>")
                                .addClass("col-6 border border-solid border-dark")
                                .text("End Date:  " + buddyEvent.eventBuddies[i].selections.startDate);
                var btn = $("<button>")
                                .addClass("btn btn-secondary btn-sm")
                                .text("Copy As My Selection");
                
                rowdiv.append(actdiv, locdiv);
                rowdiv2.append(sdtdiv, edtdiv);
                article.append(h2, rowdiv, rowdiv2, btn);
                $("#buddyArea").append(article);
      
            }

            buddyEvent.sharedEmails.forEach(function (email, idx) {
                $("#buddyList").append(
                        $("<div>").addClass("row").append(
                            $("<span>").addClass("col").text(email)
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
                            .text(moment(note.dateTime).toJSON()),
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

})