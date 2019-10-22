module.exports = function (sequelize, DataTypes) {
    var Restaurant = sequelize.define("Restaurant", {
        restaurant_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Restaurant.associate = function(models){
        Restaurant.hasMany(models.Meal, {
            onDelete: "CASCADE"
        })
        Restaurant.hasMany(models.Ratings, {
            onDelete: "CASCADE"
        })
    }

    return Restaurant;
};