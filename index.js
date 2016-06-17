// var crypto = require('crypto');
// var hash = crypto.createHmac('SHA256', "secret").update("Message").digest('base64');

var app = require('./app')();
app.run(5000);
