var path = require("path");

var db = require("../models");

module.exports = function (app) {
    app.get("/signup", function(req,res){
        if(req.user){
            req.flash("successMsg", "You're already logged in");
            return res.redirect("/main");
        }
        res.render("signup")
    });

    app.get("/login", function(req,res){
        if(req.user){
            req.flash("successMsg", "You're already logged in");
            return res.redirect("/main");
        }
        res.render("login")
    });

    app.get("/main", function(req, res){
        res.render("index", {
            user: req.user.username
        })
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
            id: req.user.id,
            user: req.user.username,
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
                restaurants: data,
                user: req.user.id
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
            },
            include: [db.User]
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

    app.get("/restaurantInfo/:id?", function(req, res){
        console.log(req.params.id)
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

    app.get("/myReviews", function(req,res){
        db.User.findAll({
            where: {
                id: req.user.id
            },
            include: [db.Ratings]
        }).then(function(data){
            res.render("userRatings", {
                ratings: userRatings
            })
        })
    })
}


