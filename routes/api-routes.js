var db = require('../models')
var passport = require("../config/passport")

module.exports = function(app) {
    app.post("/api/login", passport.authenticate("local"), function(req,res){
        res.json("/main")
    });

    app.post("/api/signup", function(req,res){
        console.log(req.body);
        db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).then(function(){
            res.redirect(307, "/api/login")
        }).catch(function(err){
            console.log(err);
            res.json(err);
        })
    });

    app.get("/api/signup", function(req, res){
        db.User.findAll().then(function(result) {
            return res.json(result);
        })
    });

    app.get("/logout", function(req, res){
        req.logout();
        res.redirect("/");
    });

    app.get("/api/user_data", function(req, res){
        if(!req.user){
            res.json({});
        } else {
            res.json({
                username: req.user.username,
                email: req.user.email,
                id: req.user.id
            });
        }
    });

    app.get("/api/user/:id", function(req, res){
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Ratings]
        }).then(function(dbUser){
            res.json(dbUser)
        })
    })
}