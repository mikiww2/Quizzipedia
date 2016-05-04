var express = require('express');
var app = express();

//app.use('/home',require('./controllers/home'));

app.route('/Quizzipedia/signup').get(function(req,res,next){
	res.sendFile('./public/view/signup.html', {root: __dirname });
});

//app.use('/register',require('./controllers/register'));
/*
app.get('/', function (req, res) {
  return res.redirect('/login');
});*/

app.listen(8080);
