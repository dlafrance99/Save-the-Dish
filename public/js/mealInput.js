$(document).on("click", "#submit-meal", function(event){
    event.preventDefault();

    var newMeal = {
        restaurant: $("#restaurantInfo").attr("data-name"),
        meal: $("#mealItem").val().trim(),
        rating: $("#mealRating").val().trim(),
        pro: $("#ratingPros").val().trim(),
        con: $("#ratingCons").val().trim(),
        id: $("#restaurantInfo").attr("data-id")
    };
    console.log(newMeal);

    $.post("/api/addMeal", newMeal).then(function(){
        window.location.replace("/allRestaurants");
    })
})