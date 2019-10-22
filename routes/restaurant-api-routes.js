var db = require("../models");

module.exports = function(app) {
    app.post("/api/addRestaurant", function(req, res){
        db.Restaurant.create({
            restaurant_name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            rating: req.body.rating,
            comment: req.body.comment
        }).then(function(data){
            res.json(data);
        })
    })
}