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
	       				for(var k=0;k<result['classes'].length;k++){ //copia array classi nelle quali è lo studente
	       					userClass.push(result['classes'][k]);
	       				}
	       				for(var m=0;m<noUserClass.length;m++){
	       					for(var n=0;n<userClass.length;n++){
	       						if(noUserClass[m]._id.equals(userClass[n]._id)){
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

exports.fetchTeacherClassesList = function (req, res) {

		var classList = [];
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
	       						classList.push({
	       							class_id: org.users[i].classes[j]._id,
	       							name: null
	       						});
	       				}
	       		}
	       		for(var i=0;i<org.classes.length;i++){
	       			for(var j=0;j<classList.length;j++){
	       				if(org.classes[i]._id.equals(classList[j].class_id))
	       					classList[j].name = org.classes[i].name;
	       			}
	       		}

	       		res.send(classList);
	       	}      		
	    	}
			});
		}
};

exports.fetchTeacherClassesDetails = function (req, res) {

		var classList = [];
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
	       						classList.push({
	       							class_id: org.users[i].classes[j]._id,
	       						});
	       				}
	       		}
	       		for(var i=0;i<classList.length;i++){ //passo l'array classlist
       				var numClassTeachers = 0;
       				var numClassStudents = 0;
       				for(var j=0;j<org.users.length;j++){ //scansiono tutti gli utenti
       					if(org.users[j].state == 'allowed') //se sono utenti accettati nell'ente
	       					for(var k=0;k<org.users[j].classes.length;k++){ //scansiono classi dell'utente
	       						if(org.users[j].classes[k].state == 'allowed') //se sono stati accettati nella classe
		       						if(org.users[j].classes[k]._id.equals(classList[i].class_id)){
				       					if(org.users[j].role == 'teacher')
					       					numClassTeachers++;
					     					if(org.users[j].role == 'student')
					     						numClassStudents++;
				       				}
	       					}
	       			}
	       			classList[i].classTeachers = numClassTeachers;
	       			classList[i].classStudents = numClassStudents;
       			}
       			for(var i=0;i<classList.length;i++){
       				for(var j=0;j<org.classes.length;j++){ 
       					if(classList[i].class_id.equals(org.classes[j]._id))
       						classList[i].className = org.classes[j].name;
       				}
       			}

	       		res.send(classList);
	       	}      		
	    	}
			});
		}
};

exports.createClass = function (req, res) {

		if(req.session.user && req.session.user.role == 'director'){
			var organization = req.session.user.institution;
			var fulldate = new Date();
			var year = fulldate.getFullYear();
			var classs = {
				description : req.body.description,
				name : req.body.name,
				academicYear : req.body.year
			};

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
	       	console.log('Organizzazione non trovata');
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