var Organization = require('../model/organization.model');

exports.fetchNoUserClass = function (req, res) {

		var response = [];
		var noUserClass = [];
		var userClass = [];
		if(req.session.user){
			var organization = req.session.user.institution;
			Organization.findOne({ 'name': organization }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		org.users.forEach(function(result){
	       			if(result['user'] == req.session.user._id){
	       				for(var j=0;j<org.classes.length;j++){ //copia array classi in istituto
	       					noUserClass.push(org.classes[j]);
	       				}
	       				for(var k=0;k<result['classes'].length;k++){ //copia array classi nelle quali è lo studente
	       					userClass.push(result['classes'][k]);
	       				}
	       				for(var m=0;m<noUserClass.length;m++){
	       					for(var n=0;n<userClass.length;n++){
	       						if(noUserClass[m]._id == userClass[n]._id){
	       							console.log('trovato classe in cui è unserito l\'utente');
	       							noUserClass.remove(m,1);
	       						}
	       					}
	       				}
	       			}
	       		});

	       		res.send(noUserClass);
	       	}      		
	    	}
			});
		}
}

exports.createClass = function (req, res) {

		if(req.session.user && req.session.user.role == 'director'){
			var organization = req.session.user.institution;
			var fulldate = new Date();
			var year = fulldate.getFullYear();
			var classs = {
				description : req.body.description,
				name : req.body.name,
				academicYear : year
			}

			Organization.findOne({ 'name': organization }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		org.classes.push(classs);
	       		org.save( function (err) {
                if (err) {
                    console.log('errore nell\'inserimento della classe: ' + err);
                    res.send('/');
                }
                else {
                    console.log('classe inserita correttamente');
                    res.send('/');
                }
            });
	       	}      		
	    	}
			});
		}
}
