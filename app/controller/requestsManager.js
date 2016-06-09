var Organization = require('../model/organization.model');
var User = require('../model/user.model');

exports.viewRoleRequests = function (req, res) {

		var newuser = {};
		var userlist = [];

		if(req.session.user && req.session.user.role == 'director'){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		console.log('sto cercando nell\'organizzazione ' + req.session.user.institution);
       			org.users.forEach(function(result,index){
              if(result['state'] == 'requested'){
              	User.findOne({ '_id': result['user']}, function (err,user){  //err not handled
              		if(user){
              			newuser._id = user._id;
	              		newuser.firstName = user.firstName;
	              		newuser.lastName = user.lastName;
	              		if(result['role'] == 'student')
	              			newuser.role = 'studente';
	              		else newuser.role = 'docente';
	              		userlist.push(newuser);
	              		console.log(newuser);
	              		newuser = { };
              		}
              	});
              }

	        	});
	        	setTimeout(function(){
							res.send(userlist);
	        	}, 500);

       		}
       		else{
       			console.log('Organizzazione non trovata');
       			res.redirect('/');
       		}
		            
       	}

	    });
		}
		else res.redirect('/');
}

exports.viewClassRequests = function (req, res) {

		var response = [];

		if(req.session.user && req.session.user.role == 'director'){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		console.log('sto cercando nell\'organizzazione ' + req.session.user.institution + ' con ruolo direttore');
       			for(var i=0;i<org.users.length;i++){
       				if(org.users[i].role == 'teacher')
       					for(var j=0;j<org.users[i].classes.length;j++){
	       					if(org.users[i].classes[j].state == 'requested')
	       						for(var k=0;k<org.classes.length;k++){
       								if(org.classes[k]._id.equals(org.users[i].classes[j]._id)){
       									response.push({
       										user: org.users[i].user,
       										class_id: org.users[i].classes[j]._id,
       										description: org.classes[k].description,
       										name: org.classes[k].name,
       										academicYear: org.classes[k].academicYear
       									});
       								}
       							}	
	       				}
       			}
       			res.send(response);
       		}
       		else{
       			console.log('Organizzazione non trovata');
       			res.redirect('/');
       		}
		    }
	    });
		}
		else{
			if(req.session.user && req.session.user.role == 'teacher'){
				Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
					if (err) {
		            console.log('error: ' + err);
		            res.redirect('/');
		      }
		      else{
		       	if(org){
		       		console.log('sto cercando nell\'organizzazione ' + req.session.user.institution + ' con ruolo docente');
	       			for(var i=0;i<org.users.length;i++){
	       				if(org.users[i].user == req.session.user._id)  //cerco il docente

	       					for(var j=0;j<org.users[i].classes.length;j++){  //scansiono le sue classi
		       					if(org.users[i].classes[j].state == 'allowed')  //seleziono le classi per le quali è stato accettato

		       						for(var k=0;k<org.users.length;k++){  //scansiono gli utenti
	       								if(org.users[k].role == 'student')  //seleziono solo gli studenti

	       									for(var h=0;h<org.users[k].classes.length;h++){  //scansiono le loro classi
	       										if(org.users[k].classes[h].state == 'requested')  //seleziono quelle x le quali hanno fatto richiesta
	       											if(org.users[k].classes[h]._id.equals(org.users[i].classes[j]._id))  //seleziono le classi che coincidono

		       											for(var w=0;w<org.classes.length;w++){  //prelievo le info delle classi dell'organizzazione
		       												if(org.classes[w]._id.equals(org.users[k].classes[h]._id)){
		       													response.push({
						       										user: org.users[k].user,
						       										class_id: org.users[k].classes[h]._id,
						       										description: org.classes[w].description,
						       										name: org.classes[w].name,
						       										academicYear: org.classes[w].academicYear
						       									});
						       									console.log("beccato");
						       								}
		       											}
	       									}
	       							}	
		       				}
	       			}
	       			res.send(response);
	       		}
	       		else{
	       			console.log('Organizzazione non trovata');
	       			res.redirect('/');
	       		}
			    }
		    });
			}
			else res.redirect('/');
		}
}


exports.addInstitutionRoleRequest = function (req, res) {

		if(req.session.user){
			Organization.findOne({ 'name': req.body.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		console.log('sto cercando nell\'organizzazione ' + req.body.institution);
	       			var found = false;
	       			org.users.forEach(function(result,index){
                if(result['user'] == req.session.user._id)
                  found = true;
		        	});
		        	if(!found){
		        		org.users.push({
		        			user : req.session.user._id
		        			,role : req.body.role
		        			,message : req.body.message
		        			,state : 'requested'
		        		});
		        		org.save( function (err) {
                    if (err) {
                        console.log('errore nell\'inserimento della richiesta di ruolo: ' + err);
                        res.send('/');
                    }
                    else {
                        console.log('richiesta di ruolo inserita correttamente');
                        res.send('/');
                    }
                });
		        	}
		        	else{
		        		console.log('utente già presente');
		        		res.send('/');
		        	}

		        }
		            
       	}	       		
	    });
		}
}

exports.addClassInsertRequest = function (req, res) {

		if(req.session.user){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       			org.users.forEach(function(result,index){
                if(result['user'] == req.session.user._id){
                	var classs = {
                		state: 'requested',
                		_id: req.body._id
                	};

                	var exist = false;
                	for(var i=0;i<org.users[index].classes.length;i++){
                		if(org.users[index].classes[i]._id == req.body._id)
                			exist = true;
                	}
                	if(!exist){
                		org.users[index].classes.push(classs);
                		org.save( function (err) {
	                    if (err) {
	                        console.log('errore nella richiesta di inserimento nella classe: ' + err);
	                        res.send('/');
	                    }
	                    else {
	                        console.log('richiesta di inserimento nella classe inserita correttamente');
	                        res.send('/');
	                    }
	                	});
                	}
                	else{
                		console.log('Hai gia chiesto di entrare in questa classe');
                		res.send('/');
                	}
                }
		        		
		        	});
	       		}
	        	else{
	        		console.log('Organizzazione non trovata');
	        		res.send('/');
	        	}
	        }	       		
	    });
		}
}

exports.acceptRoleRequest = function (req, res) {

		if(req.session.user && req.session.user.role == 'director'){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.users.length;i++){
	       			if(org.users[i].user == req.body.email){
	       				console.log('CAMBIO RUOLO');
	       				org.users[i].state = 'allowed';
	       			}
	       		}
	       		org.save( function (err) {
                    if (err) {
                        console.log('errore nell\'accettazione della richiesta di ruolo: ' + err);
                        res.redirect('/');
                    }
                    else {
                        console.log('richiesta di ruolo accettata correttamente');
                        res.redirect('/');
                    }
                });
	       	}
	      }
	    });
	  }
}

exports.discardRoleRequest = function (req, res) {

		if(req.session.user && req.session.user.role == 'director'){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.users.length;i++){
	       			if(org.users[i].user == req.body.email)
	       				org.users.splice(i,1);
	       		}
	       		org.save( function (err) {
                    if (err) {
                        console.log('errore nella negazione della richiesta di ruolo: ' + err);
                        res.send('error');
                    }
                    else {
                        console.log('richiesta di ruolo negata correttamente');
                        res.send('ok');
                    }
                });
	       	}
	      }
	    });
	  }
}