// var crypto = require('crypto');
// var hash = crypto.createHmac('SHA256', "secret").update("Message").digest('base64');
var config = require('./config.json');
var express = require('express');
var app = express();
var logger = require('./core/logger')(
    process.env.NODE_ENV == 'development' ? 'debug' : 'info'
);

// app.use(express.static('buckets/test'));
app.use('/', require('./routes')(
    config,
    express.Router(),
    logger
));

app.listen(5000, function () {
    console.log('Example app listening on port 3000!');
});
