var db = require("../models");

module.exports = function(app) {
    app.post("/api/addRestaurant", function(req, res){
        db.Restaurant.create({
            restaurant_name: req.body.name,
            city: req.body.city,
            state: req.body.state,
        }).then(function(data){
            console.log("This is the data I want" + data)
            res.json(data);
        })
    })
}