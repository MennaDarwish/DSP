var request = require('supertest');
var app 	= require('../../app');
var db		= require('../../models/index');
var should	= require('should');
var fqcap   = require('../../lib/FrequencyCapper');

describe('Frequency Capper', function() {
	describe('Getting the ads not to be displayed to a certain user', function(){
		db.sequelize.sync({force: true}).then(function() {
			db.Impression.create({
				userId: 1,
				creativeId: 1
			}).then(function(createdImpression1) {
				done();
			});
			db.Impression.create({
				userId: 1,
				creativeId: 2
			}).then(function(createdImpression1) {
				done();
			});
			db.Impression.create({
				userId: 1,
				creativeId: 3
			}).then(function(createdImpression1) {
				done();
			});
			db.Impression.create({
				userId: 2,
				creativeId: 1
			}).then(function(createdImpression1) {
				done();
			});
			db.Impression.create({
				userId: 2,
				creativeId: 2
			}).then(function(createdImpression1) {
				done();
			});
			db.Impression.create({
				userId: 1,
				creativeId: 1
			}).then(function(createdImpression1) {
				done();
			});
			db.Impression.create({
				userId: 1,
				creativeId: 1
			}).then(function(createdImpression1) {
				done();
			});
			db.Impression.create({
				userId: 2,
				creativeId: 1
			}).then(function(createdImpression1) {
				done();
			});
			db.Impression.create({
				userId: 1,
				creativeId: 2
			}).then(function(createdImpression1) {
				done();
			});
			db.Impression.create({
				userId: 1,
				creativeId: 2
			}).then(function(createdImpression1) {
				done();
			});
		})
		it('Returns an array containing the ads not to be displayed
	    	if these ads are displayed to this user more than 3 times 
	 		in a period of 24 hours', function(done) {
			freqCap(1)
			.expect([1,2])
			.end(done);
		});
		it('Returns an empty array if there is no ads displayed
			for the user more than 3 times in the last 24 hours', function(done) {
			freqCap(2)
			.expect([])
			.end(done);
		});
	});
});