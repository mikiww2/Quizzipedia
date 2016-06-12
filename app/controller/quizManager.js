/*
 * Nome del file: quizManager.js
 * Percorso: app/controller/quizManager.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per il salvataggio, recupero e rimozione di quiz 
 *
 * * Diario delle modifiche:
 *
 */

var Quiz = require('../model/quiz.model');

exports.fetchUserQuiz = function (req,res) { //quiz creati dal docente loggato nel relativo ente

	var results = [];
	if(req.session.user && req.session.user.role == 'teacher'){
		Quiz.find(function (err,quiz){
			if (err) {
            console.log('error: ' + err);
            res.redirect('/');
      }
      else{
       	if(quiz){
       		for(var i=0;i<quiz.length;i++){
       			if(quiz[i].author == req.session.user._id && quiz[i].institution == req.session.user.institution){
       				results.push(quiz[i]);
       			}
       		}
       		res.send(results);
       	}
       	else console.log('Nessun quiz trovato');

			}

		});
	}
	else res.redirect('/');

}

exports.fetchAllQuiz = function (req,res) { //tutti i quiz dell'ente, non so se serva

}

exports.fetchQuizNumber = function (req, res, next) {

    if(req.session.user){ //&& req.session.user.role == 'teacher' da aggiungere dopo

        Quiz.find({ 'institution': req.session.user.institution }, function (err, quiz) {
            if (err) {
                console.log('error: ' + err);
                res.redirect('/');
            }
            else{
                if(quiz){
                    res.send({ number: quiz.length });
                }
                else{
                    console.log('Nessuna domanda trovata');
                    res.send({ number: 0 });
                }
            }
        });

    }
    else res.redirect('/');
};

exports.fetchPublicQuiz = function (req,res) { //quiz dell'ente pubblici

}

exports.search = function (req,res) { //ricerca quiz

}

exports.save = function (req,res) { //salvataggio quiz

}
