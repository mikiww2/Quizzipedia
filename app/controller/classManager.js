/*
 * Nome del file: classManager.js
 * Percorso: app/controller/classManager.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per il reperimento, creazione, modifica delle classi nel database
 *
 * * Diario delle modifiche:
 *
 */

var async = require('async');

var Organization = require('../model/organization.model');
var User = require('../model/user.model');
var Quiz = require('../model/quiz.model');

var callback = function(){ //callback fake per sincronismo
}

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
};

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
	       				for(var k=0;k<result['classes'].length;k++){ //copia array classi nelle quali è l'utente
	       					userClass.push(result['classes'][k]);
	       				}
	       				for(var m=0;m<noUserClass.length;m++){
	       					for(var n=0;n<userClass.length;n++){
	       						if(noUserClass[m]._id.equals(userClass[n]._id)){ //rimuove le classi nelle quali è gia l'utente
	       							noUserClass.splice(m,1);
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
};

exports.fetchClassesList = function (req, res) {

		var classlist = [];
		if(req.session.user && req.session.user.role == 'director'){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.classes.length;i++){
	       			classlist.push({
	       				class_id: org.classes[i]._id,
	       				name: org.classes[i].name
	       			});
	       		}
	       		res.send(classlist);
	       	}
	       	else console.log('Nessun ente trovato');
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
		       		for(var i=0;i<org.users.length;i++){
		       			if(org.users[i].user == req.session.user._id)
		       				for(var j=0;j<org.users[i].classes.length;j++){
		       					if(org.users[i].classes[j].state == 'allowed')
		       						classlist.push({
		       							class_id: org.users[i].classes[j]._id,
		       							name: null
		       						});
		       				}
		       		}
		       		for(var i=0;i<org.classes.length;i++){
		       			for(var j=0;j<classlist.length;j++){
		       				if(org.classes[i]._id.equals(classlist[j].class_id))
		       					classlist[j].name = org.classes[i].name;
		       			}
		       		}

		       		res.send(classlist);
		       	}      		
		    	}
				});
			}
			else res.redirect('/');
		}
};

exports.fetchClassesDetails = function (req, res) {

		var classlist = [];
		if(req.session.user && req.session.user.role == 'director'){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.classes.length;i++){
	       			classlist.push({
	       				class_id: org.classes[i]._id,
	       				className: org.classes[i].name
	       			});
	       		}
	       		for(var i=0;i<classlist.length;i++){ //passo l'array classlist
       				var numClassTeachers = 0;
       				var numClassStudents = 0;
       				for(var j=0;j<org.users.length;j++){ //scansiono tutti gli utenti
       					if(org.users[j].state == 'allowed') //se sono utenti accettati nell'ente
	       					for(var k=0;k<org.users[j].classes.length;k++){ //scansiono classi dell'utente
	       						if(org.users[j].classes[k].state == 'allowed') //se sono stati accettati nella classe
		       						if(org.users[j].classes[k]._id.equals(classlist[i].class_id)){
				       					if(org.users[j].role == 'teacher')
					       					numClassTeachers++;
					     					if(org.users[j].role == 'student')
					     						numClassStudents++;
				       				}
	       					}
	       			}
	       			classlist[i].classTeachers = numClassTeachers;
	       			classlist[i].classStudents = numClassStudents;
       			}
	       		res.send(classlist);
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
		       		for(var i=0;i<org.users.length;i++){ //cerca il docente
		       			if(org.users[i].user == req.session.user._id)
		       				for(var j=0;j<org.users[i].classes.length;j++){  //passa le sue classi dove è stato accettato
		       					if(org.users[i].classes[j].state == 'allowed')
		       						classlist.push({
		       							class_id: org.users[i].classes[j]._id,
		       						});
		       				}
		       		}
		       		for(var i=0;i<classlist.length;i++){ //passo l'array classlist
	       				var numClassTeachers = 0;
	       				var numClassStudents = 0;
	       				for(var j=0;j<org.users.length;j++){ //scansiono tutti gli utenti
	       					if(org.users[j].state == 'allowed') //se sono utenti accettati nell'ente
		       					for(var k=0;k<org.users[j].classes.length;k++){ //scansiono classi dell'utente
		       						if(org.users[j].classes[k].state == 'allowed') //se sono stati accettati nella classe
			       						if(org.users[j].classes[k]._id.equals(classlist[i].class_id)){
					       					if(org.users[j].role == 'teacher')
						       					numClassTeachers++;
						     					if(org.users[j].role == 'student')
						     						numClassStudents++;
					       				}
		       					}
		       			}
		       			classlist[i].classTeachers = numClassTeachers;
		       			classlist[i].classStudents = numClassStudents;
	       			}
	       			for(var i=0;i<classlist.length;i++){
	       				for(var j=0;j<org.classes.length;j++){ 
	       					if(classlist[i].class_id.equals(org.classes[j]._id))
	       						classlist[i].className = org.classes[j].name;
	       				}
	       			}

		       		res.send(classlist);
		       	}      		
		    	}
				});
			}
			else res.redirect('/');
		}
};

