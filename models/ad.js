"use strict";
module.exports = function(sequelize, DataTypes) {
  var Ad = sequelize.define("Ad", {
    length: DataTypes.FLOAT,
    width: DataTypes.FLOAT,
    tags: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    imageRedirectURL: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Ad.belongsTo(models.Buyer, {foreignKey:'buyerId'});
      }
    }
  });
  return Ad;
};