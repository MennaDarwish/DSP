"use strict";
module.exports = function(sequelize, DataTypes) {
  var Campaign = sequelize.define("Campaign", {
    title: DataTypes.STRING,
    budget: DataTypes.INTEGER,
    tags: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here        
        Campaign.hasMany(models.Creative, {foreignKey: 'campaignId'});
        Campaign.belongsTo(models.Advertiser, {foreignKey: 'advertiserId', onDelete: 'cascade', hooks: 'true'});
        Campaign.hasOne(models.GeoTarget, {foreignKey: 'campaignId'});
      }
    }
  });
  return Campaign;
};
