"use strict";
var esDocumentManager = require('../lib/elasticsearch/document_manager');
/**
 * @return {Promise Object} resolved to get indexed_hash;
 *
 */
var asIndexed = function() {
  var _this = this;
  var campaign;
  return _this.getCampaign().then(function(camp) {
    campaign = camp;
    return campaign.getAdvertiser();       
  }).then(function(advertiser){
     var indexedHash = {
        id: _this.dataValues.id,
        tags: campaign.dataValues.tags.split(','),
        advertiserId: advertiser.dataValues.id,
        campaignId: campaign.dataValues.id,
        remainingBudget: campaign.dataValues.budget,
        cpm: _this.dataValues.microUSD,
        redirectUrl: _this.dataValues.redirectUrl,
        imageUrl: _this.dataValues.imageUrl,
        body: _this.dataValues.body,
        width: _this.dataValues.width,
        height: _this.dataValues.height
      }
    return indexedHash;
  });
}
var afterSave = function(record, options) {
 var indexOptions = {index: 'creatives', type: 'creative'};
 return record.asIndexedHash().then(function(indexedHash) {
  return esDocumentManager.indexDocument(indexedHash, indexOptions)
 });
}

module.exports = function(sequelize, DataTypes) {
  var Creative = sequelize.define("Creative", {
    height: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    redirectUrl: DataTypes.STRING,
    microUSD: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Creative.belongsTo(models.Campaign, {foreignKey:'campaignId'});
      }
    },
    instanceMethods: {
      asIndexedHash: asIndexed
    },
    hooks: {
      afterCreate: function(record, options, callback){
        afterSave(record,options).then(function(response) {
          callback(null, response);
        }, function(err) {
          callback(err);
        });
      },
      afterUpdate: function(record, options, callback){
        afterSave(record,options).then(function(response) {
          callback(null, response);
        }, function(err) {
          callback(err);
        });
      },
      afterDestroy: function(record, options, callback) {
        esDocumentManager.deleteDocument(record.id, {index:'creatives', type:'creative'}).then(function(response) {
          callback(null, record);
        }, function(err){
          callback(err);
        });
      }
    }
  });
  return Creative;
};
