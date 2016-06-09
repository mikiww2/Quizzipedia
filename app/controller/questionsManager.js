var Question = require('../model/question.model');
var upload = require('../controller/uploadManager'); // usata per salvare gli allegati
var agent = require('./QMLAgent');

var author = 'tmpauthor@gmail.com';  //poi da cancellare e recuperare sempre da req.session.user._id

exports.save = function (req, res) {
    console.log("body");
    console.log(req.body);

    var question = new Question({
        //author: req.session.user._id
        author: author
        ,description: req.body.question.description
        ,topic: req.body.question.topic // ignorante o controlla che esistano veramente ?
        ,difficulty: req.body.question.difficulty
        ,keywords: req.body.question.keywords
    });

    //sistemo gli allegati

    //upload.save per ogni allegato
    //qml agent (req.body sporcato con i link degli allegati)
    // salvataggio nel model

    // per ogni allegato devo avere, circa
    // attachement = {
    //     type:
    //     ,path: upload.save(question.author, req.body.questionAttachement, question._id);
    //     ,x
    //     ,y
    //     , a quale risposta ? bho
    // };



    //sistemo gli allegati, author da recuperare da session
    if(req.body.question.questionAttachement) {
        var path = upload.save(author, req.body.question.questionAttachement, question._id);
        delete req.body.question.attachment;
        req.body.question.attachment = { // senza x e y
            type: "img"
            ,path: path
        };
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
    //author  = req.session.user._id;

    Question.find({ author: author }, function (err, questions) {  //poi da filtrare secondo l'email della sessione (al momento test)
        if (err) {
            console.log('error: ' + err);
            res.redirect('/');
        }
        else
            res.send(questions);
    });
};

exports.search = function (req, res, next) {
    var option = req.body;

    //author  = req.session.user._id; //b autore sempre definito
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

exports.test = function (req, res) {
    console.log("body");
    console.log(req.body);

    var question = new Question({
        //author: req.session.user._id
        author: author
        ,description: req.body.question.description
        ,topic: req.body.question.topic
        ,difficulty: req.body.question.difficulty
        ,keywords: req.body.question.keywords
    });

    //sistemo gli allegati, author da recuperare da session
    if(req.body.question.questionAttachement) {
        var path = upload.save(author, req.body.question.questionAttachement, question._id);
        delete req.body.question.attachment;
        req.body.question.attachment = { // senza x e y
            type: "img"
            ,path: path
        };
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
