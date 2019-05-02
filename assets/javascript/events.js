$(document).ready(function() {
// check for info in parameters - if so use them
    console.log(window.location.search.substring(1));
    var thisURL = new URL(url_string);
    var activity = url.searchParam.get("activity");
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




})