var express = require("express");
var bodyParser = require("body-parser")
var session = require("express-session")
var passport = require("./config/passport");
var flash = require("connect-flash");


var PORT = process.env.PORT || 8080;
var db = require("./models");

var app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

app.use(function (req, res, next) {
    res.locals.successMsg = req.flash("successMsg");
    res.locals.errorMsg = req.flash("errorMsg");
    res.locals.error = req.flash("error");
    next();
});

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "home"}));
app.set("view engine", "handlebars");

// routes

require("./routes/restaurant-api-routes.js")(app);
require("./routes/htmlRoutes")(app);
require("./routes/meal-api-routes")(app);
require("./routes/restaurant-rating-api")(app);
require("./routes/api-routes.js")(app);

db.sequelize.sync({}).then(function(){
    app.listen(PORT, function(){
        console.log(`App listening on PORT ${PORT}`)
    });
});
