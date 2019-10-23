var path = require("path");
var requireLogin = require("../config/middleware/isAuthenticated")
var db = require("../models");

module.exports = function (app) {
    app.get("/signup", function (req, res) {
        if (req.user) {
            // req.flash("successMsg", "You're already logged in");
            return res.redirect("/main");
        }
        res.render("signup")
    });

    app.get("/login", function (req, res) {
        if (req.user) {
            req.flash("successMsg", "You're already logged in");
            return res.redirect("/main");
        }
        res.render("login")
    });

    app.get("/main", function (req, res) {
        if (!req.isAuthenticated()) {
            return res.render("index", { user: "Guest", id: "" })
        }
        res.render("index", {
            user: req.user.username,
            id: req.user.id
        })
    })

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })

    app.get("/addRestaurant", requireLogin, function (req, res) {
        res.render("addRestaurant", {
            user: req.user.username,
            id: req.user.id
        })
    })

    app.get("/addMeal/:id/:name", function (req, res) {
        if (!req.isAuthenticated()) {
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

    app.get("/rateRestaurant/:id/:name", function (req, res) {
        if (!req.isAuthenticated()) {
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

    app.get("/searchRestaurant/:restaurant", function (req, res) {
        db.Restaurant.findAll({
            where: {
                restaurant_name: req.params.restaurant
            },
            order: [
                ["state", "ASC"],
                ["city", "ASC"]
            ]

        }).then(function (data) {
            res.render("restaurantSearch", {
                restaurants: data
            })
        })
    })

    app.get("/searchRestaurant/city/:city", function (req, res) {
        db.Restaurant.findAll({
            where: {
                city: req.params.city
            },
            order: [
                ["restaurant_name", "ASC"],
            ]
        }).then(function (data) {
            res.render("restaurantSearch", {
                restaurants: data
            })
        })
    })

    app.get("/searchRestaurant/state/:state", function (req, res) {
        db.Restaurant.findAll({
            where: {
                state: req.params.state
            },
            order: [
                ["restaurant_name", "ASC"],
            ]
        }).then(function (data) {
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
        }).then(function (data) {
            res.render("restaurantSpecificRatings", {
                ratings: data
            });
        })

    })

    app.get("/mealRatings/:id/", function (req, res) {
        db.Meal.findAll({
            where: {
                RestaurantId: req.params.id
            }
        }).then(function (data) {
            res.render("mealRatings", {
                meals: data
            })
        })
    })

    app.get("/restaurantInfo/:id?", function (req, res) {
        console.log(req.params.id)
        db.Restaurant.findAll({
            where: {
                id: req.params.id
            },
            include: [db.Meal, db.Ratings],
            order: [
                [db.Ratings, "createdAt", "DESC"],
                [db.Meal, "createdAt", "DESC"]
            ]
        }).then(function (data) {
            var restaurantData = data[0].dataValues
            var averageRating;
            if (restaurantData.Ratings.length === 0) {
                averageRating = "No Reviews Yet"
            } else {
                var totalRating = 0;
                for (var i = 0; i < restaurantData.Ratings.length; i++) {
                    var ratings = restaurantData.Ratings[i].dataValues.rating;

                    totalRating += ratings
                }

                averageRating = totalRating / restaurantData.Ratings.length;
            }
            restaurantData.average = averageRating;
            res.render("restaurantInfo", {
                restaurantData
            })
        })
    })

    app.get("/myReviews", function (req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect("/signup");
        }
        db.User.findAll({
            where: {
                id: req.user.id
            },
            include: [{model: db.Ratings, include: [db.Restaurant]}, db.Meal],
            order: [
                [db.Ratings, "createdAt", "DESC"],
                [db.Meal, "createdAt", "DESC"]
            ]
        }).then(function(data){
            console.log(data)
            const reviewData = data[0].dataValues
            // res.json(data)
            res.render("userRatings", {
                reviewData,
                user: req.user.username,
                id: req.user.id
            })
        })
    })
}






