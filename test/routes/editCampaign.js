var supertest = require('supertest');
var app = require('../../app.js');
var db = require('../../models/index.js');
var should = require('should');

var campaign = {
	title: 'Footitle',
	budget: 100,
	tags: 'footag1,footag2'
};

describe('Campaign Route', function() {
	describe('Editing a Campaign', function() {
		beforeEach(function(done) {
			db.sequelize().sync({
				force: true
			}).then(function() {
				db.Campaign.create(campaign).then(function() {
					done();
				});
			});

		});
		it('Returns status "updated" if the record was found', function(done) {
			request(app)
				.put('editCampaign/1')
				.send('title=FootitleUpdated&budget=1000tags=footag1,footag2,footag3')
				.expect(function(response) {
					response.body.status.should.be.equal('updated');
				}).end(done);
		});
		it('it returns status code 404 if the record was not found', function(done) {
			request(app)
				.put('editCampaign/50')
				.expect(404, done);
		});

	});
});