// var crypto = require('crypto');
// var hash = crypto.createHmac('SHA256', "secret").update("Message").digest('base64');

var express = require('express');
var app = express();

// app.use(express.static('buckets/test'));
app.use('/', require('./routes')(express.Router()));


app.listen(5000, function () {
    console.log('Example app listening on port 3000!');
});
