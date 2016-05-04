var express = require('express');
var app = express();

//app.use('/home',require('./controllers/home'));

app.route('/Quizzipedia/signup').get(function(req,res,next){
	res.sendFile('./public/view/signup.html', {root: __dirname });
});

app.route('/Quizzipedia/home').get(function(req,res,next){
	res.sendFile('./public/view/home.html', {root: __dirname });
});

//app.use('/register',require('./controllers/register'));

app.get('/', function (req, res) {
  return res.redirect('/Quizzipedia/home');
});

app.use(express.static(__dirname));

app.listen(8080);
