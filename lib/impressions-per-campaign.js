var Impression = require('../models/index.js').Impression;
var Creative = require('../models/index.js').Creative;

module.exports = function(req, callback) {
	var arrayOfImpressions = [];
	var myCampaignId = req.body.id;
	return Creative.findAll({
		where: {
			campaignId: 'myCampaignId'
		}
	}).then(function(creatives) {
		if (!creatives) return;
		creatives.forEach(function(creative) {
			var myCreativeId = creative.id;
			return Impression.findAll({
				where: {
					creativeId: 'myCreativeId'
				}
			}, {
				raw: true
			}).then(function(impressions) {
				if (impressions)
					arrayOfImpressions.concat(impressions);
			}, function(err) {
				return callback(err);
			});
		});
		return callback(null, arrayOfImpressions);
	}, function(err) {
		return callback(err);
	});
};