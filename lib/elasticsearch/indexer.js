var client = require('./client');
var _      = require('underscore');

/**
 * @param {Object} attribures, attributes of document to be indexed
 * @param {Object} options, index options .i.e document type, and index name
 * @return {Promise Object} promise object returned by client.index
 */

module.exports = function(attributes, options) {
  var _id = attributes.id
  var fields = _.omit(attributes, 'id');
  // promise
  return client.index({  
    index: options.index,
    type: options.type,
    id: _id,
    body: fields
  });
}
