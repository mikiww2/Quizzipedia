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
              if(result['state'] === 'requested'){
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
	        		console.log('userlist');
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
                if(result['user'] === req.session.user._id)
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
};
