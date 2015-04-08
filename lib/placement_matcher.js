var client = require('./elasticsearch/client');

module.exports = function(placement) {
  //construct should array
  
  var interestsFiltersArray = [];
  var interests = placement.tags;
  interests.forEach(function(interest){
    var shouldObject = {
      term: { tags: interest} 
    }
    interestsFiltersArray.push(shouldObject);
  });
  var placementCity = (placement.city || "").toLowerCase();
  var placementCountry = (placement.country || "").toLowerCase();
 return client.search({
    index: 'creatives',
    type: 'creative',
    //we only need the highest 2 creatives to calculate the price for the winning creative.
    body: {
      query: {
        function_score: {
          filter: {
            bool: {
              // each document should match ANY of the location condtions AND the ANY of the tags associated with the placement 
              should: [
                {and:[
                  {or:[
                    {
                      and: [
                        {term: {targetCountry: placementCountry} },
                        {script: {script: "doc['targetCity'].empty"}}
                      ]
                    },
                    {
                      and: [
                        { term: {targetCountry: placementCountry} },
                        { term: { targetCity: placementCity} }
                      ]
                    },
                    {
                      and: [
                        {
                          script: {
                            params: { "pLat": placement.latitude || 0.0, "pLon": placement.longitude || 0.0 },
                            script: "!doc['targetOrigin'].empty && !doc['targetRadius'].empty && doc['targetOrigin'].distanceInKm(pLat, pLon) <= doc['targetRadius'].value"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  or: interestsFiltersArray
                }
              ] 
            } 
           ],
              must: [
              // each document mush match the exact width and height in the placement
              //TODO: created standard adTypes which will reduce this to one condition only.
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
