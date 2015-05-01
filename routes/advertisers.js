var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('../lib/localStrategy.js');
var campaign = require('../lib/campaign.js');

var creative = require('../lib/creative.js');

// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log('serializing ' + user.firstName);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('deserializing ' + obj);
  done(null, obj);
});

router.route('/homepage')
  .get(function(req, res) {
    res.render('dspHomepage', {
      title : 'dspHomepage'
    })
  });

router.route('/reg')
  .post(passport.authenticate('local-signup', {
    successRedirect: '/advertisers/profile',
    failureRedirect: '/advertisers/Homepage'
  }));

router.route('/login')
  .get(function(req, res) {
    res.render('Login', {
      title : 'buyer Login'
    })
  });

router.route('/login')
  .post(passport.authenticate('local-signin', {
    successRedirect: '/advertisers/profile',
    failureRedirect: '/advertisers/login'
  }));

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

router.route('/logout')
  .get(function(req, res) {
    req.logout();
    res.redirect('/advertisers/homepage');
  });

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