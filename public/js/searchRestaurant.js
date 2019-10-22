$(document).on("click", "#search-submit", function(event){
    event.preventDefault();

    var search = $("#search-restaurant").val().trim();

    console.log(search);

    $.get("/searchRestaurant/" + search, function(){
        window.location.replace("/searchRestaurant/" + search);
    })
})

$(document).on("click", "#search-submit-city", function(event){
    event.preventDefault();

    var search = $("#search-restaurant-city").val().trim();

    console.log(search);

    $.get("/searchRestaurant/city/" + search, function(){
        window.location.replace("/searchRestaurant/city/" + search);
    })
})

$(document).on("click", "#search-submit-state", function(event){
    event.preventDefault();

    var search = $("#search-restaurant-state").val().trim();

    console.log(search);

    $.get("/searchRestaurant/state/" + search, function(){
        window.location.replace("/searchRestaurant/state/" + search);
    })
})

$(document).on("click", "#rateRestaurant", function(){
    var dataId = $(this).attr("data-id");
    var dataName = $(this).attr("data-name")

    console.log(dataId);
    window.location.replace("/rateRestaurant/" + dataId + "/" + dataName);
})

$(document).on("click", "#allRatings", function(){
    var dataId = $(this).attr("data-id");
    var dataName = $(this).attr("data-name");
    window.location.replace("/restaurantRatings/" + dataId)
})

$(document).on("click", "#RateMeal", function(){
    var dataId = $(this).attr("data-id");
    var dataName = $(this).attr("data-name");

    window.location.replace("/addMeal/" + dataId + "/" + dataName)
})

$(document).on("click", "#allMealRatings", function(){
    var dataId = $(this).attr("data-id");
    var dataName = $(this).attr("data-name");
    window.location.replace("/mealRatings/" + dataId)
})
