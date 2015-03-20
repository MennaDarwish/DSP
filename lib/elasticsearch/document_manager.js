var client = require('./client');
var _      = require('underscore');

/**
 * @param {Object} attribures, attributes of document to be indexed
 * @param {Object} options, index options .i.e document type, and index name
 * @return {Promise Object} promise object returned by client.index
 */

module.exports.indexDocument = function(attributes, options) {
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
 /**
  * @param {Integer} id, id of the document to be deleted
  * @param {Object} options, index options .i.e document type, index name
  * @return {Promise Object} promise object returned by client.delete. resolved to give deleting response
  */
module.exports.deleteDocument = function(id, options) {
  return client.delete({
    index: options.index,
    type: options.type,
    id: id
  });
}
