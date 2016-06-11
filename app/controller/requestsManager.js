/*
 * Nome del file: requestsManager.js
 * Percorso: app/controller/requestsManager.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 * Controller per reperire e aggiunger richieste di ruolo, di classe nel database e per l'accettazione/rifiuto di queste
 *
 * * Diario delle modifiche:
 *
 */

var async = require('async');
var Organization = require('../model/organization.model');
var User = require('../model/user.model');

var callback = function(){ //callback fake per sincronismo
}

exports.viewRoleRequests = function (req, res) {

		var userlist = [];

		if(req.session.user && req.session.user.role == 'director'){

			async.series([
				function(callback){
					console.log('comincia find role Organization');
					Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
						if (err) {
			            console.log('error: ' + err);
			            res.redirect('/');
			      }
			      else{
			       	if(org){
			       		console.log('sto cercando nell\'organizzazione ' + req.session.user.institution);
			       		for(var i=0;i<org.users.length;i++){
			       			if(org.users[i].state == 'requested')
			       				userlist.push({
			       					user: org.users[i].user,
			       					message: org.users[i].message,
			       					role: org.users[i].role
			       				});
			       		}
			       		callback();
			       	}
			       	else console.log('Organizzazione non trovata');
			      }
			    });
				},

				function(callback){
					console.log('comincia find role User');
        	User.find(function (err,users){
        		if (err) {
			            console.log('error: ' + err);
			            res.redirect('/');
			      }
			      else{
	        		if(users){
	        			for(var i=0;i<userlist.length;i++){
	        				for(var j=0;j<users.length;j++){
	        					if(userlist[i].user == users[j]._id){
	        						userlist[i].firstName = users[j].firstName;
	        						userlist[i].lastName = users[j].lastName;
	        					}
	        				}
	        			}
	        			callback();
	        		}
	        		else console.log('Nessun utente trovato');
	        	}
        	});
        }],function(err){
					if(err)
						console.log(err);
					else{
						res.send(userlist);
					}
			});
		}
		else res.redirect('/');
}

exports.viewClassRequests = function (req, res) {

		var response = [];
		var teacherclasses = [];

		if(req.session.user && req.session.user.role == 'director'){
			
			async.series([
				function(callback){
					console.log('comincia find class Organization');
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
		       									console.log(org.classes[k].name);
		       									response.push({
															user: org.users[i].user,
															class_id: org.users[i].classes[j]._id,
															name: org.classes[k].name,
															firstName: null,
															lastName: null
														});
		       								}
		       							}
			       				}
		       			}
								callback();
		       		}
		       		else console.log('Organizzazione non trovata');
				    }
			    });
				},

				function(callback){
					console.log('comincia find class User');
					User.find(function (err,users){
						if (err) {
		            console.log('error: ' + err);
		            res.redirect('/');
			      }
			      else{
			       	if(users){
			       		for(var i=0;i<users.length;i++){
			       			for(var j=0;j<response.length;j++){
			       				if(response[j].user == users[i]._id){
			       					response[j].firstName = users[i].firstName;
			       					response[j].lastName = users[i].lastName;
			       					console.log(response[j].firstName);
			       				}
			       			}
			       		}
			       		callback();
			       	}
						}
					});
				}],function(err){
					if(err)
						console.log(err);
					else{
						res.send(response);
					}
				});
			
		}
		else{
			if(req.session.user && req.session.user.role == 'teacher'){

				async.series([
					function(callback){
						console.log('comincia find class Organization');
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
								       										name: org.classes[w].name,
								       										firstName: null,
																					lastName: null
								       									});
								       									console.log("beccato");
								       								}
				       											}
			       									}
			       							}	
				       				}
			       			}
			       			callback();
			       		}
			       		else{
			       			console.log('Organizzazione non trovata');
			       			res.redirect('/');
			       		}
					    }
				    });
					},

					function(callback){
					console.log('comincia find class User');
					console.log(response.length);
					User.find(function (err,users){
						if (err) {
		            console.log('error: ' + err);
		            res.redirect('/');
			      }
			      else{
			       	if(users){
			       		for(var i=0;i<users.length;i++){
			       			for(var j=0;j<response.length;j++){
			       				if(response[j].user == users[i]._id){
			       					response[j].firstName = users[i].firstName;
			       					response[j].lastName = users[i].lastName;
			       					console.log(response[j].firstName);
			       				}
			       			}
			       		}
			       		callback();
			       	}
						}
					});
				}],function(err){
						if(err)
							console.log(err);
						else{
							res.send(response);
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

exports.acceptClassRequest = function (req, res) {

		if(req.session.user){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.users.length;i++){
	       			if(org.users[i].user == req.body.user){
	       				for(var j=0;j<org.users[i].classes.length;j++){
	       					if(org.users[i].classes[j]._id.equals(req.body.class_id)){
	       						console.log('CAMBIO RUOLO');
	       						org.users[i].classes[j].state = 'allowed';
	       					}
	       				}
	       			}
	       		}
	       		org.save( function (err) {
                if (err) {
                    console.log('errore nell\'accettazione della richiesta di classe: ' + err);
                    res.send('ok');
                }
                else {
                    console.log('richiesta di classe accettata correttamente');
                    res.send('ok');
                }
            });
	       	}
	      }
	    });
	  }
}

exports.discardClassRequest = function (req, res) {

		if(req.session.user){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.users.length;i++){
	       			if(org.users[i].user == req.body.user){
	       				for(var j=0;j<org.users[i].classes.length;j++){
	       					if(org.users[i].classes[j]._id.equals(req.body.class_id)){
	       						console.log('catà');
	       						org.users[i].classes.splice(j,1);
	       					}
	       				}
	       			}
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