"use strict";

var Question = require('../model/question.model')
    ,Quiz = require('../model/quiz.model')
    ,Organization = require('../model/organization.model')
    ,User = require('../model/user.model')
    ,ResultQuiz = require('../model/resultQuiz.model');

exports.get_students_results = function (req, res) {
    var institution = req.session.user.institution
        ,user = req.session.user._id
        ,role = req.session.user.role
        ,quiz = req.body.quiz;

    if(institution && user && role && role == 'teacher') {
        console.log(user + ' è autorizzato');

        return ResultQuiz.find({ quiz: quiz })
        .exec(function(err, quizs) {
            if(err)
                return show_error(res, 'errore in resultquiz.find ' + err, { result: 'error' });

            if(quizs && quizs.length) {
                var result = [];

                quizs.forEach(function(quiz) {

                    return User.find({ _id: quiz.user }, ['firstName', 'lastName'])
                    .exec(function(err, u) {
                        if(err)
                            return show_error(res, 'errore in user.find ' + err, { result: 'error' });

                        u.correct = 0;
                        u.total= 0;

                        quiz.answers.forEach(function(answer) {
                            u.total++;
                            if(answer.solution)
                                u.correct++;
                        });

                        u.percentual = u.correct / u.total * 100;

                        return result.push(u);
                    });
                });

                return res.send({ result: "done", students: result });
            }
            else {
                return res.send({ result: "done", students: null });
            }
        });
    }
    else
        return show_error(res, user + ' non è autorizzato', { result: 'error' });
};

exports.quiz_results = function (req, res) {
    var institution = req.session.user.institution
        ,user = req.session.user._id
        ,role = req.session.user.role;

    if(institution && user && role && role == 'teacher') {
        console.log(user + ' è autorizzato');

        return Quiz.find.find({
            author: user
            ,institution: institution
        },['_id', 'title', 'topics', 'difficulty', 'classes'])
        .exec(function(err, quizs) {
            if(err)
                return show_error(res, 'errore in question.find ' + err, { result: 'error' });

            if (quizs && quizs.length) {
                console.log(user + ' ha creato ' + quizs.length + ' quiz');

                var result = [];

                quizs.forEach(function (quiz) {
                    var q = {
                        title: quiz.title
                        , topics: quiz.topics
                        , difficulty: quiz.difficulty
                    };

                    q.clearance = quiz_clearance(quiz.classes);

                    var stat = quiz_stat(quiz._id);

                    if (stat.total) {
                        stat.correct = 0;
                        stat.avg = 0;

                        stat.res.forEach(function (r) {
                            stat.avg += r;
                            if (r / stat.total >= 0.6)
                                correct++;
                        });

                        q.execution = stat.total;
                        q.percentual = stat.correct / stat.total * 100;
                        q.avg = (stat.avg / stat.total) + "/" + stat.total;
                    }
                    else {
                        q.execution = 0;
                        q.percentual = 100;
                        q.avg = "0/0";
                    }

                    result.push(q);
                });

                return res.send({result: 'done', quiz: result});
            }
            else
                return show_error(res, user + ' non ha creato quiz', {result: 'done', quiz: null});

        });
    }
    else
        return show_error(res, user + ' non è autorizzato', { result: 'error' });
};

exports.question_results = function (req, res) {
    var institution = req.session.user.institution
        ,user = req.session.user._id
        ,role = req.session.user.role;

    if(institution && user && role && role == 'teacher') {
        console.log(user + ' è autorizzato');

        return Question.find({
            author: user
            ,institution: institution
        }, ['_id', 'title', 'topic', 'difficulty'])
        .exec(function(err, questions) {
            if(err)
                return show_error(res, 'errore in question.find ' + err, { result: 'error' });

            if(questions && questions.length) {
                console.log(user + ' ha creato ' + questions.length +' domande');
                var result = [];
                
                questions.forEach(function(question) {
                    var q = {
                        title: question.title
                        ,topic: question.topic
                        ,difficulty: question.difficulty
                    };
                    q.use = question_use(question._id);

                    var stat = question_stat(question._id);

                    q.execution = stat.total;
                    q.percentual = stat.correct / stat.total * 100;

                    result.push(q);
                });

                return res.send({ result: 'done', questions: result });
            }
            else
                return show_error(res, user + ' non ha creato domande', { result: 'done', questions: null });
        });
    }
    else
        return show_error(res, user + ' non è autorizzato', { result: 'error' });
};

