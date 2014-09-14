// Load the things we need
var express = require('express');
var router = express.Router();
var twilio = require('twilio');

// App Configs
var configs = require('./configs');
// Twilio Client
var client = new twilio.RestClient(configs.twilio.accountSid, configs.twilio.authToken);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});



module.exports = router;