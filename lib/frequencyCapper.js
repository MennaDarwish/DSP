var Impression = require('../models/index.js').Impression;
var Creative   = require('../models/index.js').Creative;

/**
 * author: Mohamed Marwan
 * this function gets the ads that cannot be displayed
 to a certain user because they were displayed to him 3
 times in the past 24 hours.
 * @param {Number} userId
 * @return {Array} creatives
 */
module.exports.freqCap = function (userId){
	var currentDate = new Date();
	var yestDate = currentDate.Date()-1;
	var creatives[];

	return Impression.findAll({
		where: {
			userId: userId,
			createdAt: {
				gte: yestDate
			}
		}
	}).then(function(impressions) {
		impressions.forEach(function(x){
			var id = x['creativeId'];
			Impression.findAll({
				where: {
					userId: userId,
					creativeId: id
				}
			}).then(function (result) {
				if(result.count >= 3){
					creatives.push(id);
				};
			});
		});
	});
};