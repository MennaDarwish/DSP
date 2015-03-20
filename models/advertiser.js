"use strict";
module.exports = function(sequelize, DataTypes) {
  var Advertiser = sequelize.define("Advertiser", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Advertiser.hasMany(models.Creative, {foreignKey: 'advertiserId'});
      }
    }
  });
  return Advertiser;
};
