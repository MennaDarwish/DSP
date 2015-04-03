var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var passportLocal = require('passport-local');
var cookieParser = require('cookie-parser');
var session = require('express-session');

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
  successRedirect: '/Advertiser/profile',
  failureRedirect: '/Advertiser/Login'
  }));

  router.route('/profile')
  .get(function(req, res) {
    res.render('buyerProfile', {
      title : 'buyer Profile'
    });
   
  });

  module.exports = router;