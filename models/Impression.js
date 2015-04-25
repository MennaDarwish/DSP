"use strict" ; 
module.exports = function(sequelize, DataTypes) {
  var Impression = sequelize.define("Impression", {
        
        creativeID: DataTypes.INTEGER,
        publisherID: DataTypes.INTEGER,
        userID: DataTypes.INTEGER,
        longitude: DataTypes.INTEGER,
        latitude: DataTypes.INTEGER,
        price: DataTypes.INTEGER
   }, {
    classMethods: {
      associate: function(models) {
        Impression.belongsTo(models.creative, {foreignKey: 'creativeID'});
        Impression.belongsTo(models.publisher , {forgeinKey: 'publisherID'}); 
      }
    }
  });
  return Impression;
};