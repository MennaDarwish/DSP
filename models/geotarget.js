"use strict";
var _ = require('underscore');
module.exports = function(sequelize, DataTypes) {
  var GeoTarget = sequelize.define("GeoTarget", {
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    radius: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        GeoTarget.belongsTo(models.Campaign, {foreignKey: 'campaignId'})
      }
    },

      instanceMethods: {
        asIndexedHash: function() {
         var wantedAttributes = ['radius', 'longitude', 'latitude', 'country', 'city'];
         var indexedHash =  _.omit(this.dataValues, function(value, key, object) {
            return _.isNull(value) || !_.contains(wantedAttributes, key);
         });
         // format the object into elasticsearch mapping
         
         var indexed = {}
         if(_.has(indexedHash, 'radius')) {
          indexed['targetRadius'] = indexedHash['radius'];
          indexed['targetOrigin'] = { lat: indexedHash['latitude'], lon: indexedHash['longitude']}
         }else if(_.has(indexedHash, 'country')) {
          indexed['targetCountry'] = indexedHash['country'];
          indexed['targetCity'] = indexedHash['city']
         }
         return indexed
        }
      }
    

  });
  return GeoTarget;
};
