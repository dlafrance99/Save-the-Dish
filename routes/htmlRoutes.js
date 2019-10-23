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
        if(!req.isAuthenticated()){
            return res.render("index", {user: "Guest", id:""})
        }
        res.render("index", {
            user: req.user.username,
            id: req.user.id
        })
    })

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })

    app.get("/addRestaurant", function (req, res) {
        if(!req.isAuthenticated()){
            return res.redirect("/signup");
        }
        res.render("addRestaurant", {
            user: req.user.username,
            id: req.user.id
        })
    })

    app.get("/addMeal/:id/:name", function(req, res){
        if(!req.isAuthenticated()){
            return res.redirect("/signup");
        }
        var restaurantid = {
            id: req.params.id,
            name: req.params.name
        }

        res.render("addMeal", {
            restaurantid,
            user: req.user.username,
            id: req.user.id
        })
    })

    app.get("/rateRestaurant/:id/:name", function(req, res){
        if(!req.isAuthenticated()){
            return res.redirect("/signup");
        }
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
        if(!req.isAuthenticated()){
            db.Restaurant.findAll({
                where: {
                    restaurant_name: req.params.restaurant
                }
            }).then(function(data){
                return res.render("restaurantSearch", {
                    restaurants: data,
                    user: "Guest",
                    id: ""
                })
            })
        }
        db.Restaurant.findAll({
            where: {
                restaurant_name: req.params.restaurant
            }
        }).then(function(data){
            res.render("restaurantSearch", {
                restaurants: data,
                user: req.user.username,
                id: req.user.id
            })
        })
    })

    app.get("/searchRestaurant/city/:city", function(req, res){
        if(!req.isAuthenticated()){
            db.Restaurant.findAll({
                where: {
                    city: req.params.city
                }
            }).then(function(data){
                return res.render("restaurantSearch", {
                    restaurants: data,
                    user: "Guest",
                    id: ""
                })
            })
        }
        db.Restaurant.findAll({
            where: {
                city: req.params.city
            }
        }).then(function(data){
            res.render("restaurantSearch", {
                restaurants: data,
                user: req.user.username,
                id: req.user.id
            })
        })
    })

    app.get("/searchRestaurant/state/:state", function(req, res){
        if(!req.isAuthenticated()){
            db.Restaurant.findAll({
                where: {
                    city: req.params.state
                }
            }).then(function(data){
                return res.render("restaurantSearch", {
                    restaurants: data,
                    user: "Guest",
                    id: ""
                })
            })
        }
        db.Restaurant.findAll({
            where: {
                state: req.params.state
            }
        }).then(function(data){
            res.render("restaurantSearch", {
                restaurants: data,
                user: req.user.username,
                id: req.user.id
            })
        })
    })


    app.get("/allRestaurants", function (req, res) {
        if(!req.isAuthenticated()){
            db.Restaurant.findAll().then(function (data) {
               return res.render("restaurantSearch", {
                    restaurants: data,
                    user: "Guest",
                    id: ""
                })
            })
        }
        db.Restaurant.findAll().then(function (data) {
            res.render("restaurantSearch", {
                restaurants: data,
                user: req.user.username,
                id: req.user.id
            })
        })
    })

    app.get("/restaurantRatings/:id", function (req, res) {
        if(!req.isAuthenticated()){
            db.Ratings.findAll({
                where: {
                    RestaurantId: req.params.id
                },
                include: [db.User]
            }).then(function(data){
                return res.render("restaurantSpecificRatings", {
                    ratings: data,
                    user: "Guest",
                    id: ""
                });
            })
        }
        db.Ratings.findAll({
            where: {
                RestaurantId: req.params.id
            },
            include: [db.User]
        }).then(function(data){
            res.render("restaurantSpecificRatings", {
                ratings: data,
                user: req.user.username,
                id: req.user.id
            });
        })
        
    })

    app.get("/mealRatings/:id/", function(req, res){
        if(!req.isAuthenticated()){
            db.Meal.findAll({
                where: {
                    RestaurantId: req.params.id
                }
            }).then(function(data){
                res.render("mealRatings", {
                    meals: data,
                    user: "Guest",
                    id: ""
                })
            })
        }
        db.Meal.findAll({
            where: {
                RestaurantId: req.params.id
            }
        }).then(function(data){
            res.render("mealRatings", {
                meals: data,
                user: req.user.username,
                id: req.user.id
            })
        })
    })

    app.get("/restaurantInfo/:id?", function(req, res){
        console.log(req.params.id)
        if(!req.isAuthenticated()){
            db.Restaurant.findAll({
                where: {
                    id: req.params.id
                },
                include: [db.Meal, db.Ratings]
            }).then(function(data){
                var data = data[0].dataValues
                // // console.log(data.Ratings)
                return res.render("restaurantInfo", {
                    restaurantinfo: data,
                    user: "Guest",
                    id: ""
                })
            })
        }
        db.Restaurant.findAll({
            where: {
                id: req.params.id
            },
            include: [db.Meal, db.Ratings]
        }).then(function(data){
            var data = data[0].dataValues
            res.render("restaurantInfo", {
                restaurantinfo: data,
                user: req.user.username,
                id: req.user.id
            })
        })
    })

    app.get("/myReviews", function(req,res){
        if(!req.isAuthenticated()){
            return res.redirect("/signup");
        }
        db.User.findAll({
            where: {
                id: req.user.id
            },
            include: [db.Ratings]
        }).then(function(data){
            res.render("userRatings", {
                ratings: data,
                user: req.user.username,
                id: req.user.id
            })
        })
    })
}






