"use strict";

var Question = require('../model/question.model')
    ,Quiz = require('../model/quiz.model')
    ,Organization = require('../model/organization.model')
    ,User = require('../model/user.model')
    ,ResultQuiz = require('../model/resultQuiz.model')
    ,async = require('async');

exports.get_students_results = function (req, res) {
    var institution = req.session.user.institution
        ,user = req.session.user._id
        ,role = req.session.user.role;

    var quiz = req.body.quiz,
        clas = req.body.class;

    if(institution && user && role && role == 'teacher') {
        console.log(user + ' è autorizzato');

        var con = true,
            rQuiz = null,
            Users = null;

        async.series([
            function (done) { //da rimuovere, prendo un quiz a caso per testare
                Quiz.findOne({}, function (err, q) {
                    quiz = q._id;
                    clas = q.classes[0];

                    done();
                });
            },
            //
            function (done) { // controllo se da quiz mi arriva un id valido
                Quiz.findOne({ _id: quiz }, function (err, q) {
                    if(err) {
                        con = false;
                        console.log(err);
                        res.send({result: 'error'});
                        return done();
                    }

                    if(!q) { // non esiste il quiz con id = quiz
                        con = false;
                        console.log("quiz inesistente ");
                        res.send({result: 'error'});
                        return done();
                    }

                    var t = false;
                    for (var c of q.classes) {
                        if(c._id = clas)
                            t = true;
                    }

                    if(!t) { // il quiz non ha la classe con id = clas
                        con = false;
                        console.log("classe inesistente ");
                        res.send({result: 'error'});
                        return done();
                    }

                    quiz = q;

                    done();
                });
            },
            function(done) { // prendo tutti i resultQuiz di quel quiz
                if(!con)
                    return done();

                ResultQuiz.find({ quiz: quiz._id }, function (err, quizs) {
                    if (err) {
                        con = false;
                        console.log(err);
                        res.send({result: 'error'});
                        return done();
                    }

                    if (!quizs || !quizs.length) { // non esistono resultQuiz di quiz
                        con = false;
                        console.log("quiz mai eseguito ");
                        res.send({result: 'done', students: []});
                        return done();
                    }

                    rQuiz = quizs;

                    return done();
                });
            },
            function(done) { // prendo nome e cognome di tutti gli utenti
                if(!con)
                    return done();

                User.find({}, 'firsName lastName', function (err, user) {
                    if (err) {
                        con = false;
                        console.log(err);
                        res.send({result: 'error'});
                        return done();
                    }

                    if (!user || !user.length) { // non esistono utenti di quiz
                        con = false;
                        console.log("utenti non presenti ");
                        res.send({result: 'done', students: []});
                        return done();
                    }

                    Users = user;

                    done();
                });
            },
            function(done) { // per ogni risultato calcolo le info necessarie
                if(!con)
                    return done();

                rQuiz.forEach(function(rq) {

                    Users.forEach(function(u) { // recupero nome e cognome
                        if(u._id == rq.user){
                            rq.firstName = u.firstName;
                            rq.lastName = u.lastName;
                        }

                        if(rq.firstName == undefined || rq.lastName == undefined) { // nome e cognome non trovati
                            con = false;
                            console.log("utente non identificato ");
                            res.send({ result: 'error' });
                            return done();
                        }
                    });

                    rq.total = rq.answers.length;

                    rq.correct = 0;

                    rq.answers.forEach(function(ans) {
                        if(ans.solution)
                            rq.correct++;
                    });

                    rq.percentual = rq.correct / rq.total * 100;
                });

                return done();
            },
            function(done) {
                if (c)
                    res.send({ result: "done", students: rQuiz });

                return done();
            }
        ]);
    }
    else {
        console.log(user + ' non è autorizzato');

        return res.send({ result: 'error' });
    }
};

