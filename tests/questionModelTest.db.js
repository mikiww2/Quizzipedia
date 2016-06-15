'use strict';

var should = require('should'),
    database = require('./config/database.test'),
    mongoose = require('mongoose'),
    Question = require('../app/model/question.model');
require('mocha-mongoose')(database.localUrl);

var question,
    qml1 = '|erdionbhjn|',
    qml2 = '|dpr|',
    topic1 = 'Matematica',
    topic2 = 'Storia',
    title1 = 'titolo 1',
    title2 = 'titolo 2',
    keywords1 = ['eee', 'rtyut'],
    keywords2 = ['wert', 'cvgyu n'],
    difficulty1 = 1,
    difficulty2 = 3,
    author1 = 'a@b.c',
    author2 = 'b@c.d',
    description1 = 'gncien jcbuje xhe',
    description2 = 'ciccio caio amariiuuu',
    institution = 'object id dell\'ente';

describe('question.model.js unit tests :', function() {
    beforeEach(function(done) {
        if (mongoose.connection.db)
            return done();

        return mongoose.connect(database.localUrl, function () {
            return done();
        });
    });

    describe('can save', function() {
        it("question 1 without topic, keywords, description", function(done) {
            question = new Question({
                qml: qml1
                ,difficulty: difficulty1
                ,author: author1
                ,institution: institution
                ,title: title1
            });

            should.exist(question);
            should.exist(question.qml);
            should.exist(question.difficulty);
            should.exist(question.author);
            should.exist(question.institution);
            should.exist(question.title);
            should.not.exist(question.topic);
            should.exist(question.keywords);
            should.not.exist(question.description);

            question.qml.should.be.a.String().and.be.exactly(qml1);
            question.difficulty.should.be.a.Number().and.be.exactly(difficulty1);
            question.author.should.be.a.String().and.be.exactly(author1);
            question.institution.should.be.a.String().and.be.exactly(institution);
            question.title.should.be.a.String().and.be.exactly(title1);
            question.keywords.should.be.a.Array();
            question.keywords.length.should.be.exactly(0);

            return question.save(function(e, q, nRow) {
                should.not.exist(e);
                should.exist(q);
                nRow.should.be.a.Number().and.be.exactly(1);
                
                return Question.find({}, function(er, qq) {
                    should.not.exist(er);

                    should.exist(qq.length);
                    qq.length.should.be.a.Number().and.be.exactly(1);
                    should.exist(qq[0]);

                    qq = qq[0];
                    
                    should.exist(qq);
                    should.exist(qq.qml);
                    should.exist(qq.difficulty);
                    should.exist(qq.author);
                    should.exist(qq.institution);
                    should.exist(qq.title);
                    should.not.exist(qq.topic);
                    should.exist(qq.keywords);
                    should.not.exist(qq.description);

                    qq.qml.should.be.a.String().and.be.exactly(qml1);
                    qq.difficulty.should.be.a.Number().and.be.exactly(difficulty1);
                    qq.author.should.be.a.String().and.be.exactly(author1);
                    qq.institution.should.be.a.String().and.be.exactly(institution);
                    qq.title.should.be.a.String().and.be.exactly(title1);
                    qq.keywords.should.be.a.Array();
                    qq.keywords.length.should.be.exactly(0);
                    
                    return done();
                });
            });
        });

        it("question 2 without topic, keywords, description", function(done) {
            question = new Question({
                qml: qml2
                ,difficulty: difficulty2
                ,author: author2
                ,institution: institution
                ,title: title2
            });

            should.exist(question);
            should.exist(question.qml);
            should.exist(question.difficulty);
            should.exist(question.author);
            should.exist(question.institution);
            should.exist(question.title);
            should.not.exist(question.topic);
            should.exist(question.keywords);
            should.not.exist(question.description);

            question.qml.should.be.a.String().and.be.exactly(qml2);
            question.difficulty.should.be.a.Number().and.be.exactly(difficulty2);
            question.author.should.be.a.String().and.be.exactly(author2);
            question.institution.should.be.a.String().and.be.exactly(institution);
            question.title.should.be.a.String().and.be.exactly(title2);
            question.keywords.should.be.a.Array();
            question.keywords.length.should.be.exactly(0);

            return question.save(function(e, q, nRow) {
                should.not.exist(e);
                should.exist(q);
                nRow.should.be.a.Number().and.be.exactly(1);

                return Question.find({}, function(er, qq) {
                    should.not.exist(er);

                    should.exist(qq.length);
                    qq.length.should.be.a.Number().and.be.exactly(1);
                    should.exist(qq[0]);

                    qq = qq[0];

                    should.exist(qq);
                    should.exist(qq.qml);
                    should.exist(qq.difficulty);
                    should.exist(qq.author);
                    should.exist(qq.institution);
                    should.exist(qq.title);
                    should.not.exist(qq.topic);
                    should.exist(qq.keywords);
                    should.not.exist(qq.description);

                    qq.qml.should.be.a.String().and.be.exactly(qml2);
                    qq.difficulty.should.be.a.Number().and.be.exactly(difficulty2);
                    qq.author.should.be.a.String().and.be.exactly(author2);
                    qq.institution.should.be.a.String().and.be.exactly(institution);
                    qq.title.should.be.a.String().and.be.exactly(title2);
                    qq.keywords.should.be.a.Array();
                    qq.keywords.length.should.be.exactly(0);
                    
                    return done();
                });
            });
        });
        
        it("question 1 with topic ", function(done) {
            question = new Question({
                qml: qml1
                ,difficulty: difficulty1
                ,author: author1
                ,topic: topic1
                ,institution: institution
                ,title: title1
            });

            should.exist(question);
            should.exist(question.qml);
            should.exist(question.difficulty);
            should.exist(question.author);
            should.exist(question.institution);
            should.exist(question.title);
            should.exist(question.topic);
            should.exist(question.keywords);
            should.not.exist(question.description);

            question.qml.should.be.a.String().and.be.exactly(qml1);
            question.difficulty.should.be.a.Number().and.be.exactly(difficulty1);
            question.author.should.be.a.String().and.be.exactly(author1);
            question.institution.should.be.a.String().and.be.exactly(institution);
            question.title.should.be.a.String().and.be.exactly(title1);
            question.topic.should.be.a.String().and.be.exactly(topic1);
            question.keywords.should.be.a.Array();
            question.keywords.length.should.be.exactly(0);

            return question.save(function(e, q, nRow) {
                should.not.exist(e);
                should.exist(q);
                nRow.should.be.a.Number().and.be.exactly(1);

                return Question.find({}, function(er, qq) {
                    should.not.exist(er);

                    should.exist(qq.length);
                    qq.length.should.be.a.Number().and.be.exactly(1);
                    should.exist(qq[0]);

                    qq = qq[0];

                    should.exist(qq);
                    should.exist(qq.qml);
                    should.exist(qq.difficulty);
                    should.exist(qq.author);
                    should.exist(qq.institution);
                    should.exist(qq.topic);
                    should.exist(qq.keywords);
                    should.not.exist(qq.description);

                    qq.qml.should.be.a.String().and.be.exactly(qml1);
                    qq.difficulty.should.be.a.Number().and.be.exactly(difficulty1);
                    qq.author.should.be.a.String().and.be.exactly(author1);
                    qq.institution.should.be.a.String().and.be.exactly(institution);
                    qq.topic.should.be.a.String().and.be.exactly(topic1);
                    qq.keywords.should.be.a.Array();
                    qq.keywords.length.should.be.exactly(0);

                    return done();
                });
            });
        });
        
        it("question 1 with keywords", function(done) {
            question = new Question({
                qml: qml1
                ,difficulty: difficulty1
                ,author: author1
                ,keywords: keywords1
                ,institution: institution
                ,title: title1
            });

            should.exist(question);
            should.exist(question.qml);
            should.exist(question.difficulty);
            should.exist(question.author);
            should.exist(question.institution);
            should.exist(question.title);
            should.exist(question.keywords);
            should.not.exist(question.topic);
            should.not.exist(question.description);

            question.qml.should.be.a.String().and.be.exactly(qml1);
            question.difficulty.should.be.a.Number().and.be.exactly(difficulty1);
            question.author.should.be.a.String().and.be.exactly(author1);
            question.institution.should.be.a.String().and.be.exactly(institution);
            question.title.should.be.a.String().and.be.exactly(title1);
            question.keywords.should.be.a.Array();
            question.keywords.length.should.be.exactly(2);

            return question.save(function(e, q, nRow) {
                should.not.exist(e);
                should.exist(q);
                nRow.should.be.a.Number().and.be.exactly(1);

                return Question.find({}, function(er, qq) {
                    should.not.exist(er);

                    should.exist(qq.length);
                    qq.length.should.be.a.Number().and.be.exactly(1);
                    should.exist(qq[0]);

                    qq = qq[0];

                    should.exist(qq);
                    should.exist(qq.qml);
                    should.exist(qq.difficulty);
                    should.exist(qq.author);
                    should.exist(qq.institution);
                    should.exist(qq.title);
                    should.exist(qq.keywords);
                    should.not.exist(qq.topic);
                    should.not.exist(qq.description);

                    qq.qml.should.be.a.String().and.be.exactly(qml1);
                    qq.difficulty.should.be.a.Number().and.be.exactly(difficulty1);
                    qq.author.should.be.a.String().and.be.exactly(author1);
                    qq.institution.should.be.a.String().and.be.exactly(institution);
                    qq.title.should.be.a.String().and.be.exactly(title1);
                    qq.keywords.should.be.a.Array();
                    q.keywords.length.should.be.exactly(2);

                    return done();
                });
            });
        });

        it("question 1 with description", function(done) {
            question = new Question({
                qml: qml1
                ,difficulty: difficulty1
                ,author: author1
                ,description: description1
                ,institution: institution
                ,title: title1
            });

            should.exist(question);
            should.exist(question.qml);
            should.exist(question.difficulty);
            should.exist(question.author);
            should.exist(question.institution);
            should.exist(question.title);
            should.exist(question.description);
            should.not.exist(question.topic);
            should.exist(question.keywords);

            question.qml.should.be.a.String().and.be.exactly(qml1);
            question.difficulty.should.be.a.Number().and.be.exactly(difficulty1);
            question.author.should.be.a.String().and.be.exactly(author1);
            question.institution.should.be.a.String().and.be.exactly(institution);
            question.title.should.be.a.String().and.be.exactly(title1);
            question.description.should.be.a.String().and.be.exactly(description1);
            question.keywords.should.be.a.Array();
            question.keywords.length.should.be.exactly(0);

            return question.save(function(e, q, nRow) {
                should.not.exist(e);
                should.exist(q);
                nRow.should.be.a.Number().and.be.exactly(1);

                return Question.find({}, function(er, qq) {
                    should.not.exist(er);

                    should.exist(qq.length);
                    qq.length.should.be.a.Number().and.be.exactly(1);
                    should.exist(qq[0]);

                    qq = qq[0];

                    should.exist(qq);
                    should.exist(qq.qml);
                    should.exist(qq.difficulty);
                    should.exist(qq.author);
                    should.exist(qq.institution);
                    should.exist(qq.title);
                    should.exist(qq.description);
                    should.not.exist(qq.topic);
                    should.exist(qq.keywords);

                    qq.qml.should.be.a.String().and.be.exactly(qml1);
                    qq.difficulty.should.be.a.Number().and.be.exactly(difficulty1);
                    qq.author.should.be.a.String().and.be.exactly(author1);
                    qq.institution.should.be.a.String().and.be.exactly(institution);
                    qq.title.should.be.a.String().and.be.exactly(title1);
                    qq.description.should.be.a.String().and.be.exactly(description1);
                    q.keywords.should.be.a.Array();
                    q.keywords.length.should.be.exactly(0);

                    return done();
                });
            });
        });

        it("question with same qml, difficulty, author, topic, keywords and description", function(done) {
            return new Question({
                qml: qml1
                , difficulty: difficulty1
                , author: author1
                , topic: topic1
                , keywords: keywords1
                , description: description1
                ,institution: institution
                ,title: title1
            }).save(function (e, q) {
                should.not.exist(e);
                should.exist(q);

                should.exist(q);
                should.exist(q.qml);
                should.exist(q.difficulty);
                should.exist(q.author);
                should.exist(q.institution);
                should.exist(q.title);
                should.exist(q.topic);
                should.exist(q.keywords);
                should.exist(q.description);

                q.qml.should.be.a.String().and.be.exactly(qml1);
                q.difficulty.should.be.a.Number().and.be.exactly(difficulty1);
                q.author.should.be.a.String().and.be.exactly(author1);
                q.institution.should.be.a.String().and.be.exactly(institution);
                q.title.should.be.a.String().and.be.exactly(title1);
                q.topic.should.be.a.String().and.be.exactly(topic1);
                q.keywords.should.be.a.Array();
                q.keywords.length.should.be.exactly(2);
                q.keywords[0].should.be.a.String().and.be.exactly(keywords1[0]);
                q.keywords[1].should.be.a.String().and.be.exactly(keywords1[1]);
                q.description.should.be.a.String().and.be.exactly(description1);

                return new Question({
                    qml: qml1
                    , difficulty: difficulty1
                    , author: author1
                    , topic: topic1
                    , keywords: keywords1
                    , description: description1
                    ,institution: institution
                    ,title: title1
                }).save(function (er, qq) {
                    should.not.exist(er);
                    should.exist(qq);

                    should.exist(qq);
                    should.exist(qq.qml);
                    should.exist(qq.difficulty);
                    should.exist(qq.author);
                    should.exist(qq.institution);
                    should.exist(qq.title);
                    should.exist(qq.topic);
                    should.exist(qq.keywords);
                    should.exist(qq.description);

                    qq.qml.should.be.a.String().and.be.exactly(qml1);
                    qq.difficulty.should.be.a.Number().and.be.exactly(difficulty1);
                    qq.author.should.be.a.String().and.be.exactly(author1);
                    qq.institution.should.be.a.String().and.be.exactly(institution);
                    qq.title.should.be.a.String().and.be.exactly(title1);
                    qq.topic.should.be.a.String().and.be.exactly(topic1);
                    qq.keywords.should.be.a.Array();
                    qq.keywords.length.should.be.exactly(2);
                    qq.keywords[0].should.be.a.String().and.be.exactly(keywords1[0]);
                    qq.keywords[1].should.be.a.String().and.be.exactly(keywords1[1]);
                    qq.description.should.be.a.String().and.be.exactly(description1);

                    return done();
                });
            });
        });
    });

    describe('can\'t save', function() {
        it('without qml', function (done) {
            return new Question({
                difficulty: difficulty1
                , author: author1
                ,institution: institution
                ,title: title1
            }).save(function (er) {
                should.exist(er);

                return done();
            });
        });

        it('without difficulty', function (done) {
            return new Question({
                qml: qml1
                , author: author1
                ,institution: institution
                ,title: title1
            }).save(function (er) {
                should.exist(er);

                return done();
            });
        });

        it('with difficulty < 1', function (done) {
            return new Question({
                qml: qml1
                , difficulty: 0
                , author: author1
                ,institution: institution
                ,title: title1
            }).save(function (er) {
                should.exist(er);

                return done();
            });
        });

        it('with difficulty > 4', function (done) {
            return new Question({
                qml: qml1
                , difficulty: 5
                , author: author1
                ,institution: institution
                ,title: title1
            }).save(function (er) {
                should.exist(er);

                return done();
            });
        });

        it('without author', function (done) {
            return new Question({
                qml: qml1
                , difficulty: difficulty1
                ,institution: institution
                ,title: title1
            }).save(function (er) {
                should.exist(er);

                return done();
            });
        });

        it('without institution', function (done) {
            return new Question({
                qml: qml1
                , difficulty: difficulty1
                , author: author1
                ,title: title1
            }).save(function (er) {
                should.exist(er);

                return done();
            });
        });

        it('without title', function (done) {
            return new Question({
                qml: qml1
                , difficulty: difficulty1
                , author: author1
                ,institution: institution
            }).save(function (er) {
                should.exist(er);

                return done();
            });
        });
    });

    describe('can change', function() {
        it("all ", function(done) {
            return new Question({
                qml: qml1
                , difficulty: difficulty1
                , author: author1
                , topic: topic1
                , keywords: keywords1
                , description: description1
                ,institution: institution
                ,title: title1
            }).save(function(e, question) {
                should.not.exist(e);

                should.exist(question);

                return Question.findByIdAndUpdate(question._id, { $set: {
                    qml: qml2
                    , difficulty: difficulty2
                    , author: author2
                    , topic: topic2
                    , keywords: keywords2
                    , description: description2
                    ,institution: "altro id ente"
                    ,title: title2
                } }, function(er) {
                    should.not.exist(er);

                    return Question.findOne({}, function(err, qq) {
                        should.not.exist(err);

                        should.exist(qq);
                        should.exist(qq.qml);
                        should.exist(qq.difficulty);
                        should.exist(qq.author);
                        should.exist(qq.institution);
                        should.exist(qq.title);
                        should.exist(qq.topic);
                        should.exist(qq.keywords);
                        should.exist(qq.description);

                        qq.qml.should.be.a.String().and.be.exactly(qml2);
                        qq.difficulty.should.be.a.Number().and.be.exactly(difficulty2);
                        qq.author.should.be.a.String().and.be.exactly(author2);
                        qq.institution.should.be.a.String().and.be.exactly("altro id ente");
                        qq.title.should.be.a.String().and.be.exactly(title2);
                        qq.topic.should.be.a.String().and.be.exactly(topic2);
                        qq.keywords.should.be.a.Array();
                        qq.keywords.length.should.be.exactly(2);
                        qq.keywords[0].should.be.a.String().and.be.exactly(keywords2[0]);
                        qq.keywords[1].should.be.a.String().and.be.exactly(keywords2[1]);
                        qq.description.should.be.a.String().and.be.exactly(description2);

                        return done();
                    });
                });
            });
        });

        it("add topic", function(done) {
            return new Question({
                qml: qml1
                , difficulty: difficulty1
                , author: author1
                ,institution: institution
                ,title: title1
            }).save(function(e) {
                should.not.exist(e);

                return Question.findOne({}, function(er, q) {
                    should.not.exist(er);

                    should.exist(q);
                    should.exist(q.qml);
                    should.exist(q.difficulty);
                    should.exist(q.author);
                    should.exist(q.institution);
                    should.exist(q.title);
                    should.not.exist(q.topic);

                    q.topic = topic1;

                    return q.save(function(err) {
                        should.not.exist(err);

                        Question.findOne({}, function(erro, qq) {
                            should.not.exist(erro);

                            should.exist(qq);
                            should.exist(qq.qml);
                            should.exist(qq.difficulty);
                            should.exist(qq.author);
                            should.exist(qq.institution);
                            should.exist(qq.title);
                            should.exist(qq.topic);

                            qq.topic.should.be.a.String().and.be.exactly(topic1);

                            return done();
                        });
                    });
                });
            });
        });

        it("add description", function(done) {
            return new Question({
                qml: qml1
                , difficulty: difficulty1
                , author: author1
                ,institution: institution
                ,title: title1
            }).save(function(e) {
                should.not.exist(e);

                return Question.findOne({}, function(er, q) {
                    should.not.exist(er);

                    should.exist(q);
                    should.exist(q.qml);
                    should.exist(q.difficulty);
                    should.exist(q.author);
                    should.exist(q.institution);
                    should.exist(q.title);
                    should.not.exist(q.description);

                    q.description = description1;

                    return q.save(function(err) {
                        should.not.exist(err);

                        return Question.findOne({}, function(erro, qq) {
                            should.not.exist(erro);

                            should.exist(qq);
                            should.exist(qq.qml);
                            should.exist(qq.difficulty);
                            should.exist(qq.author);
                            should.exist(qq.institution);
                            should.exist(qq.title);
                            should.exist(qq.description);

                            qq.description.should.be.a.String().and.be.exactly(description1);

                            return done();
                        });
                    });
                });
            });
        });

        it("add keywords", function(done) {
            return new Question({
                qml: qml1
                , difficulty: difficulty1
                , author: author1
                ,institution: institution
                ,title: title1
            }).save(function(e) {
                should.not.exist(e);

                return Question.findOne({}, function(er, q) {
                    should.not.exist(er);

                    should.exist(q);
                    should.exist(q.qml);
                    should.exist(q.difficulty);
                    should.exist(q.author);
                    should.exist(q.institution);
                    should.exist(q.title);
                    should.exist(q.keywords);

                    q.keywords.should.be.a.Array();
                    q.keywords.length.should.be.exactly(0);

                    q.keywords = keywords1;

                    return q.save(function(err) {
                        should.not.exist(err);

                        return Question.findOne({}, function(erro, qq) {
                            should.not.exist(erro);

                            should.exist(qq);
                            should.exist(qq.qml);
                            should.exist(qq.difficulty);
                            should.exist(qq.author);
                            should.exist(qq.institution);
                            should.exist(qq.title);
                            should.exist(qq.keywords);

                            qq.keywords.should.be.a.Array();
                            qq.keywords.length.should.be.exactly(2);
                            qq.keywords[0].should.be.a.String().and.be.exactly(keywords1[0]);
                            qq.keywords[1].should.be.a.String().and.be.exactly(keywords1[1]);

                            return done();
                        });
                    });
                });
            });
        });

        it("remove topic", function(done) {
            return new Question({
                qml: qml1
                ,difficulty: difficulty1
                ,author: author1
                ,topic: topic1
                ,institution: institution
                ,title: title1
            }).save(function(e) {
                should.not.exist(e);

                return Question.findOne({}, function(er, q) {
                    should.not.exist(er);

                    should.exist(q);
                    should.exist(q.qml);
                    should.exist(q.difficulty);
                    should.exist(q.author);
                    should.exist(q.institution);
                    should.exist(q.title);
                    should.exist(q.topic);

                    q.topic.should.be.a.String().and.be.exactly(topic1);

                    q.topic = undefined;

                    return q.save(function(err) {
                        should.not.exist(err);

                        Question.findOne({}, function(erro, qq) {
                            should.not.exist(erro);

                            should.exist(qq);
                            should.exist(qq.qml);
                            should.exist(qq.difficulty);
                            should.exist(qq.author);
                            should.exist(qq.institution);
                            should.exist(qq.title);
                            should.not.exist(qq.topic);

                            return done();
                        });
                    });
                });
            });
        });

        it("remove description", function(done) {
            return new Question({
                qml: qml1
                ,difficulty: difficulty1
                ,author: author1
                ,description: description1
                ,institution: institution
                ,title: title1
            }).save(function(e) {
                should.not.exist(e);

                return Question.findOne({}, function(er, q) {
                    should.not.exist(er);

                    should.exist(q);
                    should.exist(q.qml);
                    should.exist(q.difficulty);
                    should.exist(q.author);
                    should.exist(q.institution);
                    should.exist(q.title);
                    should.exist(q.description);

                    q.description.should.be.a.String().and.be.exactly(description1);

                    q.description = undefined;

                    return q.save(function(err) {
                        should.not.exist(err);

                        return Question.findOne({}, function(erro, qq) {
                            should.not.exist(erro);

                            should.exist(qq);
                            should.exist(qq.qml);
                            should.exist(qq.difficulty);
                            should.exist(qq.author);
                            should.exist(qq.institution);
                            should.exist(qq.title);
                            should.not.exist(qq.description);

                            return done();
                        });
                    });
                });
            });
        });

        it("remove keywords", function(done) {
            return new Question({
                qml: qml1
                ,difficulty: difficulty1
                ,author: author1
                ,keywords: keywords1
                ,institution: institution
                ,title: title1
            }).save(function(e) {
                should.not.exist(e);

                return Question.findOne({}, function(er, q) {
                    should.not.exist(er);

                    should.exist(q);
                    should.exist(q.qml);
                    should.exist(q.difficulty);
                    should.exist(q.author);
                    should.exist(q.institution);
                    should.exist(q.title);
                    should.exist(q.keywords);

                    q.keywords.should.be.a.Array();
                    q.keywords.length.should.be.exactly(2);
                    q.keywords[0].should.be.a.String().and.be.exactly(keywords1[0]);
                    q.keywords[1].should.be.a.String().and.be.exactly(keywords1[1]);

                    q.keywords = undefined;

                    return q.save(function(err) {
                        should.not.exist(err);

                        return Question.findOne({}, function(erro, qq) {
                            should.not.exist(erro);

                            should.exist(qq);
                            should.exist(qq.qml);
                            should.exist(qq.difficulty);
                            should.exist(qq.author);
                            should.exist(qq.institution);
                            should.exist(qq.title);
                            should.exist(qq.keywords);

                            qq.keywords.should.be.a.Array();
                            qq.keywords.length.should.be.exactly(0);

                            return done();
                        });
                    });
                });
            });
        });
    });
    
    afterEach(function(done) {
        question = null;
        
        done();
    });
});
