var db = require("../models");

module.exports = function(app){
    app.post("/api/addResRating", function(req, res){
        db.Ratings.create({
            rating: req.body.rating,
            comment: req.body.comment,
            RestaurantId: req.body.restaurantId
        }).then(function(data){
            res.json(data);
        })
    })
}