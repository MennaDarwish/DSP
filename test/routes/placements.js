var esIndexManager = require('../../lib/elasticsearch/index_manager');
var request        = require('supertest');
var should         = require('should');
var app            = require('../../app');
var db             = require('../../models/index');

// Will create 10 campaigns creatives in test db which will be indexed in a testing elasticsearch index.
var campaignsData = [
  {budget: 3000, advertiserId: 1, tags: "finance,business,mba"       },
  {budget: 2000, advertiserId: 1, tags: "sports,tennis"              },
  {budget: 2500, advertiserId: 1, tags: "cars,automotive"            },
  {budget: 5000, advertiserId: 1, tags: "motorcycles,automotive"     },
  {budget: 3500, advertiserId: 1, tags: "football,basketball"        },
  {budget: 5500, advertiserId: 1, tags: "business,stockmarket"       },
  {budget: 5500, advertiserId: 1, tags: "suits,clothe,business"      },
  {budget: 1000, advertiserId: 1, tags: "finance,stockmarket"        },
  {budget: 1000, advertiserId: 1, tags: "football,sports,tennis"     },
  {budget: 3000, advertiserId: 1, tags: "automotive,motorcycles,cars"}
]
var geoTargetData = [
  {city: 'Cairo', country: 'Egypt', campaignId:1}, // city targeting
  {country: 'France', campaignId:2}, // country targeting
  {latitude: -34, longitude: 141, radius: 25, campaignId:3}, //region targeting
  {campaignId: 4}, //no targeting
  {latitude: -34.01, longitude: 141, radius: 25, campaignId: 5}, //region targeting
  {city: 'Rome', country: 'Italy', campaignId: 6}, // city targeting
  {country: 'Egypt', campaignId: 7}, //country targeting
  {country: 'Italy', campaignId: 8}, //country targeting
  {campaignId: 9}, // no targeting
  {latitude: 28, longitude: -21, radius: 50, campaignId:10}
]
var creativesData = [
  {height: 90 , width: 120, microUSD: 3, campaignId: 1 },
  {height: 90 , width: 120, microUSD: 5, campaignId: 2 },
  {height: 120, width: 480, microUSD: 8, campaignId: 3 },
  {height: 600, width: 200, microUSD: 7, campaignId: 4 },
  {height: 120, width: 480, microUSD: 4, campaignId: 5 },
  {height: 730, width: 300, microUSD: 2, campaignId: 6 },
  {height: 120, width: 480, microUSD: 3, campaignId: 7 },
  {height: 600, width: 200, microUSD: 5, campaignId: 8 },
  {height: 90 , width: 270, microUSD: 1, campaignId: 9 },
  {height: 90 , width: 270, microUSD: 9, campaignId: 10}
]

describe('Placements route', function(){
  before(function(done) {
    // data already indexed in elasticsearch for simplicty. testing elasticsearch will be in its own test
    db.sequelize.sync({force: true}).then(function() {
      // create an advertiser
      return db.Advertiser.create({email: 'foo@bar.co', password:'12345678'});
    }).then(function(advertiser) {
      // create the campaigns
      return db.Campaign.bulkCreate(campaignsData);
    }).then(function() {
      // create geoTargets
      return db.GeoTarget.bulkCreate(geoTargetData);
    }).then(function() {
      // create creatives 
      return db.Creative.bulkCreate(creativesData); 
    }).then(function() {
      done();
    });
  });
  describe('Response format', function(){
    var testPlacement = {placement: {tags:["finance","sports", "cars"], latitude: 28, longitude: -21, country: "Egypt", city: "Alexandira", height: 90, width: 270}}

    it('Returns 201 status code', function(done){
      request(app)
        .post('/placements')
        .send(testPlacement)
        .expect(201, done);
    });
     
    it('Returns application/json format', function(done) {
      request(app)
        .post('/placements')
        .send(testPlacement)
        .expect('Content-Type', /application\/json/, done);
    });

    it('Returns the winningAd', function(done) {
      request(app)
        .post('/placements')
        .send(testPlacement)
        .expect(function(res) {
          // 2 ads with right dims i.e 9th and 10th. both with right targeting. 10th higher cpm wins.
          res.body.creative.exist;
          // the id of the creative might differ than its position in the array due to async creation.
          res.body.creative.campaignId.should.be.equal(10);
        }).end(done);
    });

    it('Returns the price paid by the winningAd', function(done) {
      request(app)
        .post('/placements')
        .send(testPlacement)
        .expect(function(res) {
          res.body.creative.price.should.be.greaterThan(0);
        }).end(done);
    });
  });
});


