var express = require('express');

var jsonParser = require('body-parser').json();
var router = express.Router();
var bidder = require('../lib/bidder');
router.route('/')
  .post(jsonParser, function(req, res) {
    var placement = req.body.placement;
    bidder(placement).then(function(winningAd) {
      res.status(201).json(winningAd);
    }, function(err) {
      res.writeStatus(400);
    });
    
    var price = winningAd.price;
    var budget = winningAd.budget;
    var newBudget = budget - price;
    
  (winningAd).data('budget', "newBudget");
  });

module.exports = router;
