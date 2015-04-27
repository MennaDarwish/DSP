var supertest = require('supertest');
var app = require('../../app.js');
var db = require('../../models/index.js');
var should = require('should');

var creative = {
	advertiserId: 1,
	campaignId: 1,
	microUSD: 'fooUsd',
	redirectUrl: 'www.domain.com',
	imageUrl: 'foo.img',
	width: 100,
	height: 200
};

var advertiser = {
	firstName: 'fooName',
	lastName: 'fooLastName',
	email: 'name@example.com',
	domain: 'FOOdomain',
	password: 'FOOpassword'
};

var campaign = {
	title: 'Footitle',
	budget: 100,
	tags: 'footag1,footag2'
};

describe('editCreative route', function() {
	describe('An advertiser should be able to edit an Ad', function() {
		beforeEach(function(done) {
			db.sequelize().sync({
				force: true
			}).then(function() {
				db.Advertiser.create(advertiser).then(function() {
					db.Campaign.create(campaign).then(function() {
						db.Creative.create(creative).then(function() {
							done();
						});
					});
				});
			});
		});
	});
	it('should return a message "updated" if the record was found', function() {
		request(app)
			.put('editCreative/1')
			.send('height=200&width=400&microUSD=usd&redirectUrl=url&imageUrl=imUrl')
			.expect(200, function(res) {
				res.body.status.should.be.equal('updated');
			}).end(done);
	});
	it('Should return status code 404 if record was not found', function() {
		request(app)
			.put('editCreative/40')
			.expect(404, done);
	});
});