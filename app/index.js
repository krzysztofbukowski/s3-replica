var config = require('./config.json');
var express = require('express');
var app = express();
var logger = require('./core/logger')(
    process.env.NODE_ENV == 'development' ? 'debug' : 'info'
);

module.exports = function() {
    'use strict';

    return {
        run : function(port) {
            // app.use(express.static('buckets/test'));
            app.use('/', require('./routes')(
                config,
                express.Router(),
                logger
            ));

            app.listen(port, function () {
                logger.info('App running on port ' + port);
            });
        }
    };
};
