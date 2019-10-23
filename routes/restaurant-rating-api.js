var db = require("../models");
var passport = require("../config/passport")

module.exports = function(app){
    app.post("/api/addResRating", function(req, res){
        db.Ratings.create({
            rating: req.body.rating,
            comment: req.body.comment,
            RestaurantId: req.body.restaurantId,
            UserId: req.body.UserId
        }).then(function(data){
            res.json(data);
        })
    })
}