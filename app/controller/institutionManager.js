var Organization = require('../model/organization.model');

exports.fetchUserInst = function (req, res) {

		var results = [];
		if(req.session.user){
			Organization.find(function (err,orgs){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(orgs){
	       		console.log('sto cercando nelle organizzazioni');
	       		for(var i=0;i<orgs.length;i++){
        			var org = orgs[i];
							if(org.director == req.session.user._id){
		            results.push({
		                institution_name: org.name
		                ,role : 'director'
		            });
			         }
			        else {
			        	org.users.forEach(function(result,index){
                  if(result['user'] === req.session.user._id && result['state'] === 'allowed' && result['role'] === 'student') {
                    results.push({
	                    institution_name: org.name
	                    ,role: 'student'
	                	});
                	}
			        	});
		            org.users.forEach(function(result,index){
                  if(result['user'] === req.session.user._id && result['state'] === 'allowed' && result['role'] === 'teacher') {
                    results.push({
	                    institution_name: org.name
	                    ,role: 'teacher'
	                	});
                	}
		          	});
			        }
			      } //fine ciclo for
						res.send(results);
			    }
			    else{
       			console.log('error no istitutions found');
       			res.redirect('/');
       		}
       	}	       		
	    });
		}
};

exports.fetchNoUserInst = function (req, res) {

		var results = [];
		if(req.session.user){
			Organization.find(function (err,orgs){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(orgs){
	       		for(var i=0;i<orgs.length;i++){
        			var org = orgs[i];
        			var found = false;
        			if(org.director != req.session.user._id){
        				org.users.forEach(function(result,index){
                  if(result['user'] === req.session.user._id) {
                  	found = true;
                	}
				        });
				        if(!found){
                	results.push({
                    institution_name: org.name
                	});
                }
				      }
        		} // fine ciclo for
        		res.send(results);
			    }
			    else{
       			console.log('error no istitutions found');
       			res.redirect('/');
       		}
       	}	       		
	    });
		}
};



exports.changeInst = function (req, res) {

		var institution = req.body.organizationName;
		var normalUser = false;

		Organization.findOne({'name': institution}, function (err, org) {
        if (err) {
            console.log('error: ' + err);
            res.redirect('/');
        }
        else {
            if (org) {  //SE TROVA UN UTENTE NEL DB
                org.users.forEach(function(result,index){
                    if(result['user'] === req.session.user._id) {
                    		normalUser = true;
                        req.session.user.role = result['role'];
                        req.session.user.institution = institution;
                        res.redirect('/');
                    }
                });

                if(normalUser == false && org.director === req.session.user._id) {
		                req.session.user.role = 'director';
		                req.session.user.institution = institution;
		                res.redirect('/');
	              }
            }
            else {  //SE NON TROVA UN UTENTE NEL DB
	              console.log('errore: user non trovato');
                res.redirect('/');
            }
        }
    });
};
