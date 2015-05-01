var Campaign = require('../models/index.js').Campaign;

module.exports = function(req, callback) {
	console.log('find');
	return Campaign.find(req.body.campaignId).then(function(oldCampaign) {
		console.log('here');
		if (!oldCampaign) {
			var error = new Error("Not Found");
			error.http_code = 404;
			return callback(error);
			console.log(req.body.id);
		} else {
		oldCampaign.setDataValue('title', req.body.title);
		oldCampaign.setDataValue('budget', req.body.budget);
		oldCampaign.setDataValue('tags', req.body.tags);
		oldCampaign.save();
		console.log('updated');
		return callback(null,oldCampaign);
		console.log('habal');
	}
	}, function(err) {
		return callback(err);
	});
};