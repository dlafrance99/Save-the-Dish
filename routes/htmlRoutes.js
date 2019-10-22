var path = require("path");

var db = require("../models");

module.exports = function (app) {
    app.get("/signup", function(req,res){
        if(req.user){
            res.redirect("/main");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"))
    });

    app.get("/login", function(req,res){
        if(req.user){
            res.redirect("/main");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"))
    });

    app.get("/main", function(req, res){
        res.render("index")
    })

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })

    app.get("/addRestaurant", function (req, res) {
        res.render("addRestaurant")
    })

    app.get("/addMeal/:id/:name", function(req, res){
        var restaurantid = {
            id: req.params.id,
            name: req.params.name
        }

        res.render("addMeal", {
            restaurantid
        })
    })

    app.get("/rateRestaurant/:id/:name", function(req, res){
        var restaurantId = {
            id: req.params.id,
            name: req.params.name
        }
        
        res.render("restaurantRating", {
            restaurantId
        });
    })

    app.get("/searchRestaurant/:restaurant", function(req, res){
        db.Restaurant.findAll({
            where: {
                restaurant_name: req.params.restaurant
            }
        }).then(function(data){
            res.render("restaurantSearch", {
                restaurants: data
            })
        })
    })

    app.get("/searchRestaurant/city/:city", function(req, res){
        db.Restaurant.findAll({
            where: {
                city: req.params.city
            }
        }).then(function(data){
            res.render("restaurantSearch", {
                restaurants: data
            })
        })
    })

    app.get("/searchRestaurant/state/:state", function(req, res){
        db.Restaurant.findAll({
            where: {
                state: req.params.state
            }
        }).then(function(data){
            res.render("restaurantSearch", {
                restaurants: data
            })
        })
    })


    app.get("/allRestaurants", function (req, res) {
        db.Restaurant.findAll().then(function (data) {
            res.render("restaurantSearch", {
                restaurants: data
            })
        })
    })

    app.get("/restaurantRatings/:id", function (req, res) {
        db.Ratings.findAll({
            where: {
                RestaurantId: req.params.id
            }
        }).then(function(data){
            res.render("restaurantSpecificRatings", {
                ratings: data
            });
        })
        
    })

    app.get("/mealRatings/:id/", function(req, res){
        db.Meal.findAll({
            where: {
                RestaurantId: req.params.id
            }
        }).then(function(data){
            res.render("mealRatings", {
                meals: data
            })
        })
    })

    app.get("/restaurantInfo/:id", function(req, res){
        db.Restaurant.findAll({
            where: {
                id: req.params.id
            },
            include: [db.Meal, db.Ratings]
        }).then(function(data){
            var data = data[0].dataValues
            // console.log(data.Ratings)
            res.render("restaurantInfo", {
                restaurantinfo: data
            })
        })
    })
}


