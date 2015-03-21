var db = require('../models/index');
var sequelize = db.sequelize;
var Creative = db.Creative;
var Campaign = db.Campaign;
var Advertiser = db.Advertiser;

var faker = require('faker');


sequelize.sync({ logging: console.log, force: true}).then(function() {
  
  var heights = [90, 90, 60, 90, 250, 600, 600, 100, 150, 280]
  var widths = [120, 120, 470, 730, 300, 160, 120, 300, 180, 340]
  // create an advertiser  
  Advertiser.create({
    firstName: 'Foo',
    lastName: 'example',
    email:'foo@squib.co',
    domain: 'www.squib.co',
    password: 'password'
  }).then(function(advertiser) {
    return Campaign.bulkCreate([{
      advertiserId: 1,
      title: 'First campaign',
      budget: 1000,
      tags: 'cars,bikes,motorcycles,automotive'
    },{
      title: 'Second campaign',
      advertiserId: 1,
      budget: 3000,
      tags: 'football,tennis,basketball,sports'
    }, {
      title: 'third campaign',
      budget: 5000,
      advertiserId: 1,
      tags: 'finance,business,mba,banking,accounting'
    }])
  }).then(function() {
     for (i = 0; i < 20000; i++) {
      Creative.create({
        campaignId: (i%3)+1,
        body: faker.lorem.sentence(),
        height: heights[i%10],
        width: widths[i%10],
        imageUrl: faker.image.imageUrl(),
        redirectUrl: faker.internet.domainName(),
        microUSD: faker.random.number(5) + 1,
      })
     }
  })
});
