var express = require('express');
var bodyParser = require('body-parser');
var urlEncoded = bodyParser.urlencoded({
	extended: false
});
router = express.Router();
var Campaign = require('../models/index.js').Campaign;


router.route('/:id')
	.put(urlEncoded, function(req, res) {
		Campaign.find(req.params.id).then(function(oldCampaign) {
			if (!oldCampaign) res.sendStatus(404);
			oldCampaign.setDataValues('title', req.body.title);
			oldCampaign.setDataValues('budget', req.body.budget);
			oldCampaign.setDataValues('tags', req.body.tags);
			oldCampaign.save();
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