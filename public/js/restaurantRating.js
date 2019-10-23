$(document).on("click", "#resRating-submit", function(event){
    event.preventDefault();
    var userId = $("#userId").attr("data-value").trim()
    console.log(userId)

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