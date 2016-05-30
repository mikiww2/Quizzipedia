var institutionM = require('../../controller/institutionManager');

module.exports = function (app) {

  app.get('/api/institution/fetch_user_inst',function (req, res, next) {
    institutionM.fetchUserInst(req, res);
  });

  app.post('/api/institution/change_inst',function (req, res, next) {
    institutionM.changeInst(req, res);
  });

};  
 