exports.quiz_results = function (req, res) {
    var institution = req.session.user.institution
        ,user = req.session.user._id
        ,role = req.session.user.role;

    if(institution && user && role && role == 'teacher') {
        console.log(user + ' è autorizzato');

        var Quizs = null,
            rQuiz = null,
            con = true,
            Orgs = null;

        async.series([
            function (done) { // recupero tutti i quiz di quel docente
                Quiz.find({author: user}, function (err, quizs) {
                    if (err) {
                        con = false;
                        console.log(err);
                        res.send({result: 'error'});
                        return done();
                    }

                    if (!quizs || !quizs.length) { // non esistono qui di quell'utente
                        con = false;
                        console.log("il docente non ha nessun quiz ");
                        res.send({result: 'done', quiz: []});
                        return done();
                    }
                    Quizs = quizs;

                    return done();
                });
            },
            function(done) { // recupero tutti i resultQuiz
                if(!con)
                    return done();

                ResultQuiz.find({ }, function (err, quizs) {
                    if (err) {
                        con = false;
                        console.log(err);
                        res.send({result: 'error'});
                        return done();
                    }

                    if (!quizs || !quizs.length) { // non esistono quiz eseguiti
                        con = false;
                        console.log("non ci sono qui eseguiti");
                        res.send({result: 'done', quiz: []});
                        return done();
                    }
                    rQuiz = quizs;

                    return done();
                });
            },
            function(done) { // recupero le classi
                if(!con)
                    return done();

                Organization.find({ }, 'classes', function (err, q) {
                    if (err) {
                        con = false;
                        console.log(err);
                        res.send({result: 'error'});
                        return done();
                    }

                    if (!q || !q.length) { // non esistono classi e organizzazioni
                        con = false;
                        console.log("non ci sono qui eseguiti");
                        res.send({result: 'done', quiz: []});
                        return done();
                    }
                    Orgs = q;

                    return done();
                });
            },
            function(done) { // per ogni risultato calcolo le info necessarie
                if(!con)
                    return done();

                Quizs.forEach(function(q) {

                    var ar = [];

                    q.classes.forEach(function(cls) { //pubblico o privato
                        Orgs.forEach(function(org) {
                            if(org.name == q.institution){
                                org.classes.forEach(function(c) {
                                    if(c._id == cls)
                                        ar.push({
                                            name: c.name,
                                            accademicYear: c.accademicYear
                                        });
                                });
                            }
                        });
                    });

                    q.classes = ar;

                    q.total = q.questions.length;

                    var sumCorrect = 0,
                        n = 0,
                        sup = 0.6,
                        sumPerc = 0;

                    rQuiz.forEach(function(r) { //valori per ogni singolo quiz eseguito
                        if (r.quiz == q._id) {
                            n++;

                            var t = 0;
                            r.answers.forEach(function (an) {
                                if (an.solution)
                                    t++;
                            });

                            sumCorrect += t;

                            if (t / q.total >= sup) // se il quiz è superato
                                sumPerc++;
                        }
                    });

                    q.percentual = sumPerc/n * 100;

                    q.executed = n;

                    q.avg = sumCorrect / n;
                });

                return done();
            },
            function(done) {
                if (c)
                    res.send({ result: "done", quiz: Quizs });

                return done();
            }
        ]);
    }
    else{
        console.log(user + ' non è autorizzato');

        return res.send({ result: 'error' });
    }
};

exports.question_results = function (req, res) {
    var institution = req.session.user.institution
        ,user = req.session.user._id
        ,role = req.session.user.role;

    if(institution && user && role && role == 'teacher') {
        console.log(user + ' è autorizzato');

        var result = [],
            Quizs = null,
            rQuiz = null,
            con = true,
            Ques = null;

        async.series([
            function (done) { // recupero tutte le domande di quel docente
                Question.find({ author: user }, function (err, questions) {
                    if (err) {
                        con = false;
                        console.log(err);
                        res.send({result: 'error'});
                        return done();
                    }

                    if (!questions || !questions.length) { // non esistono domande di quell'utente
                        con = false;
                        console.log("il docente non ha nessuna domanda ");
                        res.send({result: 'done', question: []});
                        return done();
                    }
                    Ques = questions;

                    return done();
                });
            },
            function(done) { // recupero tutti i resultQuiz
                if(!con)
                    return done();

                ResultQuiz.find({ }, function (err, quizs) {
                    if (err) {
                        con = false;
                        console.log(err);
                        res.send({result: 'error'});
                        return done();
                    }

                    if (!quizs || !quizs.length) { // non esistono quiz eseguiti
                        con = false;
                        console.log("non ci sono qui eseguiti");
                        res.send({result: 'done', question: []});
                        return done();
                    }
                    rQuiz = quizs;

                    return done();
                });
            },
            function (done) { // recupero tutti i quiz
                if(!con)
                    return done();
                Quiz.find({}, function (err, quiz) {
                    if (err) {
                        con = false;
                        console.log(err);
                        res.send({result: 'error'});
                        return done();
                    }

                    if (!quiz || !quiz.length) { // non esistono quiz
                        con = false;
                        console.log("non esiste nessun quiz ");
                        res.send({result: 'done', question: []});
                        return done();
                    }
                    Quizs = quiz;

                    return done();
                });
            },
            function(done) { // per ogni risultato calcolo le info necessarie
                if (!con)
                    return done();

                Ques.forEach(function (q) {

                    q.used = 0;
                    Quizs.forEach(function (quiz) { // uso della domanda sui quiz
                        var t = false;

                        quiz.questions.forEach(function (qq) {
                            if (qq == q._id)
                                t = true;
                        });

                        if (t)
                            q.used++;
                    });
                    
                    
                    
                    rQuiz.forEach(function(r) {
                        
                        
                        
                        
                    });


                });

                return done();
//

// //
// //                     q.classes = ar;
// //
// //                     q.total = q.questions.length;
// //
// //                     var sumCorrect = 0,
// //                         n = 0,
// //                         sup = 0.6,
// //                         sumPerc = 0;
// //
// //                     rQuiz.forEach(function(r) { //valori per ogni singolo quiz eseguito
// //                         if (r.quiz == q._id) {
// //                             n++;
// //
// //                             var t = 0;
// //                             r.answers.forEach(function (an) {
// //                                 if (an.solution)
// //                                     t++;
// //                             });
// //
// //                             sumCorrect += t;
// //
// //                             if (t / q.total >= sup) // se il quiz è superato
// //                                 sumPerc++;
// //                         }
// //                     });
// //
// //                     q.percentual = sumPerc/n * 100;
// //
// //                     q.executed = n;
// //
// //                     q.avg = sumCorrect / n;
// //                 });
// //
// //                 return done();
            },
            function(done) {
                if (c)
                    res.send({ result: "done", quiz: result });

                return done();
            }
        ]);
    }
    else{
        console.log(user + ' non è autorizzato');

        return res.send({ result: 'error' });
    }
};



