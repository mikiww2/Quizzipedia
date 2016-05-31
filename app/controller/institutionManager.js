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
	       		for(var i=0;i<orgs.length;i++){
        			var org = orgs[i];
							if(org.director == req.session.user._id)
			            results.push({
			                institution_name: org.name
			                ,role : 'director'
			            });
			        else {
			        	org.users.forEach(function(result,index){
                  if(result['user'] === req.session.user._id && result['state'] === 'allowed' && result['role'] === 'student') {
                    results.push({
	                    institution_name: org.name
	                    ,role: 'student'
	                	});
                	};
			        	});
		            org.users.forEach(function(result,index){
                  if(result['user'] === req.session.user._id && result['state'] === 'allowed' && result['role'] === 'teacher') {
                    results.push({
	                    institution_name: org.name
	                    ,role: 'teacher'
	                	});
                	};
		          	});
			        }
			      }
			    }
			    else{
       			console.log('error no istitutions found');
       			res.redirect('/');
       		}
       		res.send(orgs);
       	}	       		
	    });
		}
		return results;
};



exports.changeInst = function (req, res) {

		var institution = req.body.name;

		Organization.findOne({'name': institution}, function (err, org) {
        if (err) {
            console.log('error: ' + err);
            res.redirect('/');
        }
        else {
            if (user) {  //SE TROVA UN UTENTE NEL DB
                org.users.forEach(function(result,index){
                    if(result['user'] === session.user._id) {
                        session.user.role = result['role'];
                        session.user.institution = institution;
                        res.redirect('/');
                    }
                });
            }
            else {  //SE NON TROVA UN UTENTE NEL DB
                console.log('errore: user non trovato');
                res.redirect('/');
            }
        }
    });
};
