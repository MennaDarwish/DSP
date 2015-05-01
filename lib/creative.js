var Creative = require('../models/index.js').Creative;
var Q = require('q');

// uploadCreative takes all the attributes of a creative and creates a new variable with these attributes then 
//adds this variable in the Creative model
exports.uploadCreative = function (height,width,imageUrl,redirectUrl,microUSD,campaignId){
  var creative = {
    "campaignId" : campaignId,
    "height" : height,
  	"width" : width,
  	"imageUrl" : imageUrl,
  	"redirectUrl" : redirectUrl,
    "microUSD" : microUSD
  }
  Creative.create(creative)
    .then(function (createdCreative) {
      console.log("Creative: " + JSON.stringify(createdCreative));
    });
}

// viewCreatives takes the campaign's ID and finds all creatives belonging to this campaign
exports.viewCreatives= function (campaignID) {
  var deferred = Q.defer();

  Creative.findAll({where : { campaignId : campaignID } }).then(function (result) {
    deferred.resolve(result);
    
  });
  return deferred.promise;
}