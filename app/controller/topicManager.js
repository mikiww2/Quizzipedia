var Organization = require('../model/organization.model');

exports.fetch = function (req, res) {

		var response = [];

		if(req.session.user && req.session.user.role == 'director'){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.topics.length;i++){
	       				response.push(org.topics[i]);
	       		}
	       		res.send(response);
	       	}
	       	else console.log('Nessuna organizzazione trovata');      		
	    	}
			});
		}
		else res.redirect('/');
}

exports.save = function (req, res) {

		var response = [];
		var exist = false;

		if(req.session.user && req.session.user.role == 'director'){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.topics.length;i++){
	       			if(org.topics[i] == req.body.topicName)
	       				exist = true;
	       		}
	       		if(exist){
	       			console.log('Il topic esiste già');
	       		}
	       		else{ //aggiunge topic
	       			org.topics.push(req.body.topicName);
	       			org.save( function (err) {
	                if (err) {
	                    console.log('errore nell\'inserimento del topic: ' + err);
	                    res.send('error');
	                }
	                else {
	                    console.log('topic inserito correttamente');
	                    res.send('ok');
	                }
	            });
	       		}
	       	}
	       	else console.log('Nessuna organizzazione trovata');      		
	    	}
			});
		}
		else res.redirect('/');
} 

exports.erase = function (req, res) {

		if(req.session.user && req.session.user.role == 'director'){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.topics.length;i++){
	       			if(org.topics[i] == req.body.topicName)
	       				org.topics.splice(i,1);
	       		}
       			org.save( function (err) {
                if (err) {
                    console.log('errore nella rimozione del topic: ' + err);
                    res.send('error');
                }
                else {
                    console.log('topic rimosso correttamente');
                    res.send('ok');
                }
            });
	       	}
	       	else console.log('Nessuna organizzazione trovata');      		
	    	}
			});
		}
		else res.redirect('/');
}
