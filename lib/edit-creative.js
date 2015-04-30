var Creative = require('../models/index.js');

module.exports = function(req, callback) {
	return Creative.find(req.body.id).then(function(oldCreative) {
		if (!oldCreative) {
			var error = new Error("File not Found");
			error.http_code = 404;
			return callback(error);
		}
		oldCreative.setDataValues('height', req.body.height);
		oldCreative.setDataValues('width', req.body.width);
		oldCreative.setDataValues('redirectUrl', req.body.redirectUrl);
		oldCreative.setDataValues('imageUrl', req.body.imageUrl);
		oldCreative.setDataValues('microUSD', req.body.microUSD);
		oldCreative.save();
	}, function(err) {
		return callback(err);
	});
};