exports.teacher = function (req, res) {
    var result = []
        ,institution = req.session.user.institution
        ,user = req.session.user._id
        ,role = req.session.user.role;

    if(institution && user && role && role == 'teacher') {
        console.log(user + ' è autorizzato ');

        return Quiz.find({ author: user, institution: institution  }, ['title', 'topics'])
        .exec(function(err, quizs) {
            if(err)
                return show_error(res, 'errore su quiz.find ' + err, { result: 'error' });

            if(quizs && quizs.length)
                result[0] = quizs;
            else
                result[0] = null;

            return Question.find({ author: user, institution: institution  }, ['title', 'topic'])
            .exec(function(err, questions) {
                if(err)
                    return show_error(res, 'errore su question.find ' + err, { result: 'error' });

                if(questions && questions.length)
                    result[1] = questions;
                else
                    result[1] = null;

                return res.send({
                    arrayQuiz: result[0]
                    ,arrayQuestion: result[1]
                });
            });
        });
    }
    else
        return show_error(res, user + ' non è autorizzato', { result: 'error' });
};

// funzioni di supporto

var show_error = function(res, string, result) {
    console.log(string);
    if(res)
        return res.send(result);
    return result;
};

var quiz_clearance = function(classes) {
    if(classes.length) {
        var result = [];
        classes.forEach(function(clas) {
            Organization.findOne({ classes: { $in: { _id: clas } } }, 'classes')
            .exec(function(err, cl) {
                if(err)
                    return show_error(null, 'errore su organization.find ' + err, result);

                if(cl && cl.length) {
                    cl.forEach(function(c) {
                        if(c._id == clas)
                            result.push({ name: c.name, academicYear: c.academicYear });
                    });
                }
                else
                    return show_error(null, "impossibile identificare l'ente della classe " + clas, null);
            });
        });

        return result;
    }
    else
        return [];
};

var quiz_stat = function(id) {
    var result = {
        total: 0
        ,questions: 0
        ,res: []
    };

    if(id) {
        return ResultQuiz.find({ _id: id })
        .exec(function(err, quizs) {
            if(err)
                return show_error(null, err, result);

            if(quizs && quizs.length) {
                result.questions = quizs[0].answers.length;

                quizs.forEach(function(quiz) {
                    result.total++;

                    var n = 0;

                    quiz.answers.forEach(function(ans) {
                        if(ans.solution)
                            n++;
                    });

                    result.res.push(n);
                });

                return result;
            }
            else
                return result;
        });
    }
    else
        return show_error(null, 'quiz_stat errore con id vuoto', result);
};

var question_use =  function(id) {
    if(id) {
        return Quiz.count({ questions: id }) // forse non trova id così
        .exec(function(err,n) {
            if(err)
                return show_error(null, err, null);

            return n;
        });
    }
    else
        return show_error(null, 'question_use errore con id vuoto', null);
};

var question_stat = function(id) {
    var result = {
        correct: 0
        ,total: 0
    };

    if(id) {
        return ResultQuiz.find({ answers: { $in: { question: id }} })
        .exec(function(err, quizs) {
            if(err)
                return show_error(null, err, result);

            if(quizs && quizs.length) {

                quizs.forEach(function(quiz) {
                    quiz.answers.findOne({ question: id }, 'solution', function(err, s) {
                        if(err)
                            return show_error(null, err, null);

                        result.total++;
                        if(s.solution) //o così o s diretto
                            result.correct++;
                    });
                });
            }

            return result;
        });
    }
    else
        return show_error(null, 'question_stat errore con id vuoto', result);
};