var express = require('express');
var bodyParser = require('body-parser');
var urlEncoded = bodyParser.urlEncoded({
	extended: false
});
var Creative = require('..models/index.js').Creative;
router = express.Router();


router.route('/:id')
	.put(urlEncoded, function(req, res) {
		Creative.find(req.params.id).then(function(oldCreative) {
			if (!oldCreative) res.sendStatus(404);
			oldCreative.setDataValues('height', req.body.height);
			oldCreative.setDataValues('width', req.body.height);
			oldCreative.setDataValues('redirectUrl', req.body.redirectUrl);
			oldCreative.setDataValues('imageUrl', req.body.imageUrl);
			oldCreative.setDataValues('microUSD', req.body.microUSD);
			oldCreative.save();
			res.status(200).json({
				status: 'updated'
			});
		}, function(err) {
			res.status(400).json({
				status: 'ERROR',
				message: 'Something went wrong' + err
			});
		});
	});


module.exports = router;