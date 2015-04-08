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
    var adID = winningAd.id;
    var price = winningAd.price;
    client.search({
    index: 'index',
    type: 'creative',
    body: {
      query: {
        match: {
          id: adID
        }
      }
    }
  }).then(function (resp) {
     var hits = resp.hits.hits;
      var cID = hits.get(campaignId);
      client.search({
    index: 'index',
    type: 'campaign',
    body: {
      query: {
        match: {
          id: cID
        }
      }
    }
  }).then(function (resp) {
     var hits = resp.hits.hits;
      var budget = hits.get(budget);
      var newBudget = budget - price ;
      
  }, function (err) {
      console.trace(err.message);
  });
  }, function (err) {
      console.trace(err.message);
  });
  (winningAd).data('budget', "newBudget");
  });

module.exports = router;
