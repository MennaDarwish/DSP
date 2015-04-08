var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Impression = require('../models/index.js').Impression;
var http = require('http');


router.route('/')
  .post(bodyParsedUrl,  function(request, response){ //post request from publisher containing user and ad info

    var width = request.body.width;
    var height = request.body.height;
    var UserId = request.body.userId;
    var PublisherId = request.body.publisherId;
    var data = { //data that will be sent in the request to dsp
      width : width;
      userId : UserId;
      height : heigth;
      
    };

    var options = { // request options
      //host: //DSP,
      //port: //DSP PORT NUMBER,
      path: '/',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(data)
      }
    }

  		  // http request to send data to DSP
  	var req = http.request(options, function(res) {
      res.on('data', function (chunk) { //resp data is sent in the response from dsp
          var body += chunk; 
          var adId = chunk.adId,
          var price = chunk.price, 
          var ad = chunk.ad; //save the response from the DSP in an object

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

      'localhost:9200/campaign/external/cID/_update?pretty' -d '
  {
    "doc": { "budget": newBudget }
  }'
    });
  });

    req.write(data); // send data to dsp
    req.end(); // end of the request

    var impression = {
      publisherId : PublisherId,
      userId : UserId,
      adId : adId;
    }
    //Creating Impression
    Impression.create(impression).then(function(createdImpression){
        res.status(201).json({status : 'created'});
      }), function(err){
        res.status(400).json({status: 'Error', message : 'Something went wrong ' + err});
      });
   //send the DSP's response back to the publisher
    response.send(body);
});

module.exports = router;