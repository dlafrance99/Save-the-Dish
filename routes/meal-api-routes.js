var db = require("../models");

module.exports = function(app){
    app.post("/api/addMeal", function(req, res){
        db.Meal.create({
            restaurant: req.body.restaurant,
            menu_item: req.body.meal,
            rating: req.body.rating,
            pros: req.body.pro,
            cons: req.body.con,
            RestaurantId: req.body.id
        }).then(function(data){
            res.json(data);
        })
    })
}