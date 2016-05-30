var TFQuestion = require('../model/truefalse.question.model');

exports.save = function (req, res) {

		var author = 'tmpauthor@gmail.com';  //poi da prendere dalla sessione (al momento test)
		var newTFQ = new TFQuestion();
		newTFQ = req.body;
		newTFQ.author = author;
		newTFQ.save(function (err) {
      if (err) {
          console.log('errore nel salvataggio domanda: ' + err);
      }
      else {
             console.log('domanda salvata correttamente');
          }
    });
    res.redirect('/Quizzipedia/mgmtQuestion');
};

exports.fetch = function (req, res) {

		var email = req.session.user._id;
		TFQuestion.findAll(function (err, questions) {  //poi da filtrare secondo l'email della sessione (al momento test)
        if (err) {
            console.log('error: ' + err);
            res.redirect('/');
        }
        else {
              res.send(questions);
        }
    });
};
