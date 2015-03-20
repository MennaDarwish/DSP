"use strict";
module.exports = function(sequelize, DataTypes) {
  var Buyer = sequelize.define("Buyer", {
    firstName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Buyer.hasMany(models.Creative, {foreignKey: 'buyerId'});
      }
    }
  });
  return Buyer;
};
