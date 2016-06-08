var TFQuestion = require('../model/truefalse.question.model');
var upload = require('../controller/uploadManager'); // usata per salvare gli allegati
var agent = require('./QMLAgent');

exports.save = function (req, res) {
    var author = 'tmpauthor@gmail.com';  //poi da prendere dalla sessione (al momento test)
    var newTFQ = new TFQuestion();

    //newTFQ.author  = req.session.user._id;
    newTFQ.author = author;
    newTFQ.title = req.body.title;
    newTFQ.description = req.body.description;
    newTFQ.topic = req.body.topic;
    newTFQ.difficulty = req.body.difficulty;
    newTFQ.questionAttachement = upload.save(newTFQ.author, req.body.questionAttachement, newTFQ._id);

    console.log(newTFQ.questionAttachement);

    newTFQ.keywords = req.body.keywords;
    newTFQ.correctAnswer = req.body.correctAnswer;
    newTFQ.save(function (err) {
      if (err)
          console.log('errore nel salvataggio domanda: ' + err);
      else
          console.log('domanda salvata correttamente');
    });
    res.redirect('/Quizzipedia/mgmtQuestion');
};

exports.fetch = function (req, res) {
    //var email = req.session.user._id;

    TFQuestion.find(function (err, questions) {  //poi da filtrare secondo l'email della sessione (al momento test)
    if (err) {
        console.log('error: ' + err);
        res.redirect('/');
    }
    else
        res.send(questions);
    });
};

exports.test = function (req, res) {
    console.log(req.body);
    console.log('QML = ' + agent.generate(req.body));
    res.send(req.body);
};
