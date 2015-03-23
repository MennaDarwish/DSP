
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
    //we only need the highest 2 creatives to calculate the price for the winning creative.
    size: 2,
    body: {
      query: {
        function_score: {
          filter: {
            bool: {
            //each document should match ATLEAST one object from the should array, in this case on of the tags in the placement
             should: shouldArray,
             must: [
             // each document mush match the exact width and height in the placement
             // TODO: created standard adTypes which will reduce this to one condition only.
              {term: {width: placement.width}},
              {term: {height: placement.height}}
             ]
            }
          },
          functions:[
            {
              script_score: {
                // the score depends on how matching is this creative with the placement, and how much does this creative cost.
                script: "_score*doc[\"cpm\"].value"
              }
            }
          ]
        }
      }
    }
 })
}
