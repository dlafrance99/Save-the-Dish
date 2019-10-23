$(document).on("click", "#resRating-submit", function(event){
    event.preventDefault();
    var userId = $("#userId").attr("data-value").trim()
    console.log(userId)

    if($("#restaurantRating").val().trim()===""){
        $(".error").html("<h2>You need to Select a Rating</h2>")
        return;
    }
    if($("#restaurantComment").val().trim()===""){
        $(".error").html("<h2>You Need Leave a Comment</h2>")
        return;
    }

    var newRating = {
        restaurantId: $("#restaurantInfo").attr("data-id"),
        rating: $("#restaurantRating").val().trim(),
        comment: $("#restaurantComment").val().trim(),
        UserId: userId
    };

    console.log(`this is the new rating: ${JSON.stringify(newRating)}`);

    $.post("/api/addResRating", newRating).then(function(data){
        window.location.href = `/restaurantInfo/${data.RestaurantId}`
    })

})