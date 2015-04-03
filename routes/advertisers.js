var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var passportLocal = require('passport-local');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var localReg = require('../lib/advertiserAuth.js');




passport.use('local-signup', new passportLocal(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
 function(req, username, password, done) {
    localReg.localReg(req.body.firstName,req.body.lastName,req.body.email,username, password)
    
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.firstName);
        req.session.success = 'You are successfully logged in ' + user.firstName + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
   }
    
  ));

 router.route('/Homepage')
  .get(function(req, res) {
    res.render('dspHomepage', {
      title : 'dspHomepage'
    })
  });

  router.route('/Login')
  .get(function(req, res) {
    res.render('Login', {
      title : 'buyer Login'
    })
  });

  router.route('/reg')
  .post(passport.authenticate('local-signup', {
  successRedirect: '/Advertisers/profile',
  failureRedirect: '/Advertisers/Homepage'
  }));

  router.route('/profile')
  .get(function(req, res) {
    res.render('buyerProfile', {
      title : 'buyer Profile'
    });
   
  });

  module.exports = router;