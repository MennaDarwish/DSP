var express = require('express');

var jsonParser = require('body-parser').json();
var router = express.Router();
var bidder = require('../lib/bidder');
router.route('/')
  .post(jsonParser, function(req, res) {
    var placement = req.body.placement;
    var publisherId = req.body.publisherId;
    var userId = req.body.userId;
    bidder(placement).then(function(winningAd) {
      var price = winningAd.price;
      var budget = winningAd.budget;
      var newBudget = budget - price;
     Impression.create({ creativeID: winningAd.id, publisherID: publisherId, userID: userId,
      longitude: winningAd.longitude, latitude: winningAd.latitude, price: price
      })
      res.status(201).json(winningAd);
    }, function(err) {
      res.writeStatus(400);
    });
    
    
    
  (winningAd).data('budget', "newBudget");
  });

module.exports = router;