// };
//     var institution = req.session.user.institution
//         ,user = req.session.user._id
//         ,role = req.session.user.role;
//
//     if(institution && user && role && role == 'teacher') {
//         console.log(user + ' è autorizzato');
//
//         return Question.find({
//             author: user
//             ,institution: institution
//         }, ['_id', 'title', 'topic', 'difficulty'])
//         .exec(function(err, questions) {
//             if(err)
//                 return show_error(res, 'errore in question.find ' + err, { result: 'error' });
//
//             if(questions && questions.length) {
//                 console.log(user + ' ha creato ' + questions.length +' domande');
//                 var result = [];
//
//                 questions.forEach(function(question) {
//                     var q = {
//                         title: question.title
//                         ,topic: question.topic
//                         ,difficulty: question.difficulty
//                     };
//                     q.use = question_use(question._id);
//
//                     var stat = question_stat(question._id);
//
//                     q.execution = stat.total;
//                     q.percentual = stat.correct / stat.total * 100;
//
//                     result.push(q);
//                 });
//
//                 return res.send({ result: 'done', questions: result });
//             }
//             else
//                 return show_error(res, user + ' non ha creato domande', { result: 'done', questions: null });
//         });
//     }
//     else
//         return show_error(res, user + ' non è autorizzato', { result: 'error' });
// };

// var question_use =  function(id) {
//     if(id) {
//         return Quiz.count({ questions: id }) // forse non trova id così
//         .exec(function(err,n) {
//             if(err)
//                 return show_error(null, err, null);
//
//             return n;
//         });
//     }
//     else
//         return show_error(null, 'question_use errore con id vuoto', null);
// };

// var question_stat = function(id) {
//     var result = {
//         correct: 0
//         ,total: 0
//     };
//
//     if(id) {
//         return ResultQuiz.find({ answers: { $in: { question: id }} })
//         .exec(function(err, quizs) {
//             if(err)
//                 return show_error(null, err, result);
//
//             if(quizs && quizs.length) {
//
//                 quizs.forEach(function(quiz) {
//                     quiz.answers.findOne({ question: id }, 'solution', function(err, s) {
//                         if(err)
//                             return show_error(null, err, null);
//
//                         result.total++;
//                         if(s.solution) //o così o s diretto
//                             result.correct++;
//                     });
//                 });
//             }
//
//             return result;
//         });
//     }
//     else
//         return show_error(null, 'question_stat errore con id vuoto', result);

