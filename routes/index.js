var fs = require('fs');

function getBucketName(host) {
    var hostname = host.split(':')[0];

    return hostname.split('.')[0];
}

function getObject(bucketName, object) {
    return {
        path: bucketName + object,
        contentType : 'image/jpeg'
    };
}

module.exports = function(config, router, logger) {
    'use strict';

    router.route('/')
        .get(function(req, res) {
            var bucketName = getBucketName(req.headers.host);
            logger.debug('Get bucket', { bucketName: bucketName });

            fs.mkdir(config.bucketsDir + bucketName, function(e){
                res.send();
            });
        });

    router.route('/*')
        .get(function(req, res) {
            var bucketName = getBucketName(req.headers.host);
            var object = getObject(bucketName, req.url);

            logger.debug('Get object', { objectName: object });

            fs.realpath(config.bucketsDir + object.path, function(err, path) {
                if (path !== undefined) {
                    res.set('Content-Type', object.contentType);
                    res.sendFile(path);
                } else {
                    res.status(404).send('Not found');
                }
            });
        });

    return router;
};
