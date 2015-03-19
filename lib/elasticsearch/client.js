var elasticSearch = require('elasticsearch');
var client        = new elasticSearch.Client({
  host: 'localhost:9200',
  log: 'warning'
});

client.ping({
  requestTimeout: 1000,
  hello: "elasticSearch!"
  }, function(error) {
    if(error) {
      console.error('Elasticsearch cluster is down');
    } else {
      console.log('Elasticsearch running..');
    }
});

module.exports = client;
