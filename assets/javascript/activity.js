activityDB.on("child_added", function(sn) {
    if (sn) {
        sn.forEach(function(child) {
            var categoryKey = child.key;
            var categoryData = child.val();
        
            let catImg = $("<img>")
                            .addClass("catImg")
                            .attr("data-value", categoryData.categoryName)
                            .attr("src", category.categoryImageURL);
            let catTag = $("<span>")
                            .text(categoryData.categoryName);
            $("#...").append(catImg);
            $("#...").append(catTag);

            let actImg = $("<img>")
                            .addClass("actImg")
                            .attr("data-cat", categoryData.categoryName)
                            .attr("data-act", categoryData.activities[0].activityName)
                            .attr("src", categoryData.activities[0].activityImageURL);
            let actTag = $("<span>")
                            .text(categoryData.activities[0].activityName);
            $("#...").append(actImg);
            $("#...").append(actTag);
            
        })
    }
})

$(document).on("click", ".catImg", chgActivities)

function chgActivities() {
    var category = $(this).data("value");
    activityDB.orderByChild("categoryName").equalTo(category).once("value", function(sn) {
        if (sn) {
            $("#...").empty();
            sn.activities.forEach(function(activity) {
                let actImg = $("<img>")
                                .addClass("actImg")
                                .attr("data-cat", category)
                                .attr("data-act", activity.activityName)
                                .attr("src", activity.activityImageURL);
                let actTag = $("<span>")
                                .text(activity.activityName);
                $("#...").append(actImg);
                $("#...").append(actTag);
            })
        }
    })
}

$(document).on("click", ".actImg", selectActivity)

function selectActivity() {
    var uriString = "/location.html?category="
                    + $(this).data("cat") 
                    + "&activity="
                    + $(this).data("act");

    window.location.replace(uriString);
}
