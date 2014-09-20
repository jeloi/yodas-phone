// Load the things we need
var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var https = require('https');
var moment = require('moment');
var _ = require('underscore');


// App config
var config = require('./config');
// Yoda Speak package
var YodaSpeak = require('yoda-speak');
// Yoda client from Mashape API
var yoda = new YodaSpeak(config.mashape.apiKey);
// Twilio Client
var client = new twilio.RestClient(config.twilio.accountSid, config.twilio.authToken);
// Yoda client from Mashape API
var yoda = new YodaSpeak(config.mashape.apiKey);

// Get incoming message history, limited to last 20 in the last 2 days
router.get('/history', function(req, res) {
	// var twoDaysAgo = moment().subtract(2, 'days').format("YYYY-MM-DD");
	client.messages.list({From: config.twilio.to}, function(err, data) {
		var list = _.first(data.messages, 20);
		list = _.map(list, function(text) {
			return {body: text.body}
		})
		res.send(list);
	});
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

router.get('/all', function(req, res) {
	client.messages.list({From: config.twilio.to}, function(err, data) {
		var list = data.messages;
		list = _.map(list, function(text) {
			return {body: text.body}
		})
		res.send(list);
	});
})

module.exports = router;