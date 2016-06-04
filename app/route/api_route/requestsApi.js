var requestsM = require('../../controller/requestsManager');

module.exports = function (app) {

  app.post('/api/requests/add_inst_role_request', function (req, res, next) {
    requestsM.addInstitutionRoleRequest(req, res);
  });

}; 
 
