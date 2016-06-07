var Topic = require('../model/topic.model');

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
	       			if(org.topics.type == req.body.topicName)
	       				exist = true;
	       		}
	       		if(exist){
	       			console.log('Il topic esiste già');
	       		}
	       		else{ //aggiunge topic
	       			org.topics.push({ type: req.body.topicName});
	       			org.save( function (err) {
	                if (err) {
	                    console.log('errore nell\'inserimento del topic: ' + err);
	                    res.send('ok');
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
