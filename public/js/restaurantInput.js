$(document).on("click", "#submit-restaurant", function(event){
    event.preventDefault();
    var newRestaurant = {
        name: $("#user-restaurant").val().trim(),
        city: $("#user-city").val().trim(),
        state: $("#user-state").val().trim(),
    };
    console.log(newRestaurant);
    
    
    $.post("/api/addRestaurant", newRestaurant).then(function(data){
        window.location.replace("/restaurantInfo/" + data.id);
        
    })
})