var Organization = require('../model/organization.model');

exports.fetchUserInst = function (req, res) {

		if(req.session.user){
			Organization.findInstitutionsWithAcceptedUser(req.session.user._id, function (err,orgs){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	       }
	       else{
	       		if(orgs){
	       			res.send(orgs);
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
