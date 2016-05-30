var questionM = require('../../controller/questionsManager');

module.exports = function (app) {

  app.post('/api/question/save',function (req, res, next) {
    questionM.save(req, res);
  });

  app.get('/api/question/fetch',function (req, res, next) {
    questionM.fetch(req, res);
  });

}; 
 
