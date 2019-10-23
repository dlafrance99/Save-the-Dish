$(document).on("click", "#resRating-submit", function(event){
    event.preventDefault();

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
        comment: $("#restaurantComment").val().trim()
    };

    // console.log(`this is the new rating: ${newRating}`);

    $.post("/api/addResRating", newRating).then(function(data){
        window.location.href = `/restaurantInfo/${data.RestaurantId}`
    })

})