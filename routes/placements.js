var express = require('express');

var jsonParser = require('body-parser').json();
var router = express.Router();
var bidder = require('../lib/bidder');
router.route('/')
  .post(jsonParser, function(req, res) {
    var placement = req.body.placement;
    bidder(placement).then(function(winningAd) {
      res.status(201).json({creative: winningAd});
    }, function(err) {
      console.log(err);
      res.writeStatus(400);
    });
  });

module.exports = router;
