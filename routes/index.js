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

module.exports = function(router) {
    'use strict';

    router.route('/')
        .get(function(req, res) {
            var bucketName = getBucketName(req.headers.host);
            console.log('Create bucket ' + bucketName);

            fs.mkdir(__dirname + '/../buckets/' + bucketName, function(e){
                res.send();
            });
        });

    router.route('/*')
        .get(function(req, res) {
            var bucketName = getBucketName(req.headers.host);
            var object = getObject(bucketName, req.url);

            fs.realpath(process.cwd() + '/buckets/' + object.path, function(err, path) {
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
