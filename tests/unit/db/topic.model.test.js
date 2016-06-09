'use strict';

var should = require('should'),
    database = require('../../config/database.test'),
    mongoose = require('mongoose'),
    Topic = require('../../../app/model/topic.model');
require('mocha-mongoose')(database.localUrl);

var topic,
    name = 'pippo',
    name2 = 'pluto';

describe('topic.model.js unit tests :', function() {
    beforeEach(function(done) {
        if (mongoose.connection.db)
                return done();

        return mongoose.connect(database.localUrl, function () {
                return done();
        });
    });
    
    describe('can save', function() {
        it("topic " + name, function(done) {
            topic = new Topic({ _id: name });

            should.exist(topic);
            should.exist(topic._id);
            topic._id.should.be.a.String().and.be.exactly(name);

            return topic.save(function(err, t, nRow) {
                should.not.exist(err);
                should.exist(t);
                t._id.should.be.a.String().and.be.exactly(name);
                should.exist(nRow);
                nRow.should.be.a.Number().and.be.exactly(1);

                return Topic.find({ _id: name }, function (err, tt) {
                    should.not.exist(err);
                    should.exist(tt);
                    should.exist(tt.length);
                    tt.length.should.be.a.Number().and.be.exactly(1);
                    should.exist(tt[0]);
                    should.exist(tt[0]._id);
                    tt[0]._id.should.be.a.String().and.be.exactly(name);

                    return done();
                });
            });
        });

        it("topic " + name2, function(done) {
            topic = new Topic({ _id: name2 });

            should.exist(topic);
            should.exist(topic._id);
            topic._id.should.be.a.String().and.be.exactly(name2);

            return topic.save(function(err, t, nRow) {
                should.not.exist(err);
                should.exist(t);
                t._id.should.be.a.String().and.be.exactly(name2);
                should.exist(nRow);
                nRow.should.be.a.Number().and.be.exactly(1);

                return Topic.find({ _id: name2 }, function (err, tt) {
                    should.not.exist(err);
                    should.exist(tt);
                    should.exist(tt.length);
                    tt.length.should.be.a.Number().and.be.exactly(1);
                    should.exist(tt[0]);
                    should.exist(tt[0]._id);
                    tt[0]._id.should.be.a.String().and.be.exactly(name2);

                    return done();
                });
            });
        });
    });

    describe('can\'t save', function() {
        it('another ' + name, function(done) {
            return topic = new Topic({ _id: name }).save(function(err, t, nRow) {
                should.not.exist(err);
                should.exist(t);
                t._id.should.be.a.String().and.be.exactly(name);
                should.exist(nRow);
                nRow.should.be.a.Number().and.be.exactly(1);

                return new Topic({ _id: name }).save(function(err, t, nRow) {
                    should.exist(err);

                    done();
                });
            });
        });

        it('another ' + name2, function(done) {
            return topic = new Topic({ _id: name2 }).save(function(err, t, nRow) {
                should.not.exist(err);
                should.exist(t);
                t._id.should.be.a.String().and.be.exactly(name2);
                should.exist(nRow);
                nRow.should.be.a.Number().and.be.exactly(1);

                return new Topic({ _id: name2 }).save(function(err, t, nRow) {
                    should.exist(err);

                    done();
                });
            });
        });
    });

    describe('getName', function() {
        it('return ' + name, function(done) {
            topic = new Topic({ _id: name });
            should.exist(topic);
            should.exist(topic.getName());
            topic.getName().should.be.a.String().and.be.exactly(name);

            return done();
        });

        it('return ' + name2, function(done) {
            topic = new Topic({ _id: name2 });
            should.exist(topic);
            should.exist(topic.getName());
            topic.getName().should.be.a.String().and.be.exactly(name2);

            return done();
        });
    });
});