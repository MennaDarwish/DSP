var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('../lib/localStrategy.js');
var campaign = require('../lib/campaign.js');

var creative = require('../lib/creative.js');

// Passport session setup.
//serializing the user into the session
passport.serializeUser(function(user, done) {
  console.log('serializing ' + user.firstName);
  done(null, user);
});

// deserializing the user from the session
passport.deserializeUser(function(obj, done) {
  console.log('deserializing ' + obj);
  done(null, obj);
});

//when a http get request is sent to advertisers/homepage
//dspHomepage is rendered
router.route('/homepage')
  .get(function(req, res) {
    res.render('dspHomepage', {
      title : 'dspHomepage'
    })
  });

//when a post http request is sent to advertisers/reg
//passport is used to register the advertiser
router.route('/reg')
  .post(passport.authenticate('local-signup', {
    successRedirect: '/advertisers/profile',
    failureRedirect: '/advertisers/Homepage'
  }));


//when a http get request is sent to advertisers/login
//the Login.ejs view is rendered
router.route('/login')
  .get(function(req, res) {
    res.render('Login', {
      title : 'buyer Login'
    })
  });

//when a http post request is sent to advertisers/login
//passport is used to login the advertiser
router.route('/login')
  .post(passport.authenticate('local-signin', {
    successRedirect: '/advertisers/profile',
    failureRedirect: '/advertisers/login'
  }));

//when a http get request is sent to advertisers/profile
//the profile.ejs view is rendered
router.route('/profile')
  .get(function(req, res) {
    if (req.isAuthenticated()) {
      res.render('buyerProfile', {
        title : 'buyer Profile'
      });
    } else {
        res.redirect('/advertisers/homepage');
      }
  });

//when a http get request is sent to advertisers/logout
//the user will be redirected to advertisers/homepage
router.route('/logout')
  .get(function(req, res) {
    req.logout();
    res.redirect('/advertisers/homepage');
  });

//when a http post request is sent to advertisers/campaign
//campaign.js module is used ,the router calls uploadCampaign function with the campaign attributes in the request body
router.route('/campaigns')
  .post(function(req, res) {
    if (req.isAuthenticated()){
      campaign.uploadCampaign(req.body.title,req.body.budget,req.body.tags,req.user.id);
      console.log(req.user.id);
      res.redirect('/advertisers/profile');

    }
    else {
      res.redirect('/advertisers/homepage');
    }
  });

//when a http get request is sent to advertisers/campaigns
//the function view campaign in the campaign.js module is called with the advertiser's ID which responds with a promise
//that has all the campaigns
//belonging to this advertiser
//and then the campaigns are sent to the campaign view
router.route('/campaigns')
  .get(function(req, res) {
    if (req.isAuthenticated()){
      campaign.viewCampaigns(req.user.id).then(function(result){
        res.render('campaign', {
          campaign : result
        })
      })
    }  
    else {
      res.redirect('/advertisers/homepage');
    }
  });


//when a http post request is sent to advertisers/formcreatives
//the view creative is rendered and the campaign's id extracted from the body of the request is sent to the view
router.route('/formcreatives')
  .post(function(req, res) {
    if (req.isAuthenticated()){
      res.render('creative', {
        campaignId : req.body.campaignId
      })
    }  
    else {
      res.redirect('/advertisers/homepage');
    }
  });

//when a http post request is sent to advertisers/creatives
//uploadCreative is called with the creatives attributes extracted from the body of the post request
//and then the user is redirected to advertisers/profile
router.route('/creatives')
  .post(function(req, res) {
    if (req.isAuthenticated()){
      creative.uploadCreative(req.body.height,req.body.width,req.body.imageUrl,
      req.body.redirectUrl,req.body.microUSD,req.body.campaignId);
      res.redirect('/advertisers/profile');
    }  
    else {
      res.redirect('/advertisers/homepage');
    }
  });


//when http post request is sent to advertisers/viewcreatives
//viewCreatives function in the creative module is called with the campaign's id extracted from the body
//which returns a promise that has all the creatives belonging to this campaign
//and the creatives will be sent to viewcreatives view which will be rendered 
router.route('/viewcreatives')
  .post(function(req, res) {
    if (req.isAuthenticated()){
      creative.viewCreatives(req.body.campaignId).then(function(result){
        res.render('viewcreatives', {
          creative : result
        })
      })
    }  
    else {
      res.redirect('/advertisers/homepage');
    }
  });
  
module.exports = router;