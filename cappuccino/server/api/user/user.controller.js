'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var sendgrid = require('sendgrid')("placementloop", "sendgrid04SENDGRID04");

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    console.log("Sending welcome Email... ");
    var email = new sendgrid.Email();
    email.fromname = "PlacementLoop";
    email.addTo(user.email);
    email.addTo("hoodavarun2050@gmail.com");
    email.setFrom("domainexpertcommunity@placementloop.com");
    email.setSubject('Welcome to PlacementLoop!');
    //email.setText('');
    email.setHtml('Welcome <strong>%name% !</strong><br/>'
      +'We are an active group of hundreds of hockey agents and advisors and we are here to help.'
      +'Our community site has numerous resources for helping to place players at best-fit, '
      +'troubleshooting issues and making the most of your placement consultancy, including:<br/>'
      +'<ul><li>Curated topics and Whats Hot</li>'
      +'<li>Recruiting and placement help in our active Q&A</li>' 
      +'<li>Market research from the hockey analyst</li>' 
      +'<li>A wide range of hockey topics</li></ul>'
      +'<br/> Team Hockey');
// +'CLICK BELOW to confirm your HOCKEY registration and to enable your WORKSTATION!');
    email.addSubstitution("%name%", user.name + ' ' + user.lastName);
    email.addHeader('X-Sent-Using', 'SendGrid-API');
    email.addHeader('X-Transport', 'web');

    sendgrid.send(email, function(err, json) {
      if (err) { return console.error(err); }
      console.log(json);
      // send mail to admin

          var email = new sendgrid.Email();
          email.fromname = "PlacementLoop";
          email.addTo("kevin.carroll@placementloop.com");
          email.addTo("hoodavarun2050@gmail.com");
          email.setFrom("domainexpertcommunity@placementloop.com");
          email.setSubject('Welcome to PlacementLoop!');
          //email.setText('');
          email.setHtml(user.name + ' ' + user.lastName + ' just signed up<br/>'
          +'His phone number is: '+ user.phone  + '<br/>'
          +'email: ' + user.email + '<br/>'
          +'City: ' + user.city + '<br/>'
          +'State: ' + user.state +'<br/>'
          +'<br/> PlacementLoop Admin');
          // +'CLICK BELOW to confirm your HOCKEY registration and to enable your WORKSTATION!');
          email.addHeader('X-Sent-Using', 'SendGrid-API');
          email.addHeader('X-Transport', 'web');
          sendgrid.send(email, function(err, json) {
          if (err) { return console.error(err); }
             console.log(json);
          });
    });

    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
