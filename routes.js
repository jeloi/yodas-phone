// Load the things we need
var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var https = require('https');
var moment = require('moment');
var _ = require('underscore');

var YodaSpeak = require('yoda-speak');

// App config
var config = require('./config');
// Twilio Client
var client = new twilio.RestClient(config.twilio.accountSid, config.twilio.authToken);
// Yoda client from Mashape API
var yoda = new YodaSpeak(config.mashape.apiKey);

// Get incoming message history, limited to last 30 in the last 2 days
router.get('/history', function(req, res) {
	if (twilio.validateExpressRequest(req, config.twilio.authToken, {url: config.twilio.smsWebhook})) {
		var twoDaysAgo = moment().subtract(2, 'days').format("YYYY-MM-DD");
		console.log(twoDaysAgo);
		client.messages.list({"DateSent>": twoDaysAgo, To: config.twilio.to}, function(err, data) {
			var list = _.first(data.messages, 30);
		    res.send(list);
		});
	}
	else {
	    res.send('Hey! You are not twilio.  Buzz off.');
	}
})

router.post('/texts', function(req, res) {
	if (twilio.validateExpressRequest(req, config.twilio.authToken, {url: config.twilio.smsWebhook})) {
	    var twiml = new twilio.TwimlResponse();

	    // The text sent in to Twilio
	    var body = req.param('Body').trim();

	    yoda.convert(body, function(err, result) {
	    	if (!err) {
	    		console.log(result.toString());
	    		twiml.message(result.toString());
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
	}
	else {
	    res.send('Hey! You are not twilio.  Buzz off.');
	}
})

module.exports = router;