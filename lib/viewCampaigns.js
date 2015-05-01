var Campaign = require('../models/index.js').Campaign;
var Advertiser = require('../models/index.js').Advertiser;
var Q = require('q');

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