// exports.teacher = function (req, res) {
//     var institution = req.session.user.institution,
//         user = req.session.user._id,
//         role = req.session.user.role;
//
//     var teacher = req.body.teacher;
//
//     if(institution && user && role && role == 'teacher') {
//         console.log(user + ' è autorizzato ');
//         var result = [],
//             c = true;
//
//         async.series([
//             function(done) {
//
//
//
//
// //
// //         return Quiz.find({ author: user, institution: institution  }, ['title', 'topics'])
// //             .exec(function(err, quizs) {
// //                 if(err)
// //                     return show_error(res, 'errore su quiz.find ' + err, { result: 'error' });
// //
// //                 if(quizs && quizs.length)
// //                     result[0] = quizs;
// //                 else
// //                     result[0] = null;
// //
// //                 return Question.find({ author: user, institution: institution  }, ['title', 'topic'])
// //                     .exec(function(err, questions) {
// //                         if(err)
// //                             return show_error(res, 'errore su question.find ' + err, { result: 'error' });
// //
// //                         if(questions && questions.length)
// //                             result[1] = questions;
// //                         else
// //                             result[1] = null;
// //
// //                         return res.send({
// //                             arrayQuiz: result[0]
// //                             ,arrayQuestion: result[1]
// //                         });
// //                     });
// //             });
//
//         },
//         function(done) {
//             if (c)
//                 res.send({ result: "done", quiz: result });
//
//             return done();
//         }
//         ]);
//     }
//
//     else{
//         console.log(user + ' non è autorizzato');
//
//         return res.send({ result: 'error' });
//     }
// };
//
//
//
//
//
//
//
// //
// //         var result = [],
// //             Quizs = null,
// //             rQuiz = null,
// //             con = true,
// //             Orgs = null;
// //
// //         async.series([
// //             function (done) { // recupero tutti i quiz di quel docente
// //                 Quiz.find({author: user}, function (err, quizs) {
// //                     if (err) {
// //                         con = false;
// //                         console.log(err);
// //                         res.send({result: 'error'});
// //                         return done();
// //                     }
// //
// //                     if (!quizs || !quizs.length) { // non esistono qui di quell'utente
// //                         con = false;
// //                         console.log("il docente non ha nessun quiz ");
// //                         res.send({result: 'done', quiz: []});
// //                         return done();
// //                     }
// //                     Quizs = quizs;
// //
// //                     return done();
// //                 });
// //             },
// //             function(done) { // recupero tutti i resultQuiz
// //                 if(!con)
// //                     return done();
// //
// //                 ResultQuiz.find({ }, function (err, quizs) {
// //                     if (err) {
// //                         con = false;
// //                         console.log(err);
// //                         res.send({result: 'error'});
// //                         return done();
// //                     }
// //
// //                     if (!quizs || !quizs.length) { // non esistono quiz eseguiti
// //                         con = false;
// //                         console.log("non ci sono qui eseguiti");
// //                         res.send({result: 'done', quiz: []});
// //                         return done();
// //                     }
// //                     rQuiz = quizs;
// //
// //                     return done();
// //                 });
// //             },
// //             function(done) { // recupero le classi
// //                 if(!con)
// //                     return done();
// //
// //                 Organization.find({ }, 'classes', function (err, q) {
// //                     if (err) {
// //                         con = false;
// //                         console.log(err);
// //                         res.send({result: 'error'});
// //                         return done();
// //                     }
// //
// //                     if (!q || !q.length) { // non esistono classi e organizzazioni
// //                         con = false;
// //                         console.log("non ci sono qui eseguiti");
// //                         res.send({result: 'done', quiz: []});
// //                         return done();
// //                     }
// //                     Orgs = q;
// //
// //                     return done();
// //                 });
// //             },
// //             function(done) { // per ogni risultato calcolo le info necessarie
// //                 if(!con)
// //                     return done();
// //
// //                 Quizs.forEach(function(q) {
// //
// //                     var ar = [];
// //
// //                     q.classes.forEach(function(cls) { //pubblico o privato
// //                         Orgs.forEach(function(org) {
// //                             if(org.name == q.institution){
// //                                 org.classes.forEach(function(c) {
// //                                     if(c._id == cls)
// //                                         ar.push({
// //                                             name: c.name,
// //                                             accademicYear: c.accademicYear
// //                                         });
// //                                 });
// //                             }
// //                         });
// //                     });
// //
// //                     q.classes = ar;
// //
// //                     q.total = q.questions.length;
// //
// //                     var sumCorrect = 0,
// //                         n = 0,
// //                         sup = 0.6,
// //                         sumPerc = 0;
// //
// //                     rQuiz.forEach(function(r) { //valori per ogni singolo quiz eseguito
// //                         if (r.quiz == q._id) {
// //                             n++;
// //
// //                             var t = 0;
// //                             r.answers.forEach(function (an) {
// //                                 if (an.solution)
// //                                     t++;
// //                             });
// //
// //                             sumCorrect += t;
// //
// //                             if (t / q.total >= sup) // se il quiz è superato
// //                                 sumPerc++;
// //                         }
// //                     });
// //
// //                     q.percentual = sumPerc/n * 100;
// //
// //                     q.executed = n;
// //
// //                     q.avg = sumCorrect / n;
// //                 });
// //
// //                 return done();
// //             },
// //

