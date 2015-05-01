var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('../lib/localStrategy.js');
var uploadCampaign = require('../lib/uploadCampaign.js');
var viewCampaigns = require('../lib/viewCampaigns.js');
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
    res.render('homepage', {
      title : 'dspHomepage'
    })
  });

router.route('/registration')
  .get(function(req, res) {
    res.render('registration', {
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
      viewCampaigns.viewCampaigns(req.user.id).then(function(result){
        res.render('profile', {
          campaigns : result,
          user : req.user
        })
      })
    } else {
        res.redirect('/advertisers/homepage');
      }
  });

router.route('/logout')
  .get(function(req, res) {
    req.logout();
    res.redirect('/advertisers/homepage');
  });

router.route('/campaignform')
  .get(function(req, res) {
    if (req.isAuthenticated()) {
      viewCampaigns.viewCampaigns(req.user.id).then(function(result){
        res.render('campaignform', {
          campaigns : result,
          user : req.user
        })
      })
      
    } else {
        res.redirect('/advertisers/homepage');
      }
  });






router.route('/uploadcampaign')
  .post(function(req, res) {
    if (req.isAuthenticated()){
      uploadCampaign.uploadCampaign(req.body.title,req.body.budget,req.body.tags,req.user.id);
      console.log(req.user.id);
      res.redirect('/advertisers/profile');

    }
    else {
      res.redirect('/advertisers/homepage');
    }
  });

// router.route('/campaigns')
//   .get(function(req, res) {
//     if (req.isAuthenticated()){
//       viewCampaigns.viewCampaigns(req.user.id).then(function(result){
//         res.render('campaign', {
//           campaign : result
//         })
//       })
//     }  
//     else {
//       res.redirect('/advertisers/homepage');
//     }
//   });

router.route('/viewcampaign')
  .post(function(req, res) {
    if (req.isAuthenticated()){
      viewCampaigns.viewCampaigns(req.user.id).then(function(campaigns){
        var camps = campaigns;
        viewCampaigns.viewCampaign(req.body.campaignId).then(function(campaign){
          var camp = campaign;
          creative.viewCreatives(req.body.campaignId).then(function(creatives){
            res.render('campaign', {
              campaign : camp,
              campaigns : camps,
              creatives : creatives,
              user : req.user

            })
          })
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
    viewCampaigns.viewCampaigns(req.user.id).then(function(campaigns){
      res.render('creativeform', {
        campaignId : req.body.campaignId,
        campaigns : campaigns,
        user : req.user
      })
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