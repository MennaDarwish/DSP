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
var Campaign = require('../models/index.js').Campaign;
var Creative = require('../models/index.js').Creative;
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
/**
 * author: Salma Ali
 * the following two routes are used to edit a creative
   the first routes redirects to the editing form and the 
   second performs the actual function of editing
 */
router.route('/edit-campaigns')
  .post(function(req, res) {
    if (req.isAuthenticated()) {
      console.log('redirecting' + req.body.campaignId);
      return Campaign.find(req.body.campaignId).then(function(campaign) {
        res.render('editCampaign', {
          campaign: campaign
        });
      });
    } else {
      res.redirect('advertisers/homepage');
    }
  });

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
/**
 * author: Salma Ali
 * the following two routes are used to edit a creative
   the first routes redirects to the editing form and the 
   second performs the actual function of editing
 */
router.route('/creatives/edit-creatives')
  .post(function(req, res) {
    if (req.isAuthenticated()) {
      console.log('redirecting' + req.body.id);
      Creative.find(req.body.id).then(function(creative) {
        res.render('editCreative', {
          creative: creative
        });
      });
    } else {
      res.redirect('advertisers/homepage');
    }
  });

router.route('/creatives/edit-creative')
  .post(function(req, res) {
    if (req.isAuthenticated()) {
      editCreative(req, function(err, data) {
        if (err) {
          if (err.http_code == 404)
            res.sendStatus(404);
          else
            res.render('creatives');
          console.log("Something went wrong with editing");
        } else {
          console.log("data: " + data.campaignId);
          res.redirect('/advertisers/creatives/' + data.campaignId);
        }
      });
    } else {
      res.redirect('advertisers/homepage');
    }
  });
  /**
 * author: Salma Ali
 * route that gets the list of impressions per campaign
   displaying the image of the creative and the title
   of the campaign
 */
router.route('/impressions')
  .post(function(req, res) {
    var creative = [];
    if (req.isAuthenticated()) {
      listImpressions(req, function(err, data) {
        if (err) {
          console.log("Error in listing impressions" + err);
          return;
        }
        data.forEach(function(impression) {
          Creative.find(impression.creativeId).then(function(myCreative) {
            creative = creative.concat(myCreative);
          });
        });
        Campaign.find(req.body.id).then(function(campaign) {
          res.render('impressions', {
            impressions: data,
            campaign: campagin,
            creative: creative
          });
        });
      });
    } else {
      res.redirect('advertisers/homepage');
    }
  });

router.route('/campaigns')
  .post(function(req, res) {
    if (req.isAuthenticated()) {
      uploadCampaign.uploadCampaign(req.body.title, req.body.budget, req.body.tags, req.user.id);
      console.log(req.user.id);
      res.redirect('/advertisers/campaigns');

    } else {
      res.redirect('/advertisers/homepage');
    }
  });

router.route('/campaigns')
  .get(function(req, res) {
    if (req.isAuthenticated()) {
      viewCampaigns.viewCampaigns(req.user.id).then(function(result) {
        res.render('campaign', {
          campaign: result
        });
      });
    } else {
      res.redirect('/advertisers/homepage');
    }
  });

router.route('/formcreatives')
  .post(function(req, res) {
    if (req.isAuthenticated()) {
      res.render('creative', {
        campaignId: req.body.campaignId
      });
    } else {
      res.redirect('/advertisers/homepage');
    }
  });

router.route('/creatives')
  .post(function(req, res) {
    if (req.isAuthenticated()) {
      creative.uploadCreative(req.body.height, req.body.width, req.body.imageUrl,
        req.body.redirectUrl, req.body.microUSD, req.body.campaignId);
      res.redirect('/advertisers/campaigns');
    } else {
      res.redirect('/advertisers/homepage');
    }
  });

router.route('/viewcreatives')
  .post(function(req, res) {
    if (req.isAuthenticated()) {
      creative.viewCreatives(req.body.campaignId).then(function(result) {
        res.render('viewcreatives', {
          creative: result
        });
      });
    } else {
      res.redirect('/advertisers/homepage');
    }
  });
  /**
 * author: Salma Ali
 * the route displays the creatives after an edit has occurred
 */
router.route('/creatives/:id')
  .get(function(req, res) {
    if (req.isAuthenticated()) {
      console.log("params: " + req.params.id);
      creative.viewCreatives(req.params.id).then(function(result) {
        res.render('viewcreatives', {
          creative: result
        });
      });
    } else {
      res.redirect('/advertisers/homepage');
    }
  });

module.exports = router;