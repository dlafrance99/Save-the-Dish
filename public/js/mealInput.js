$(document).on("click", "#submit-meal", function(event){
    event.preventDefault();
    var userId = $("#userId").attr("data-value").trim()
    console.log(userId)

    var newMeal = {
        restaurant: $("#restaurantInfo").attr("data-name"),
        meal: $("#mealItem").val().trim(),
        rating: $("#mealRating").val().trim(),
        pro: $("#ratingPros").val().trim(),
        con: $("#ratingCons").val().trim(),
        id: $("#restaurantInfo").attr("data-id"),
        UserId: userId
    };
    console.log(newMeal);

    $.post("/api/addMeal", newMeal).then(function(data){
        window.location.replace("/restaurantInfo/" + data.RestaurantId);
    })
})