var questionM = require('../../controller/questionsManager');

module.exports = function (app) {

  app.post('/api/question/save',function (req, res, next) {
    questionM.save(req, res);
  });

  app.get('/api/question/fetch',function (req, res, next) {
    questionM.fetch(req, res);
  });

  app.get('/api/question/search',function (req, res, next) {
    questionM.search(req, res);
  });

  app.post('/api/question/test',function (req, res, next) {
    questionM.test(req, res);
  });

}; 
 
