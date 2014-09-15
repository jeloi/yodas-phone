// Load the things we need
var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var https = require('https');
var YodaSpeak = require('yoda-speak');

// App config
var config = require('./config');
// Twilio Client
var client = new twilio.RestClient(config.twilio.accountSid, config.twilio.authToken);
// Yoda client from Mashape API
var yoda = new YodaSpeak(config.mashape.apiKey);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/texts', function(req, res) {
	if (twilio.validateExpressRequest(req, config.twilio.authToken, {url: config.twilio.smsWebhook})) {
	    var twiml = new twilio.TwimlResponse();

	    // The text sent in
	    var body = req.param('Body').trim();

	    yoda.convert(body, function(err, result) {
	    	if (!err) {
	    		console.log(result.toString());
	    		twiml.message = result.toString();
	    		res.type('text/xml');
	    		res.send(twiml.toString());
	    	} else {
	    		res.status(err.status || 500);
	    		res.render('error', {
	    		    message: err.message,
	    		    error: err
	    		});
	    	}
	    })
        // var to = req.param('To');
        // var from = req.param('From');
	}
	else {
	    res.send('Hey! You are not twilio.  Buzz off.');
	}
})

module.exports = router;