var topicM = require('../../controller/topicManager');

module.exports = function (app) {

	app.post('/api/topic/save',function (req, res, next) {
    topicM.save(req, res);
  });

  app.post('/api/topic/update',function (req, res, next) {
    topicM.save(req, res);
  });

}; 
