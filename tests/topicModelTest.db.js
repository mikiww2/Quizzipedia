'use strict';

var should = require('should'),
    database = require('./config/database.test'),
    mongoose = require('mongoose'),
    Topic = require('../app/model/topic.model');
require('mocha-mongoose')(database.localUrl);

var topic,
    name = 'Storia',
    name2 = 'Algebra';

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
            topic = new Topic({ name: name });

            should.exist(topic);
            should.exist(topic.name);
            topic.name.should.be.a.String().and.be.exactly(name);

            return topic.save(function(err, t, nRow) {
                should.not.exist(err);
                should.exist(t);
                t.name.should.be.a.String().and.be.exactly(name);
                should.exist(nRow);
                nRow.should.be.a.Number().and.be.exactly(1);

                return Topic.find({ name: name }, function (err, tt) {
                    should.not.exist(err);
                    should.exist(tt);
                    should.exist(tt.length);
                    tt.length.should.be.a.Number().and.be.exactly(1);
                    should.exist(tt[0]);
                    should.exist(tt[0].name);
                    tt[0].name.should.be.a.String().and.be.exactly(name);

                    return done();
                });
            });
        });

        it("topic " + name2, function(done) {
            topic = new Topic({ name: name2 });

            should.exist(topic);
            should.exist(topic.name);
            topic.name.should.be.a.String().and.be.exactly(name2);

            return topic.save(function(err, t, nRow) {
                should.not.exist(err);
                should.exist(t);
                t.name.should.be.a.String().and.be.exactly(name2);
                should.exist(nRow);
                nRow.should.be.a.Number().and.be.exactly(1);

                return Topic.find({ name: name2 }, function (err, tt) {
                    should.not.exist(err);
                    should.exist(tt);
                    should.exist(tt.length);
                    tt.length.should.be.a.Number().and.be.exactly(1);
                    should.exist(tt[0]);
                    should.exist(tt[0].name);
                    tt[0].name.should.be.a.String().and.be.exactly(name2);

                    return done();
                });
            });
        });
    });

    describe('can\'t save', function() {
        it('another ' + name, function(done) {
            return topic = new Topic({ name: name }).save(function(err, t, nRow) {
                should.not.exist(err);
                should.exist(t);
                t.name.should.be.a.String().and.be.exactly(name);
                should.exist(nRow);
                nRow.should.be.a.Number().and.be.exactly(1);

                return new Topic({ name: name }).save(function(err, t, nRow) {
                    should.exist(err);

                    done();
                });
            });
        });

        it('another ' + name2, function(done) {
            return topic = new Topic({ name: name2 }).save(function(err, t, nRow) {
                should.not.exist(err);
                should.exist(t);
                t.name.should.be.a.String().and.be.exactly(name2);
                should.exist(nRow);
                nRow.should.be.a.Number().and.be.exactly(1);

                return new Topic({ name: name2 }).save(function(err, t, nRow) {
                    should.exist(err);

                    done();
                });
            });
        });
    });
    
});