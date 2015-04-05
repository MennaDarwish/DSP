var bcrypt = require('bcryptjs');
   var  Q = require('q');
   var Advertiser = require('../models/index.js').Advertiser;

exports.localReg = function (firstName,lastName,domain,username,password) {
  var deferred = Q.defer();
  var hash = bcrypt.hashSync(password, 8);
  var advertiser = {
    "firstName": firstName,
    "lastName": lastName,
    "domain": domain,
    "email": username,
    "password": hash
    
  }
  //check if username is already assigned in our database
  Advertiser.find({ where: {email: username} })
    .then(function (result){ //case in which user already exists in db
      if (result != null) {//username already exists
        console.log('username already exists');
        deferred.resolve(false);
      } 
      else {
        Advertiser.create(advertiser)
          .then(function (createdAdvertiser) {
          console.log("Advertiser: " + createdAdvertiser);
          deferred.resolve(advertiser);
        })
        .fail(function (err) {
          console.log("PUT FAIL:" + err.body);
          deferred.reject(new Error(err.body));
        });
    }
     
  });
return deferred.promise;
};

exports.localsignin = function (username, password) {
  var deferred = Q.defer();
  Advertiser.find({ where: {email: username} })
  .then(function (result){
    if (result !== null) {
      console.log("FOUND USER");
      var hash = result.password;
      console.log(hash);
      console.log(bcrypt.compareSync(password, hash));
    if (bcrypt.compareSync(password, hash)) {
      deferred.resolve(result);
    } 
    else {
      console.log("PASSWORDS NOT MATCH");
      deferred.resolve(false);
      }
    }
    else {
      console.log("COULD NOT FIND USER IN DB FOR SIGNIN");
          deferred.resolve(false);
        }
    });

  return deferred.promise;
};