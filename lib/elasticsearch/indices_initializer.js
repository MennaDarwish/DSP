
var client = require('./client');
client.indices.create({
  index: 'creatives',
  body: {
    settings: {
      'number_of_shards': 1,
      'number_of_replicas':1
    },
    mappings: {
      'creative': {
        'properties': {
          'tags': {'type': 'string', 'index_name': 'tag'},
          'advertiserId': {'type': 'integer'},
          'campaignId': {'type': 'integer'},
          'remainingBudget': {'type': 'integer'},
          'cpm': {'type': 'integer'},
          'redirectUrl': {'type': 'string'},
          'imageUrl': {'type': 'string'},
          'body': {'type': 'string'},
          'width': {'type': 'integer'},
          'height': {'type': 'integer'},
          'targetOrigin': {'type': 'geo_point'},
          'targetCountry': {'type': 'string'},
          'targetCity': {'type': 'string'},
          'targetRadius': {'type': 'integer'}
        }
      }
    }
  }
},function(err, resp, respcode) {
    console.log(err, resp, respcode);
});
