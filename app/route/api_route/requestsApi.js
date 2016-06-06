var requestsM = require('../../controller/requestsManager');

module.exports = function (app) {

  app.post('/api/requests/add_inst_role_request', function (req, res, next) {
    requestsM.addInstitutionRoleRequest(req, res);
  });

  app.get('/api/requests/view_role_requests', function (req, res, next) {
    requestsM.viewRoleRequests(req, res);
  });

  app.post('/api/requests/add_class_insert_request', function (req, res, next) {
    requestsM.addClassInsertRequest(req, res);
  });

  app.get('/api/requests/view_class_requests', function (req, res, next) {
    requestsM.viewClassRequests(req, res);
  });

  app.post('/api/requests/accept_role_request', function (req, res, next) {
    requestsM.acceptRoleRequest(req, res);
  });

  app.post('/api/requests/discard_role_request', function (req, res, next) {
    requestsM.discardRoleRequest(req, res);
  });

};
