var client = require('./elasticsearch/client');

module.exports = function(placement) {
  //construct should array
  
  var shouldArray = [];
  var interests = placement.tags;
  interests.forEach(function(interest){
    var shouldObject = {
      term: { tags: interest} 
    }
    shouldArray.push(shouldObject);
  });
 return client.search({
    index: 'creatives',
    type: 'creative',
    body: {
      query: {
        function_score: {
          filter: {
            bool: {
             should: shouldArray,
             must: [
              {term: {width: placement.width}},
              {term: {height: placement.height}}
             ]
            }
          },
          functions:[
            {
              script_score: {
                script: "_score*doc[\"cpm\"].value"
              }
            }
          ]
        }
      }
    }
 })
}
