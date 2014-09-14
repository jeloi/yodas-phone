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
	// if (twilio.validateExpressRequest(req, config.twilio.authToken)) {
	    var twiml = new twilio.TwimlResponse();
	    twiml.message('express sez - hello twilio!');

	    res.type('text/xml');
	    res.send(twiml.toString());
	// }
	// else {
	//     res.send('Hey! You are not twilio.  Buzz off.');
	// }
})

module.exports = router;