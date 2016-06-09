var institutionM = require('../../controller/institutionManager');

module.exports = function (app) {

  app.get('/api/institution/fetch_user_inst',function (req, res, next) {
    institutionM.fetchUserInst(req, res);
  });

  app.get('/api/institution/fetch_no_user_inst',function (req, res, next) {
    institutionM.fetchNoUserInst(req, res);
  });

  app.get('/api/institution/fetch_users_in_inst',function (req, res, next) {
    institutionM.fetchUsersInInst(req, res);
  });

  app.post('/api/institution/change_inst',function (req, res, next) {
    institutionM.changeInst(req, res);
  });

};  
 
