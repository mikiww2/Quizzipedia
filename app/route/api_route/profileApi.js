var profileM = require('../../controller/profileManager');

module.exports = function (app) {

  app.get('/api/profile/get_user',function (req, res, next) {
    profileM.getUser(req, res);
  });

  app.post('/api/profile/set_pswd',function (req, res, next) {
    profileM.setPassword(req, res);
  });
/*
  app.get('/api/profile/get_pswd',function (req, res, next) {
    profileM.getPassword(req, res);
  });
*/
};
