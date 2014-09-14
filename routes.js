// Load the things we need
var express = require('express');
var router = express.Router();
var twilio = require('twilio');

// App config
var config = require('./config');
// Twilio Client
var client = new twilio.RestClient(config.twilio.accountSid, config.twilio.authToken);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/texts', function(req, res) {
	if (twilio.validateExpressRequest(req, config.twilio.authToken, {url: config.twilio.smsWebhook})) {
	    var twiml = new twilio.TwimlResponse();
	    twiml.message('express sez - hello twilio!');

	    // The text sent in
	    var body = req.param('Body').trim();
        
        // the number the vote it being sent to (this should match an Event)
        var to = req.param('To');
        
        // the voter, use this to keep people from voting more than once
        var from = req.param('From');

	    res.type('text/xml');
	    res.send(twiml.toString());
	}
	else {
	    res.send('Hey! You are not twilio.  Buzz off.');
	}
})

module.exports = router;