var uploadM = require('../../controller/uploadManager');

module.exports = function (app) {

    // app.post('/api/upload/save', function (req, res, next) {
    app.post('/api/upload/save', uploadM.upload, function (req, res, next) {
        // uploadM.upload(req, res);
        console.log(" uploading file");
        console.log(req.file); // Should show you the files
        // res.status(204).end();
    });

    app.get('/api/upload/remove', function (req, res, next) {
        uploadM.remove(req, res);
    });

};