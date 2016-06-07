var uploadM = require('../../controller/uploadManager');

module.exports = function (app) {

    app.post('/api/upload/save', function (req, res, next) {
        uploadM.upload(req, res, function(err) {
                console.log(err);
        });
    });

    app.post('/api/upload/remove', function (req, res, next) {
        uploadM.remove(req, res);
    });

};