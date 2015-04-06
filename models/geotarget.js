"use strict";
module.exports = function(sequelize, DataTypes) {
  var GeoTarget = sequelize.define("GeoTarget", {
    countryCode: DataTypes.STRING,
    city: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    radius: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        GeoTarget.belongsTo(models.Campaign, {foreignKey: 'campaignId'})
      }
    }
  });
  return GeoTarget;
};
