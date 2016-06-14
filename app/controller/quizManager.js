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

var async = require('async');
var Quiz = require('../model/quiz.model');
var Question = require('../model/question.model');

var callback = function () { //mock function per chiamate async

}

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
};

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

  var quizDifficulty = 0;

  if(req.session.user && req.session.user.role == 'teacher'){

    async.series([

      function(callback){
        Question.find({ 'institution': req.session.user.institution }, function (err, questions) {
            if (err) {
                console.log('error: ' + err);
                res.redirect('/');
            }
            else{
                if(questions){
                    var sum = 0;
                    var counter = 0;
                    for(var i=0;i<questions.length;i++){
                      for(var j=0;j<req.body.questions.length;j++){
                        if(questions[i]._id == req.body.questions[j]._id){
                          counter++;
                          sum = sum + questions[i].difficulty;
                        }
                      }
                    }
                    quizDifficulty = Math.round(sum / counter);
                    callback();
                }
                else{
                    console.log('Nessuna domanda trovata');
                    res.send({ message: 'Non esistono domande' });
                }
            }
          });
      },

      function(callback){
        var quiz = new Quiz({
          author: req.session.user._id,
          creationDate: new Date(),
          classes: req.body.classes,
          topics: req.body.topics,
          description: req.body.description,
          difficulty: quizDifficulty,
          questions: req.body.questions,
          keywords: req.body.keywords,
          title: req.body.title,
          institution: req.session.user.institution
        });
        
        quiz.save(function (err){
          if (err) {
            console.log('errore nell\'inserimento della classe: ' + err);
            res.send({ code: 1, message: 'Errore nella creazione del quiz: ' + err });
          }
          else{
            console.log('Quiz creato correttamente');
            res.send({ code: 0, message: 'Quiz creato correttamente!' });
          }

        });

      }],function(err){
            if(err)
              console.log(err);
            else{
              res.send({ message: 'Errore a fine async' });
            }
        });
  }
  else res.redirect('/');
}
