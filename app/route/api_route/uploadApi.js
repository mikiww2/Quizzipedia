var uploadM = require('../../controller/uploadManager');

module.exports = function (app) {

    app.post('/api/upload/save', uploadM.upload, function (req, res, next) {
        console.log(" uploading file");
        console.log(req.file); // Should show you the files
    });

    app.get('/api/upload/remove', uploadM.remove, function (req, res, next) {
        console.log(" removing file");
    });

};