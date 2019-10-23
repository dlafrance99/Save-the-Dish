$(document).on("click", "#submit-restaurant", function(event){
    event.preventDefault();

    if($("#user-restaurant").val().trim()===""){
        $(".error").html("<h2>You Need to Enter a Restaurant Name</h2>")
        return; 
    }
    if($("#user-city").val().trim()===""){
        $(".error").html("<h2>You Need to Enter a City</h2>")
        return; 
    }
    if($("#user-state").val().trim()===""){
        $(".error").html("<h2>You Need to Enter a State</h2>")
        return; 
    }

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