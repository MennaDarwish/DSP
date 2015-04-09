var client           = require('./client');
var creativesMapping = require('./mappings.json')['mappings']['creative']

var createIndex = function() {
  return client.indices.create({
    index: 'creatives',
    body: {
      settings: {
      'number_of_shards': 1,
      'number_of_replicas':0
      },
      mappings: {
      'creative': creativesMapping
      }
    }
  })
}

var deleteIndex = function() {
  return client.indices.delete({
    index: 'creatives'
  })
}
module.exports.recreate = function() {
  return deleteIndex().then(function() {
    return createIndex(); 
  })
}

module.exports.create = createIndex;
module.exports.delete = deleteIndex;
