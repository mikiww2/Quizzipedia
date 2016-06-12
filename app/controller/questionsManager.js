/*
 * Nome del file: questionsManager.js
 * Percorso: app/controller/questionsManager.js
 * author: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 * Controller per il salvataggio, caricamento e ricerca di domande nel database
 *
 * * Diario delle modifiche:
 *
 */

var Question = require('../model/question.model');
var upload = require('../controller/uploadManager'); // usata per salvare gli allegati
var agent = require('./QMLAgent');

exports.save = function (req, res) {
    console.log("body");
    console.log(JSON.stringify(req.body, undefined, 2));

    var author = req.session.user._id;

    var question = new Question({
        author: author
        ,description: req.body.question.description
        ,topic: req.body.question.topic // ignorante o controlla che esistano veramente ?
        ,difficulty: req.body.question.difficulty
        ,keywords: req.body.question.keywords
        ,institution: req.session.user.institution
    });

    //sistemo gli allegati, author da recuperare da session
    if(req.body.question.questionAttachement.type != null) {
        var path = upload.save(author, req.body.question.questionAttachement.path, question._id);

        if(path) {
            console.log("salvataggio file " + path + " riuscito");

            req.body.question.questionAttachement.path = path;
        }
        else
            console.log("salvataggio file " + req.body.question.questionAttachement.path + " non riuscito");

        req.body.question.attachment = req.body.question.questionAttachement;
        delete req.body.question.questionAttachement;

    }



    if(req.body.question.arrayAnswer) {
        req.body.question.arrayAnswer.forEach(function(answer) {
            if(answer.attachment) {
                var path = upload.save(author, answer.attachment.path, question._id);

                if(path) {
                    console.log("salvataggio file " + path + " riuscito");

                    answer.attachment.path = path;
                }
                else
                    console.log("salvataggio file " + answer.attachment.path + " non riuscito");
            }
        });
    }

    //inserisco il qml
    question.qml = agent.generate(req.body);

    console.log("model della domanda");
    console.log(question);

    //salvo la domanda
    question.save(function(err) {
        if (err)
            console.log('errore nel salvataggio della domanda : ' + err);
        else
            console.log('domanda salvata correttamente');
    });
    // res.redirect('/Quizzipedia/mgmtQuestion');
    res.send({ result: "done" });
};

exports.fetch = function (req, res) {

    if(req.session.user){ //&& req.session.user.role == 'teacher' da aggiungere dopo

        Question.find({ 'author': req.session.user._id, 'institution': req.session.user.institution }, function (err, questions) {
            if (err) {
                console.log('error: ' + err);
                res.redirect('/');
            }
            else{
                if(questions)
                    res.send(questions);
                else{
                    console.log('Nessuna domanda trovata');
                    res.send('Null');
                }
            }
        });

    }
    else res.redirect('/');

};

exports.search = function (req, res, next) {
    var option = req.body;

    author  = req.session.user._id; //b author sempre definito
    var query = Question.find({ author: author });

    if(option.topic)
       query.where('topic').equals(option.topic);

    if(option.keywords)
        query.where('keywords').in(keywords);
    
    if(option.difficulty)
        query.where('difficulty').equals(difficulty);

    query.exec(function(err, questions) {
        if (err) {
            console.log('error: ' + err);
            res.send({ result: "error" });
        }
        else
            res.send(questions);
    });
};

exports.fetchQuestionsNumber = function (req, res, next) {

    if(req.session.user){ //&& req.session.user.role == 'teacher' da aggiungere dopo

        Question.find({ 'institution': req.session.user.institution }, function (err, questions) {
            if (err) {
                console.log('error: ' + err);
                res.redirect('/');
            }
            else{
                if(questions){
                    res.send({ questionsNumber: questions.length });
                }
                else{
                    console.log('Nessuna domanda trovata');
                    res.send({ questionsNumber: 0 });
                }
            }
        });

    }
    else res.redirect('/');
};

// exports.test = function (req, res) {
//     console.log("body");
//     console.log(JSON.stringify(req.body, undefined, 2));
//
//     var question = new Question({
//         //author: req.session.user._id
//         author: author
//         ,description: req.body.question.description
//         ,topic: req.body.question.topic
//         ,difficulty: req.body.question.difficulty
//         ,keywords: req.body.question.keywords
//     });
//
//     //sistemo gli allegati, author da recuperare da session
//     if(req.body.question.questionAttachement) {
//         var path = upload.save(author, req.body.question.questionAttachement, question._id);
//         delete req.body.question.attachment;
//         req.body.question.attachment = { // senza x e y
//             type: "img"
//             ,path: path
//         };
//     }
//
//     //inserisco il qml
//     question.qml = agent.generate(req.body);
//
//     console.log("model della domanda");
//     console.log(question);
//
//     //salvo la domanda
//     return question.save(function(err) {
//         if (err) {
//             console.log('errore nel salvataggio della domanda : ' + err);
//
//             return res.send({ result: "error" });
//
//         }
//         else {
//             console.log('domanda salvata correttamente');
//
//             // res.redirect('/Quizzipedia/mgmtQuestion');
//             return res.send({ result: "done" });
//         }
//
//     });
// };