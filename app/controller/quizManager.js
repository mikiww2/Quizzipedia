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
var ResultQuiz = require('../model/resultQuiz.model');
var agent = require('./QMLAgent');

var callback = function () { //mock function per chiamate async
};

exports.getSolvedUserQuiz = function (req,res) {

  var firstsearch = [];

  if(req.session.user){
    async.series([
      function(callback){
        ResultQuiz.find({ 'user': req.session.user._id }, function (err,quizzes){
          if (err) {
                console.log('error: ' + err);
                res.redirect('/');
          }
          else{
            if(quizzes){
              for(var i=0;i<quizzes.length;i++){
                firstsearch.push({
                  answers: quizzes[i].answers,
                  quiz: quizzes[i].quiz,
                  date: quizzes[i].date,
                  user: quizzes[i].user,
                  _id: quizzes[i]._id,
                  vote: quizzes[i].vote,
                  percentage: quizzes[i].percentage
                });
              }
              //console.log(firstsearch);
              callback();             
            }
            else{
              console.log('Nessun quiz svolto1');
              callback();
            }
          }
        });
      },

      function(callback){
        Quiz.find({ 'institution': req.session.user.institution }, function (err,quizzes){
          if (err) {
                console.log('error: ' + err);
                res.redirect('/');
          }
          else{
            if(quizzes){
              for(var i=0;i<firstsearch.length;i++){
                var found = false;
                for(var j=0;j<quizzes.length;j++){
                  if(quizzes[j]._id.equals(firstsearch[i].quiz)){
                    found = true;
                    firstsearch[i].name = quizzes[j].title;
                    firstsearch[i].topic = quizzes[j].topic;
                  }
                }
                if(!found){
                  firstsearch.splice(i,1);
                  i--;
                }
              }
              callback();             
            }
            else{
              console.log('Nessun quiz svolto2');
              callback();
            }
          }
        });
      },

      function(callback){
        Question.find({ 'institution': req.session.user.institution }, function (err,questions){
          if (err) {
                console.log('error: ' + err);
                res.redirect('/');
          }
          else{
            if(questions){
              for(var i=0;i<firstsearch.length;i++){
                var tmp = [];
                for(var j=0;j<firstsearch[i].answers.length;j++){
                  for(var k=0;k<questions.length;k++){
                    if(questions[k]._id.equals(firstsearch[i].answers[j].question)){
                      tmp.push({
                        title: questions[k].title,
                        solution: firstsearch[i].answers[j].solution
                      });
                    }
                  }
                }
                firstsearch[i].answers = tmp;
              }
              callback();             
            }
            else{
              console.log('Nessun quiz svolto2');
              callback();
            }
          }
        });
      }],function(err){
          if(err)
            console.log(err);
          else{
            res.send(firstsearch);
          }
      });
  }
  else res.redirect('/');
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

exports.prepareQuizExecution = function (req,res) { //storage delle informazioni nella sessione relative al quiz da eseguire

  console.log('------------------------ooo');
  console.log(req.body);
  console.log('------------------------ooo');

  Quiz.findOne({ '_id': req.body._id }, function (err,quiz){
    if (err) {
        console.log('error: ' + err);
        res.redirect('/');
    }
    else{
        if(quiz){
          req.session.quiz = {
            description: quiz.description,
            questions: quiz.questions,
            keywords: quiz.keywords,
            institution: quiz.institution,
            title: quiz.title,
            author: quiz.author,
            _id: quiz._id,
            classes: quiz.classes
          };
          if(quiz.difficulty == 1)
            req.session.quiz.difficulty = 'Facile';
          if(quiz.difficulty == 2)
            req.session.quiz.difficulty = 'Medio';
          if(quiz.difficulty == 3)
            req.session.quiz.difficulty = 'Difficile';
          if(quiz.difficulty == 4)
            req.session.quiz.difficulty = 'Molto difficile';

          console.log('------------------------AAA');
          console.log(req.session.quiz);
          console.log('------------------------AAA');
          res.send('Ok');
        }
        else{
            console.log('Nessun quiz trovato');
            res.send('Null');
        }
    }
  });
  
};

exports.fetchQuizToExecute = function (req,res) {

  if(req.session.quiz){
    console.log('Invio dai quiz da eseguire al client');
    res.send(req.session.quiz);
  }
  else{
    console.log('Quiz da eseguire non trovato in sessione');
    res.send({ code: 1, message: 'Errore nella selezione del quiz'});
  }
};

exports.search = function (req,res) { //ricerca quiz

  var results = [];
  var resultsParsed = [];

    Quiz.find({ classes: {$size: 0} }, function (err, quiz){
      if (err) {
          console.log('error: ' + err);
          res.redirect('/');
      }
      else{
        if(quiz){
          for(var i=0;i<quiz.length;i++){ //fetch all questions in institution
              results.push(quiz[i]);
          }

          if(req.body.title){
              for(var i=0;i<results.length;i++){ //filtra autore
                  if(results[i].title != req.body.title){
                      results.splice(i,1);
                      i--;
                  }
              }
          }

          if(req.body.author){
              for(var i=0;i<results.length;i++){ //filtra autore
                  if(results[i].author != req.body.author){
                      results.splice(i,1);
                      i--;
                  }
              }
          }

          if(req.body.difficulty){
              console.log(req.body.difficulty);
              for(var i=0;i<results.length;i++){ //filtra difficoltà
                  console.log(results[i].difficulty);
                  if(results[i].difficulty != req.body.difficulty){
                      results.splice(i,1);
                      i--;                                                                                                                            
                  }
              }
          }
                  
          if(req.body.topic){
              for(var i=0;i<results.length;i++){
                  if(results[i].topic != req.body.topic){
                      results.splice(i,1);
                      i--;
                  }
              }
          }

          if(req.body.keyword){
              for(var i=0;i<results.length;i++){ //filtra parola chiave
                  var topicFound = false;
                  for(var j=0;j<results[i].keywords.length && !topicFound;j++){
                      if(results[i].keywords[j] == req.body.keyword)
                          topicFound = true;
                  }
                  if(topicFound == false){
                      results.splice(i,1);
                      i--;
                  }
              }
          }      
          res.send(results);
        }
        else res.send({ code: 0, message: 'Nessun quiz trovato'});
      }
    });
};

exports.save = function (req,res) { //salvataggio quiz

  var quizDifficulty = 0;

  if(req.session.user && req.session.user.role == 'teacher'){

    var questionsIDs = [];

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
                          questionsIDs.push({ _id: req.body.questions[j]._id });
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
        console.log(req.body.topic);
        var quiz = new Quiz({
          author: req.session.user._id,
          creationDate: new Date(),
          classes: req.body.classes,
          topic: req.body.topic,
          description: req.body.description,
          difficulty: quizDifficulty,
          questions: questionsIDs,
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
};

exports.saveResults = function (req,res) { //salvataggio risultati quiz

  if(req.session.user && req.session.quiz && (req.session.quiz.classes.length!=0)){
    var date = new Date();
    var gettedAns = [];

    console.log('-----------------------------');
    console.log(req.body);
    console.log('-----------------------------');

    for(var i=0;i<req.body.quiz.answerQuestion.length;i++){
      gettedAns.push({
        question: req.body.quiz.answerQuestion[i].question._id,
        qml: 'Not available', //da modificare in caso di implementazione modifica domande
        solution: req.body.quiz.answerQuestion[i].isCorrect
      });
    }

    var resultQuiz = new ResultQuiz({
      user: req.session.user._id,
      date: date,
      answers: gettedAns,
      quiz: req.body.quiz.quiz,
      vote: req.body.voto,
      percentage: req.body.percentuale
    });
    
    resultQuiz.save(function (err){
      if (err) {
        console.log('errore nel salvataggio dei risultati del quiz: ' + err);
        res.send({ code: 1, message: 'Errore nel salvataggio dei risultati del quiz: ' + err });
      }
      else{
        console.log('Risultati del quiz salvati correttamente!');
        res.send({ code: 0, message: 'Risultati del quiz salvati correttamente!' });
      }

    });
  }
  else console.log('I quiz pubblici non vengono salvati!');
  

};

exports.remove = function (req,res) { //rimozione quiz
  Quiz.remove({ '_id': req.body._id }, function (err, quiz){
      if (err) {
          console.log('error: ' + err);
          res.redirect('/');
      }
      else{
          if(quiz){
              console.log('Quiz rimosso correttamente');
              res.send({ code: 0, message: 'Quiz rimosso correttamente!' });
          }
          else{
              console.log('Nessun quiz trovato');
              res.send({ code: 0, message: '/Quizzipedia/quizMgmt' });
          }
      }
  });
}

exports.fetchClassQuizzes = function (req,res) { //rimozione quiz
  
  var results = [];
  if(req.session.user && req.session.user.role == 'techer'){
    Quiz.find({ 'institution': req.session }, function (err, quizzes){
        if (err) {
            console.log('error: ' + err);
            res.redirect('/');
        }
        else{
            if(quizzes){
              for(var i=0;i<quizzes.length;i++){
                for(var j=0;j<quizzes[i].classes.length;j++){
                  if(quizzes[i].classes[j].equals(req.body._id)){
                    results.push(quizzes[i]);
                  }
                }
              }
              console.log('Quiz rimosso correttamente');
              res.send(results);
            }
            else{
                console.log('Nessun quiz trovato');
                res.send({ code: 1, message: 'Nessun quiz trovato' });
            }
        }
    });
  }
  else res.redirect('/');
}
