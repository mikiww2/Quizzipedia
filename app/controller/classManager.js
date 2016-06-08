var Organization = require('../model/organization.model');

exports.fetchInstClasses = function (req, res) {

		var response = [];

		if(req.session.user && req.session.user.role == 'director'){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.classes.length;i++){
	       			response.push(org.classes[i]);	
	       		}
	       		res.send(response);
	       	}
	       	else console.log('Nessuna organizzazione trovata');      		
	    	}
			});
		}
		else res.redirect('/');
}

exports.fetchNoUserClass = function (req, res) {

		var response = [];
		var noUserClass = [];
		var userClass = [];
		if(req.session.user){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
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
				academicYear : req.body.year
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

exports.updateClass = function (req, res) {

		if(req.session.user && req.session.user.role == 'director'){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.classes.length;i++){
	       			if(org.classes[i]._id == req.body._id)
	       				org.classes[i].description = req.body.description;
	       		}
	       		
	       		org.save( function (err) {
                if (err) {
                    console.log('errore nell\'inserimento della classe: ' + err);
                    res.send('errore');
                }
                else {
                    console.log('classe inserita correttamente');
                    res.send('ok');
                }
            });
	       	}
	       	console.log('Organizzazione non trovata');
	    	}
			});
		}
		res.redirect('/');
}