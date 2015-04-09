var client           = require('./client');
var creativesMapping = require('./mappings.json')['mappings']['creative']

client.indices.create({
  index: 'creatives',
  body: {
    settings: {
      'number_of_shards': 1,
      'number_of_replicas':1
    },
    mappings: {
      'creative': creativesMapping
    }
  }
},function(err, resp, respcode) {
    console.log(err, resp, respcode);
});

