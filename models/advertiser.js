"use strict";
module.exports = function(sequelize, DataTypes) {
  var Advertiser = sequelize.define("Advertiser", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    domain: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Advertiser.hasMany(models.Campaign, {foreignKey: 'advertiserId'});
      }
    }
  });
  return Advertiser;
};
