var express = require('express');
var Person = require('../models/person.js');
var Relationship = require('../models/relationship.js');
var User = require('../models/user.js');
var config = require('../config');
var Router = express.Router();
var app = express();
var jwt = require('jsonwebtoken');
// app.set('superSecret', config.secret);
console.log("Dekho bc yha");
Router.get('/', function(req, res) {
  console.log("Here is a request of gloify");
  Person.find({}, function(err, user) {
  	console.log("let me check request", user);
  	res.status(200).send({success: true, user: user});
  })
});

Router.post('/signUp', function(req, res) {
	var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function(err, newUser) {
    if (err) throw err;
    console.log("User created successfully");
    res.json({success: true, user: newUser});
  });
});

Router.post('/login', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user){
    if (err)
     throw err;
    if (!user){
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    else if (user) {
      if(user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      }
      else {
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: '30d'
        });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          user: user
        });
      }
    }
  })
});

Router.use(function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

Router.get('/getFamily', function(req, res) {

});

module.exports = Router;