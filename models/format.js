"use strict";
module.exports = function(sequelize, DataTypes) {
  var format = sequelize.define("Format", {
  name: DataTypes.STRING
  }, {
  classMethods: {
  associate: function(models) {
  Format.belongsToMany(models.creative, {through models.AdFormat, foreignkey: 'formatId'});
  }
  }
  });
  return Format;
}