var Campaign = require('../models/index.js').Campaign;
var Advertiser = require('../models/index.js').Advertiser;
var Q = require('q');

exports.uploadCampaign = function (title,budget,tags,advertiserId){
  var campaign = {
    "title" : title,
	"budget" : budget,
	"tags" : tags,
	"advertiserId" : advertiserId
	}
  Campaign.create(campaign)
    .then(function (createdCampaign) {
      console.log("Campaign: " + JSON.stringify(createdCampaign));
    });
}

exports.viewCampaigns = function (advertiserID) {
  var deferred = Q.defer();

  Campaign.findAll({where : { advertiserId : advertiserID } }).then(function (result) {
    deferred.resolve(result);
    
  });
  return deferred.promise;
}


