var db = require('../models/index');
var sequelize = db.sequelize;
var Creative = db.Creative;
var Campaign = db.Campaign;
var Advertiser = db.Advertiser;
var GeoTarget = db.GeoTarget;
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
    var tags = ['finance', 'tennis', 'cars', 'basketball', 'sports', 'business', 'automotive']
    for(j = 0; j < 100; j++) {
      var campaignTags = []
      tags.forEach(function(tag, index){
        if(j % index == 0) {
          campaignTags.push(tag)
        }
      });
      Campaign.create({
        title: faker.lorem.sentence(),
        budget: faker.random.number(5000),
        advertiserId: 1,
        tags: campaignTags.join('')
      }).then(function(campaign) {
        var geoProperties = {}
        if(campaign.dataValues.id % 3 == 0) geoProperties = {city: faker.address.city(), countryCode: faker.address.country()}
        if(campaign.dataValues.id % 3 == 1) geoProperties = {longitude: faker.address.longitude(), latitude: faker.address.latitude()}
        geoProperties['campaignId'] = campaign.dataValues.id;
        return GeoTarget.create(geoProperties)
      }).then(function(geo) {
        for (i = 0; i < 200; i++) {
          Creative.create({
            campaignId: geo.dataValues.campaignId,
            body: faker.lorem.sentence(),
            height: heights[i%10],
            width: widths[i%10],
            imageUrl: faker.image.imageUrl(),
            redirectUrl: faker.internet.domainName(),
            microUSD: faker.random.number(5) + 1,
          })
        }
      });
    }
  })
});
