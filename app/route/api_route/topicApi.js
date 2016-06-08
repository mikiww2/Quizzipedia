var topicM = require('../../controller/topicManager');

module.exports = function (app) {

<<<<<<< HEAD
=======
	app.get('/api/topic/fetch',function (req, res, next) {
    topicM.fetch(req, res);
  });

>>>>>>> d732c18e9b3dce9d0c8f8a53de09546d7129fbb7
	app.post('/api/topic/save',function (req, res, next) {
    topicM.save(req, res);
  });

  app.post('/api/topic/update',function (req, res, next) {
    topicM.update(req, res);
  });

  app.post('/api/topic/erase',function (req, res, next) {
    topicM.erase(req, res);
  });

}; 
