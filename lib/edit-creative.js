var Creative = require('../models/index.js').Creative;

module.exports = function(req, callback) {
	return Creative.find(req.body.id).then(function(oldCreative) {
		if (!oldCreative) {
			var error = new Error("File not Found");
			error.http_code = 404;
			return callback(error);
		}
		oldCreative.setDataValue('height', req.body.height);
		oldCreative.setDataValue('width', req.body.width);
		oldCreative.setDataValue('redirectUrl', req.body.redirectUrl);
		oldCreative.setDataValue('imageUrl', req.body.imageUrl);
		oldCreative.setDataValue('microUSD', req.body.microUSD);
		oldCreative.save();
		return callback(null, oldCreative);
	}, function(err) {
		return callback(err);
	});
};