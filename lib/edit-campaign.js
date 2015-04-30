var Campaign = require('../models/index.js');

module.exports = function(req, callback) {
	return Campaign.find(req.body.id).then(function(oldCampaign) {
		if (!oldCampaign) {
			var error = new Error("File not Found");
			error.http_code = 404;
			return callback(error);
		}
		oldCampaign.setDataValues('title', req.body.title);
		oldCampaign.setDataValues('budget', req.body.budget);
		oldCampaign.setDataValues('tags', req.body.tags);
		oldCampaign.save();
	}, function(err) {
		return callback(err);
	});
};