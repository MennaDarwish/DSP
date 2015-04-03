var express = require('express');
var router = express.Router();

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

  router.route('/profile')
  .get(function(req, res) {
    res.render('buyerProfile', {
      title : 'buyer Profile'
    });
   
  });

  module.exports = router;