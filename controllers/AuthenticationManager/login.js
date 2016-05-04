var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
 res.send('Login<br><a href="/home">Home</a>');
}); 

module.exports = router;