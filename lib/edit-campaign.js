var Campaign = require('../models/index.js').Campaign;

module.exports = function(req, callback) {
	return Campaign.find(req.body.id).then(function(oldCampaign) {
		if (!oldCampaign) {
			var error = new Error("File not Found");
			error.http_code = 404;
			return callback(error);
		}
		oldCampaign.setDataValue('title', req.body.title);
		oldCampaign.setDataValue('budget', req.body.budget);
		oldCampaign.setDataValue('tags', req.body.tags);
		oldCampaign.save();
		return callback(null, oldCampaign);
	}, function(err) {
		return callback(err);
	});
};