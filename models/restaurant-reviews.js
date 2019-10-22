module.exports = function(sequelize, DataTypes){
    var Ratings = sequelize.define("Ratings", {
        rating: {
            type: DataTypes.INTEGER
        },
        comment: {
            type: DataTypes.STRING
        }
    })

    Ratings.associate = function(models){
        Ratings.belongsTo(models.Restaurant, {
            foreignKey: {
                allowNull: false
            }
        }),
        Ratings.belongsTo(models.User), {
            foreignKey: {
                allowNull: false
            }
        }
    }

    return Ratings
}