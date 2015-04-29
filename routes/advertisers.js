var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var passportLocal = require('passport-local');
var advertiserAuth = require('../lib/advertiserAuth.js');
var uploadCampaign = require('../lib/uploadCampaign.js');
var viewCampaigns = require('../lib/viewCampaigns.js');

// Use the LocalStrategy within Passport to Register/"signup" advertisers.
passport.use('local-signup', new passportLocal(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    advertiserAuth.localReg(req.body.firstName,req.body.lastName,req.body.domain,username, password)
      .then(function (user) {
        if (user) {
          console.log('LOGGED IN AS: ' + user.firstName);
          req.session.success = 'You are successfully logged in ' + user.firstName + '!';
          done(null, user);
        }
        if (!user) {
          console.log('COULD NOT LOG IN');
          req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
          done(null, user);
        }
      })
      .fail(function (err){
          console.log(err.body);
      });
  }
));

// Use the LocalStrategy within Passport to login advertisers.
passport.use('local-signin', new passportLocal(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    advertiserAuth.localsignin(username, password)
      .then(function (user) {
        if (user) {
          console.log('LOGGED IN AS: ' + user.firstName);
          req.session.success = 'You are successfully logged in ' + user.firstName + '!';
          done(null, user);
        }
        if (!user) {
          console.log('COULD NOT LOG IN');
          req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
          done(null, user);
        }
      })
      .fail(function (err){
        console.log(err.body);
      });
  }
));

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
      uploadCampaign.uploadCampaign(req.body.title,req.body.budget,req.body.tags,req.user.id);

    }
    else {
      res.redirect('/advertisers/Homepage');
    }
  });

router.route('/campaigns')
  .get(function(req, res) {
    if (req.isAuthenticated()){
      viewCampaigns.viewCampaigns(req.user.id).then(function(result){
        res.render('campaign', {
          campaign : result
        })
      })
    }  
    else {
      res.redirect('/advertisers/Homepage');
    }
  });

router.route('/creatives')
  .get(function(req, res) {
    if (req.isAuthenticated()){
      res.render('creative', {
        campaignId : req.body.campaignId
      })
    }  
    else {
      res.redirect('/advertisers/Homepage');
    }
  });
  
module.exports = router;