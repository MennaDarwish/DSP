var express = require('express');

var jsonParser = require('body-parser').json();
var router = express.Router();
var bidder = require('../lib/bidder');
router.route('/')
  .post(jsonParser, function(req, res) {
    var placement = req.body.placement;
    bidder(placement).then(function(response) {
      var winningAd = response.hits.hits[0]._source
      res.status(201).json(winningAd);
    }, function(err) {
      res.writeStatus(400);
    });
  });

module.exports = router;