exports.fetchClassMembers = function (req, res) {

		var results = [];
		if(req.session.user && (req.session.user.role == 'director' || req.session.user.role == 'teacher')){

			async.series([
				function(callback){
					Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
						if (err) {
			            console.log('error: ' + err);
			            res.redirect('/');
			      }
			      else{
			       	if(org){
			       		for(var i=0;i<org.users.length;i++){
			       			if(org.users[i].state == 'allowed')
				       			for(var j=0;j<org.users[i].classes.length;j++){
				       				if(org.users[i].classes[j].state == 'allowed')
				       					if(org.users[i].classes[j]._id.equals(req.body.class_id))
				       						results.push({
				       							user: org.users[i].user,
				       							role: org.users[i].role
				       						});
				       			}
			       		}
			       		callback();
			       	}
			       	else console.log('Nessun ente trovato');
			      }
			    });
				},

				function(callback){
					User.find(function (err,users){
						if (err) {
		            console.log('error: ' + err);
		            res.redirect('/');
			      }
			      else{
			       	if(users){
			       		for(var i=0;i<users.length;i++){
			       			for(var j=0;j<results.length;j++){
			       				if(results[j].user == users[i]._id){
			       					results[j].firstName = users[i].firstName;
			       					results[j].lastName = users[i].lastName;
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
						res.send(results);
					}
				});			
		}
		else res.redirect('/');
}

exports.fetchClassesWithQuiz = function (req, res) {

	var quizlist = [];
	var classlist = [];
	var finalResults = [];

	var counter = 0;

	if(req.session.user && req.session.user.role == 'student'){
		async.series([
			function(callback){console.log('Inizio find classes -----------------------------');

				Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
					if (err) {
		            console.log('error: ' + err);
		            res.redirect('/');
		      }
		      else{
		       	if(org){
		       		for(var i=0;i<org.users.length;i++){ //cerco l'utente
		       			if(org.users[i].user == req.session.user._id)
			       			for(var j=0;j<org.users[i].classes.length;j++){ //cerco le sue classi
			       				if(org.users[i].classes[j].state == 'allowed') //seleziono quelle in cui è accettato
			       					for(var k=0;k<org.classes.length;k++){ //cerco nome delle classi in cui è l'utente
			       						if(org.classes[k]._id.equals(org.users[i].classes[j]._id)){
			       							classlist.push({
			       								class_id: org.users[i].classes[j]._id,
			       								class_name: org.classes[k].name
			       							});
			       						}
			       					}
			       			}
		       		}
		       		callback();
		       	}
		       	else console.log('Nessuna organizzazione trovata');
		      }
				});
			},

			function(callback){console.log('Inizio find quiz -----------------------------');
				Quiz.find({ 'institution': req.session.user.institution, 'classes': {$gt: []}}, function (err,quizzes){
					if (err) {
		            console.log('error: ' + err);
		            res.redirect('/');
		      }
		      else{
		       	if(quizzes){
		       		for(var i=0;i<quizzes.length;i++){
		       			quizlist.push({
		       				_id: quizzes[i]._id,
		       				title: quizzes[i].title,
		       				topic: quizzes[i].topic,
		       				author: quizzes[i].author,
		       				classes: quizzes[i].classes
		       			});
		       		}
		       		console.log(quizlist);
		       		callback();
		       	}
		       	else console.log('Nessun quiz trovato');
		      }
				});
			},

			function(callback){console.log('Inizio filtro -----------------------------');
				for(var i=0;i<classlist.length;i++){ //ciclo su classlist
					var quizID = [];
					for(var j=0;j<quizlist.length;j++){ //ciclo su quizlist
						for(var k=0;k<quizlist[j].classes.length;k++){ //ciclo sulle classi del quiz
							if(classlist[i].class_id.equals(quizlist[j].classes[k])){
								quizID.push({
									_id: quizlist[j]._id,
									title: quizlist[j].title,
									topic: quizlist[j].topic,
									author: quizlist[j].author
								});
							}
						}
					}
					finalResults.push({
						class_id: classlist[i].class_id,
       			class_name: classlist[i].class_name,
       			quizzes: quizID
					});
				}
				callback();
			}],function(err){
					if(err)
						console.log(err);
					else{
						console.log(finalResults);
						res.send(finalResults);
					}
			});
	}
	else res.redirect('/');
}

exports.removeFromClass = function (req, res) {

		if(req.session.user && (req.session.user.role == 'director' || req.session.user.role == 'teacher')){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.users.length;i++){
	       			if(org.users[i].user == req.body.user)
	       				for(var j=0;j<org.users[i].classes.length;j++){
	       					if(org.users[i].classes[j]._id.equals(req.body.class_id))
	       						org.users[i].classes.splice(j,1);
	       				}
	       		}
	       		org.save( function (err) {
                if (err) {
                    console.log('errore nella rimozione dell\'utente della classe: ' + err);
                    res.send('/');
                }
                else {
                    console.log('utente rimosso dalla classe correttamente');
                    res.send('/');
                }
            });
	       	}
	       	else console.log('Nessun ente trovato');
	    	}
			});
		}
		else res.redirect('/');
}

exports.createClass = function (req, res) {

		if(req.session.user && req.session.user.role == 'director'){
			var classs = {
				description : req.body.description,
				name : req.body.name,
				academicYear : req.body.academicYear
			};

			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
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
};

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
	       	else console.log('Organizzazione non trovata');
	    	}
			});
		}
		else res.redirect('/');
};

exports.removeClass = function (req, res) {

		if(req.session.user && req.session.user.role == 'director'){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.classes.length;i++){  //rimuove classe da organization
	       			if(org.classes[i]._id == req.body._id){
	       				console.log('CLASSE rimossa da lista classi');
	       				org.classes.splice(i,1);
	       			}
	       		}

	       		for(var j=0;j<org.users.length;j++){  //rimuove classe da users
	       			for(var k=0;k<org.users[j].classes.length;k++){
	       				if(org.users[j].classes[k]._id == req.body._id)
	       					org.users[j].classes.splice(k,1);
	       			}
	       		}
	       		
	       		org.save( function (err) {
                if (err) {
                    console.log('errore nella rimozione della classe: ' + err);
                    res.send('errore');
                }
                else {
                    console.log('classe rimossa correttamente');
                    res.send('ok');
                }
            });
	       	}
	       	else console.log('Organizzazione non trovata');
	    	}
			});
		}
		else res.redirect('/');
};