var Impression = require('../models/index.js').Impression;
var Creative = require('../models/index.js').Creative;

module.exports = function(req) {
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
			Impression.findAll({
				where: {
					creativeId: 'myCreativeId'
				}
			}, {
				raw: true
			}).then(function(impressions) {
				if (impressions)
					arrayOfImpressions.concat(impressions);
			});
		});
		return arrayOfImpressions;
	});
};