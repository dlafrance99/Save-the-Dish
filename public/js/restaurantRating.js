$(document).on("click", "#resRating-submit", function(event){
    event.preventDefault();

    var newRating = {
        restaurantId: $("#restaurantInfo").attr("data-id"),
        rating: $("#restaurantRating").val().trim(),
        comment: $("#restaurantComment").val().trim()
    };

    console.log(`this is the new rating: ${newRating}`);

    $.post("/api/addResRating", newRating).then(function(){
        window.location.replace("/allRestaurants")
    })

})