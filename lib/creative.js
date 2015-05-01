var Creative = require('../models/index.js').Creative;
var Q = require('q');


exports.uploadCreative = function(height, width, imageUrl, redirectUrl, microUSD, campaignId) {
  var creative = {
    "campaignId": campaignId,
    "height": height,
    "width": width,
    "imageUrl": imageUrl,
    "redirectUrl": redirectUrl,
    "microUSD": microUSD
  }
  Creative.create(creative)
    .then(function(createdCreative) {
      console.log("Creative: " + JSON.stringify(createdCreative));
    });
}

exports.viewCreatives = function(campaignID) {
  var deferred = Q.defer();

  Creative.findAll({
    where: {
      campaignId: campaignID
    }
  }).then(function(result) {
    deferred.resolve(result);

  });
  return deferred.promise;
}