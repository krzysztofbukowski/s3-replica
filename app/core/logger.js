var winston = require('winston');

module.exports = function(level) {
    return new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                level: level,
                timestamp: function() {
                    return new Date();
                },
                formatter: function(options) {
                    // Return string will be passed to logger.
                    var log = [
                        options.timestamp(),
                        '[' + options.level.toUpperCase() + ']',
                        undefined !== options.message ? options.message : '',
                        options.meta && Object.keys(options.meta).length ? ' ' + JSON.stringify(options.meta) : ''
                    ];

                    return log.join(' ');
                }
            })
        ]
    });
};
