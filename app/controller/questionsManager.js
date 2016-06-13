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
"use strict";

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

exports.search = function (req, res, next) {
    
    var results = [];
    if(req.session.user /*&& req.session.user.role == 'teacher'*/) {
        Question.find({ 'institution': req.session.user.institution }, function (err, questions){
            console.log(req.body);
            for(var i=0;i<questions.length;i++){ //fetch all questions in institution
                results.push(questions[i]);
            }

            if(req.body.author)
                for(var i=0;i<results.length;i++){ //filtra autore
                    if(results[i].author != req.body.author)
                        results.splice(i,1);
                }

            if(req.body.difficulty){
                console.log(); //da testare ancora
                for(var i=0;i<results.length;i++){ //filtra difficoltà
                    if(results[i].difficulty != req.body.difficulty)
                        results.splice(i,1);                                                                                                                            
                }
            }

            if(req.body.topic)
                for(var i=0;i<results.length;i++){
                    if(results[i].topic == req.body.topic)
                        results.splice(i,1);
                }

            if(req.body.keyword)
                for(var i=0;i<results.length;i++){ //filtra parola chiave
                    var topicFound = false;
                    for(var j=0;j<results[i].keywords.length || topicfound;j++){
                        if(results[i].keywords[j] == req.body.keyword)
                            topicFound = true;
                    }
                    if(topicFound == false)
                        results.splice(i,1);
                }

            res.send(results);
        });
    }
    else {
        console.log(user + ' non è autorizzato');
        res.redirect('/');
    }
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
                    res.send({ number: questions.length });
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

exports.fetchTeacherQuestions = function (req, res, next) {

    var results = [];
    if(req.session.user && req.session.user.role == 'teacher'){

        Question.find({ 'institution': req.session.user.institution, 'author': req.session.user._id }, function (err, questions) {
            if (err) {
                console.log('error: ' + err);
                res.redirect('/');
            }
            else{
                if(questions){
                    for(var i=0;i<questions.length;i++){
                        var parsed = agent.parse(questions[i].qml);
                        /*console.log(parsed);
                        console.log(questions[i]);*/
                        results.push({
                            title: parsed.question.title,
                            institution: questions[i].institution,
                            difficulty: questions[i].difficulty,
                            topic: questions[i].topic,
                            description: questions[i].description,
                            author: questions[i].author,
                            keywords: questions[i].keywords
                        });
                    }
                    res.send(results);
                }
                else{
                    console.log('Nessuna domanda trovata');
                    res.send('Null');
                }
            }
        });

    }
    else res.redirect('/');
};