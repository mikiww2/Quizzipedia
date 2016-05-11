var controller = require('../../controller/authController');
var User = require('../../model/user.model');

function getUsers(res) {
    User.find(function (err, users) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(users); // return all todos in JSON format
    });
};
/*
function getUser(res) {
    User.findOne({'_id': email},function (err, user) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        else res.json(user); // return all todos in JSON format
    });
};
*/
module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all users
    app.get('/api/users', function (req, res) {
        // use mongoose to get all todos in the database
        getUsers(res);
    });
/*
    app.post('/auth/signup', function (req, res) {
      console.log('create');
      // create a todo, information comes from AJAX request from Angular
      User.create({
        _id: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
      }, function (err, todo) {
        if (err)
          res.send(err);

        getUsers(res);
      });

    });
*/
    app.post('/auth/signin',function (req, res, next) {
      controller.signin(req, res);
    });

    app.post('/auth/signup',function (req, res, next) {
      controller.signup(req, res);
    });

};