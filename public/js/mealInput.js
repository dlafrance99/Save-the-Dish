$(document).on("click", "#submit-meal", function(event){
    event.preventDefault();

    if($("#mealItem").val().trim()===""){
        $(".error").html("<h2>You Need to Enter a Menu Item</h2>")
        return; 
    }

    if($("#mealRating").val().trim()===""){
        $(".error").html("<h2>You Need Give a Rating</h2>")
        return; 
    }

    if($("#ratingPros").val().trim()===""){
        $(".error").html("<h2>You Need Give to Give a Pro Comment</h2>")
        return; 
    }

    if($("#ratingCons").val().trim()===""){
        $(".error").html("<h2>You Need Give to Give a Con Comment</h2>")
        return; 
    }

    var newMeal = {
        restaurant: $("#restaurantInfo").attr("data-name"),
        meal: $("#mealItem").val().trim(),
        rating: $("#mealRating").val().trim(),
        pro: $("#ratingPros").val().trim(),
        con: $("#ratingCons").val().trim(),
        id: $("#restaurantInfo").attr("data-id")
    };
    console.log(newMeal);

    $.post("/api/addMeal", newMeal).then(function(data){
        window.location.replace("/restaurantInfo/" + data.RestaurantId);
    })
})