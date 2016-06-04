'use strict';

var should = require('should');
var mongoose = require('mongoose');
var Topic = require('../../../app/model/topic.model');
var database = require('../../config/database.test');
mongoose.createConnection(database.localUrl);

var topic,
    name = 'pippo',
    name2 = 'pluto',
    name3 = 'topolino';

describe('topic.model.js unit tests :', function() {

    beforeEach(function() {
        Topic.remove().exec();
        topic = new Topic({ _id: name });
        topic.save();
    });

    describe('basic functions :', function() {
        describe('can find', function() {
            it('all the topic', function() {
                Topic.find({}, function(err, t) {
                    should.not.exist(err);
                    should.exist(t);
                    should.exist(t.length);
                    t.length.should.be.a.Number().and.be.exactly(1);
                });
            });

            it('topic ' + name, function() {
                Topic.find({}, function(err, t) {
                    should.not.exist(err);
                    should.exist(t);
                });
            });
        });

        describe('can save', function() {
            it(name2, function() {
                new Topic({ _id: name2 }).save(function(err, t, nRow) {
                    should.not.exist(err);
                    should.exist(t);
                    t._id.should.be.exactly(name2);
                    should.exist(nRow);
                    nRow.should.be.a.Number().and.be.exactly(1);

                    Topic.find({ _id: name2 }, function (err, t) {
                        should.not.exist(err);
                        should.exist(t);
                        should.exist(t.length);
                        t.length.should.be.exactly(1);
                        should.exist(t[0]);
                        should.exist(t[0]._id);
                        t[0]._id.should.be.exactly(name2);
                    });
                });
            });

            it(name3, function() {
                new Topic({ _id: name3 }).save(function(err, t, nRow) {
                    should.not.exist(err);
                    should.exist(t);
                    t._id.should.be.exactly(name3);
                    should.exist(nRow);
                    nRow.should.be.a.Number().and.be.exactly(1);

                    Topic.find({ _id: name3 }, function (err, t) {
                        should.not.exist(err);
                        should.exist(t);
                        should.exist(t.length);
                        t.length.should.be.exactly(1);
                        should.exist(t[0]);
                        should.exist(t[0]._id);
                        t[0]._id.should.be.exactly(name3);
                    });
                });
            });
        });

        describe('can\'t save', function() {
            it(name, function() {
                Topic.findOne({ _id: name }, '_id', function (err, t) {
                    should.not.exist(err);
                    should.exist(t);
                    t.should.be.exactly(name);

                    new Topic({ _id: name }).save(function(err, t, nRow) {
                        should.exist(err);
                        should.not.exist(t);
                        should.exist(nRow);
                        nRow.should.be.a.Number().and.be.exactly(0);
                    });
                });
            });
        });
    });

    describe('advanced functions :', function() {
        describe('getName', function() {
            it('return ' + name, function() {
                topic.getName().should.be.a.String().and.be.exactly(name);
            });

            it('return ' + name + ' with findOne', function() {
                Topic.findOne({}, function(err, cb) {
                    should.not.exist(err);
                    should.exist(cb);
                    cb.getName().should.be.a.String().and.be.exactly(name)
                });
            });
        });

        describe('hasTopic', function() {
            it('return true with ' + name +' syncrony', function() {
                var result = Topic.hasTopic(name, function(err) {
                    should.not.exist(err);
                });

                should.exist(result);
                result.should.be.a.Boolean();
                result.should.be.exactly(true);
            });

            it('return true with ' + name +' asyncrony', function() {
                Topic.hasTopic(name, function(err,result) {
                    should.not.exist(err);
                    should.exist(result);
                    result.should.be.a.Boolean();
                    result.should.be.exactly(true);
                });
            });

            it('return true with a new topic ' + name2, function() {
                new Topic({ _id: name2 }).save();

                Topic.hasTopic( name2, function(err, result) {
                    should.not.exist(err);
                    should.exist(result);
                    result.should.be.a.Boolean();
                    result.should.be.exactly(true);
                });
            });
        });

        describe('findTopics', function() {
            describe('return exactly find()', function() {
                it('test with ' + name +' asyncrony', function() {
                    Topic.findTopics(function(err, t) {
                        should.not.exist(err);
                        should.exist(t);
                        Topic.find({}, function(err, tt) {
                            should.not.exist(err);
                            should.exist(tt);
                            tt.should.be.exactly(t);
                        });
                    });
                });

                it('test with ' + name +' syncrony', function() {
                    var t = Topic.findTopics(function(err) {
                        should.not.exist(err);
                    });

                    should.exist(t);
                    Topic.find({}, function(err, tt) {
                        should.not.exist(err);
                        should.exist(tt);
                        tt.should.be.exactly(t);
                    });
                });
            });

            describe('return all the topics', function() {
                it(name, function() {
                    Topic.findTopics(function(err, t) {
                        should.not.exist(err);
                        should.exist(t);
                        should.exist(t.length);
                        t.length.should.be.exactly(1);
                        should.exist(t[0]);
                        should.exist(t[0]._id);
                        t[0]._id.should.be.exactly(name);
                    });
                });

                it(name + ' and ' + name2, function() {
                    new Topic({ _id: name2 }).save();

                    Topic.findTopics(function(err, t) {
                        should.not.exist(err);
                        should.exist(t);
                        should.exist(t.length);
                        t.length.should.be.exactly(2);
                        should.exist(t[0]);
                        should.exist(t[0]._id);
                        t[0]._id.should.be.exactly(name);
                        should.exist(t[1]);
                        should.exist(t[1]._id);
                        t[1]._id.should.be.exactly(name2);
                    });
                });

                it(name + ' and ' + name2 + ' and ' + name3, function() {
                    new Topic({ _id: name2 }).save();
                    new Topic({ _id: name3 }).save();

                    Topic.findTopics(function(err, t) {
                        should.not.exist(err);
                        should.exist(t);
                        should.exist(t.length);
                        t.length.should.be.exactly(3);
                        should.exist(t[0]);
                        should.exist(t[0]._id);
                        t[0]._id.should.be.exactly(name);
                        should.exist(t[1]);
                        should.exist(t[1]._id);
                        t[1]._id.should.be.exactly(name2);
                        should.exist(t[2]);
                        should.exist(t[2]._id);
                        t[2]._id.should.be.exactly(name3);
                    });
                });
            });
        });
    });

    afterEach(function() {
        Topic.remove().exec();
        topic = null;
    });
});

mongoose.connection.close();