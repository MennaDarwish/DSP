"use strict";
module.exports = function(sequelize, DataTypes) {
  var Creative = sequelize.define("Creative", {
    height: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    imageURL: DataTypes.STRING,
    redirectURL: DataTypes.STRING,
    microUSD: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Creative.belongsTo(models.Campaign, {foreignKey:'advertiserId'});
      }
    }
  });
  return Creative;
};
