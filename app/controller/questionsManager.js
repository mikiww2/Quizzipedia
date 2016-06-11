var Question = require('../model/question.model');
var upload = require('../controller/uploadManager'); // usata per salvare gli allegati
var agent = require('./QMLAgent');

var author = 'tmpauthor@gmail.com';  //poi da cancellare e recuperare sempre da req.session.user._id

exports.save = function (req, res) {
    console.log("body");
    console.log(JSON.stringify(req.body, undefined, 2));

    var question = new Question({
        //author: req.session.user._id
        author: author
        ,description: req.body.question.description
        ,topic: req.body.question.topic // ignorante o controlla che esistano veramente ?
        ,difficulty: req.body.question.difficulty
        ,keywords: req.body.question.keywords
    });

    //sistemo gli allegati, author da recuperare da session
    if(req.body.question.questionAttachement) {
        var path = upload.save(author, req.body.question.questionAttachement.path, question._id);

        if(path) {
            console.log("salvataggio file " + path + " riuscito");

            req.body.question.questionAttachement.path = path;
        }
        else
            console.log("salvataggio file " + req.body.question.questionAttachement.path + " non riuscito");
    }

    req.body.question.attachment = req.body.question.questionAttachement;
    delete req.body.question.questionAttachement;



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