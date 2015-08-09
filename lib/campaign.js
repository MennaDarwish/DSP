var Campaign = require('../models/index.js').Campaign;
var Advertiser = require('../models/index.js').Advertiser;
var Q = require('q');

// uploadCampaign takes all the attributes of a campaign and creates a new variable with these attributes then 
//adds this variable in the Campaign model
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

// viewCampaigns takes the advertiser's ID and finds all campaigns belonging to this advertiser
exports.viewCampaigns = function (advertiserID) {
  var deferred = Q.defer();

  Campaign.findAll({where : { advertiserId : advertiserID } }).then(function (result) {
    deferred.resolve(result);
    
  });
  return deferred.promise;
}

exports.viewCampaign = function (campaignID) {
  var deferred = Q.defer();

  Campaign.find({where : { id : campaignID } }).then(function (result) {
    deferred.resolve(result);
    
  });
  return deferred.promise;
}



