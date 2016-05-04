var express = require('express');
var app = express();

//app.use('/home',require('./controllers/home'));
app.route('/login').get(function(req,res,next){
	res.sendFile('./views/login.html', {root: __dirname });
});
//app.use('/register',require('./controllers/register'));

app.get('/', function (req, res) {
  return res.redirect('/login');
});

app.listen(8080);