/*
 * Nome del file: topicManager.js
 * Percorso: app/controller/topicManager.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per il reperimento, salvataggio ed eliminazione di argomenti dal database
 *
 * * Diario delle modifiche:
 *
 */

var Organization = require('../model/organization.model');
var Topic = require('../model/topic.model');

exports.fetch = function (req, res) {

		var response = [];

		if(req.session.user){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.redirect('/');
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.topics.length;i++){
	       				response.push({
	       					topicName: org.topics[i]
	       				});
	       		}
	       		res.send(response);
	       	}
	       	else console.log('Nessuna organizzazione trovata');      		
	    	}
			});
		}
		else res.redirect('/');
}

exports.fetchAll = function (req, res) {

		var response = [];

		Topic.find(function (err,topic){
			if (err) {
            console.log('error: ' + err);
            res.redirect('/');
      }
      else{
       	if(topic){
       		res.send(topic);
       	}
       	else console.log('Nessun argomento trovato');      		
    	}
		});
}

exports.save = function (req, res) {

		var response = [];
		var exist = false;

		if(req.session.user && req.session.user.role == 'director'){

			Topic.findOne({ 'name': req.body.topicName }, function (err, topic){
				if (err) {
	            console.log('error: ' + err);
	            res.send({ res_code: -1, res_msg: '/' });
	      }
	      else{
	       	if(topic){
	       		console.log('L\'argomento esiste già nel sistema Quizzipedia');
	       	}
	       	else{
	       		var newTopic = new Topic({ name: req.body.topicName });
	       		newTopic.save( function (err) {
                if (err) {
                    console.log('errore nell\'inserimento del topic in topic.model: ' + err);
                }
                else {
                    console.log('topic inserito correttamente in topic.model');
                }
            });
	       	}
	      }
	    });

			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.send({ res_code: -1, res_msg: '/' });
	      }
	      else{
	       	if(org){
	       		for(var i=0;i<org.topics.length;i++){
	       			if(org.topics[i] == req.body.topicName)
	       				exist = true;
	       		}

	       		if(exist){
	       			res.send({ res_code: 0, res_msg: 'L\'argomento "' + req.body.topicName + '" esiste già!' });
	       		}
	       		else{ //aggiunge topic
	       			org.topics.push(req.body.topicName);
	       			org.save( function (err) {
	                if (err) {
	                    console.log('errore nell\'inserimento del topic: ' + err);
	                    res.send({ res_code: 0, res_msg: 'Errore nell\'inserimento dell\'argomento!' });
	                }
	                else {
	                    console.log('topic inserito correttamente');
	                    res.send({ res_code: 1, res_msg: 'Argomento inserito correttamente!' });
	                }
	            });
	       		}
	       	}
	       	else console.log('Nessuna organizzazione trovata');
	    	}
			});
		}
		else res.send({ res_code: -1, res_msg: '/' });
} 

exports.erase = function (req, res) {

		if(req.session.user && req.session.user.role == 'director'){
			Organization.findOne({ 'name': req.session.user.institution }, function (err,org){
				if (err) {
	            console.log('error: ' + err);
	            res.send({ res_code: -1, res_msg: '/' });
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
                    res.send({ res_code: 0, res_msg: 'Errore nella rimozione dell\'argomento!' });
                }
                else {
                    console.log('topic rimosso correttamente');
                    res.send({ res_code: 1, res_msg: 'Argomento rimosso correttamente!' });
                }
            });
	       	}
	       	else console.log('Nessuna organizzazione trovata');      		
	    	}
			});
		}
		else res.send({ res_code: -1, res_msg: '/' });
}
