var express = require("express");

var app = express();

var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "home"}));
app.set("view engine", "handlebars");

// routes

require("./routes/restaurant-api-routes.js")(app);
require("./routes/htmlRoutes")(app);
require("./routes/meal-api-routes")(app);
require("./routes/restaurant-rating-api")(app);

db.sequelize.sync({}).then(function(){
    app.listen(PORT, function(){
        console.log(`App listening on PORT ${PORT}`)
    });
});
