var client = require('./elasticsearch/client');

module.exports = function(placement) {
  //construct should array 
  var placementCity = (placement.city || "").toLowerCase();
  var placementCountry = (placement.country || "").toLowerCase();
  var tags = placement.tags.join(" ");
  return client.search({
    index: 'creatives',
    type: 'creative',
    body: { 
      // we only need the highest 2 creatives.
      "size": 2,
      "query": {
        "function_score": {
          "field_value_factor": {
            "field": "cpm", 
            "factor": 10
          }, 
          "query": {
            "bool": {
              "must": {
                "match": {
                  // full-text search utilized to score relevance of tags.
                  "tags": tags
                }
              },
              // a creative should match atleast one of the conditions in the should array
              "should": [
                {
                  // match exact city and country in placement.
                  "constant_score": {
                    "filter": {
                      "and": [
                        {"term": {"targetCountry": placementCountry} },
                        {"term": {"targetCity": placementCity} }
                       ]
                     },
                     "boost": 3
                   }
                },
                {
                  // match exact country and does not target a certain city.
                  "constant_score": {
                    "filter": {
                      "and": [
                        {"term": {"targetCountry": placementCountry}},
                        {"missing":{"field": "targetCity" }}
                      ]
                    },
                    "boost": 2
                  }
                },
                {
                  // match a certain area covered by a certain radius from a certian origin.
                  "constant_score": {
                    "filter": {
                      "and": [
                      {"missing": {"field": "targetCountry" }},
                      {"missing": {"field": "targetCity" }},
                      {
                        "script": {
                          "params": {
                            "lat": placement.latitude || 0.0,
                            "lon": placement.longitude || 0.0
                          },
                          "script": "!doc['targetOrigin'].empty && doc['targetOrigin'].distanceInKm(lat,lon) <= doc['targetRadius'].value"
                        }
                      }
                      ]
                    },
                    "boost": 4
                  }
                },
                {
                  // no geolocation targeting at all
                  "constant_score": {
                    "filter": {
                      "and":[
                      {"missing" :{"field": "targetCountry"}},
                      {"missing" : {"field": "targetCity"}},  
                      {"missing" : {"field": "targetOrigin"}}
                      ]
                    },
                    "boost": 1.2
                  }
                }
              ], "minimum_number_should_match": 1
            }
          }
        }
      }
    }
  });
}
