module.exports = function(sequelize, DataTypes){
    var Meal = sequelize.define("Meal", {
        restaurant: {
            type: DataTypes.STRING,
            allowNull: false
        },
        menu_item: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pros: {
            type: DataTypes.STRING
        },
        cons: {
            type: DataTypes.STRING
        }
    });

    Meal.associate = function(models){
        Meal.belongsTo(models.Restaurant, {
            foreignKey: {
                allowNull: false
            }
        }),
        Meal.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Meal;
}