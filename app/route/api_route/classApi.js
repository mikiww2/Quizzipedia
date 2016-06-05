var classM = require('../../controller/classManager');

module.exports = function (app) {

  app.get('/api/class/fetch_no_user_class',function (req, res, next) {
    classM.fetchNoUserClass(req, res);
  });

};
