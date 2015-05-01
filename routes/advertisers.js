var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var passportLocal = require('passport-local');
var advertiserAuth = require('../lib/advertiserAuth.js');
var editCampaign = require('../lib/edit-campaign.js');
var editCreative = require('../lib/edit-creative.js');
var listImpressions = require('../lib/impressions-per-campaign.js');
var localStrategy = require('../lib/localStrategy.js');
var uploadCampaign = require('../lib/uploadCampaign.js');
var viewCampaigns = require('../lib/viewCampaigns.js');
var creative = require('../lib/creative.js');
// Use the LocalStrategy within Passport to Register/"signup" advertisers.
passport.use('local-signup', new passportLocal({
    passReqToCallback: true
  }, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    advertiserAuth.localReg(req.body.firstName, req.body.lastName, req.body.domain, username, password)
      .then(function(user) {
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
      .fail(function(err) {
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
      title: 'dspHomepage'
    });
  });

router.route('/reg')
  .post(passport.authenticate('local-signup', {
    successRedirect: '/advertisers/profile',
    failureRedirect: '/advertisers/Homepage'
  }));

router.route('/login')
  .get(function(req, res) {
    res.render('Login', {
      title: 'buyer Login'
    });
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
        title: 'buyer Profile'
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

router.route('/edit-campaigns')
.post(function(req,res){
  if(req.isAuthenticated()){
    console.log('redirecting' + req.body.campaignId);
    res.render('editCampaign', {campaignId: req.body.campaignId});
  } else {
    res.redirect('advertisers/homepage');
  }
})

router.route('/edit-campaign')
  .post(function(req, res) {
    if (req.isAuthenticated()) {
      editCampaign(req, function(err, data) {
        if (err) {
          if (err.http_code == 404)
            res.sendStatus(404);
          else
          res.render('campaigns');
          console.log("Something went wrong with editing");
        } else {
          res.redirect('campaigns');
        }
      });
    } else {
      res.redirect('advertisers/homepage');
    }
  });


router.route('/creatives')
  .put(function(req, res) {
    if (req.isAuthenticated()) {
      editCreative(req, function(err, data) {
        if (err) {
          if (err.http_code == 404)
            res.sendStatus(404);
          else
            res.sendStatus(400).json({
              status: "Error",
              message: "Something went wrong!" + err
            });
          res.render('creatives');
          console.log("Something went wrong with editing");
        } else {
          res.sendStatus(200).json({
            status: "updated"
          });
          res.redirect('advertisers/creatives');
        }
      });
    } else {
      res.redirect('advertisers/homepage');
    }
  });
router.route('/campaign/impressions')
  .get(function(req, res) {
    if (req.isAuthenticated()) {
      listImpressions(req, function(err, data) {
        if (err) {
          console.log("Error in listing impressions" + err);
          return;
        }
        res.render('impression', {
          impressions: data
        });
      });
    } else {
      res.redirect('advertisers/homepage');
    }
  });

router.route('/campaigns')
  .post(function(req, res) {
    if (req.isAuthenticated()){
      uploadCampaign.uploadCampaign(req.body.title,req.body.budget,req.body.tags,req.user.id);
      console.log(req.user.id);
      res.redirect('/advertisers/campaigns');

    }
    else {
      res.redirect('/advertisers/homepage');
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
      res.redirect('/advertisers/campaigns');
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