'use strict';

var should = require('should'),
    database = require('./config/database.test'),
    mongoose = require('mongoose'),
    User = require('../app/model/user.model');
require('mocha-mongoose')(database.localUrl);

var user,
    firstName1 = 'Carlotta',
    firstName2 = 'Vivi',
    lastName1 = 'Rossi',
    lastName2 = 'Alberton',
    mail1 = 'a@b.c',
    mail2 = 'b@c.d',
    invalidMail1 = 'sder.w',
    invalidMail2 = 'sder@r',
    password = 'qwertfghj',
    tmpPassword = 'poiujhg';

describe('user.model.js unit tests :', function() {
    beforeEach(function(done) {
        if (mongoose.connection.db)
            return done();

        return mongoose.connect(database.localUrl, function () {
            return done();
        });
    });

    describe('can save', function() {
        it("user with id " + mail1 + " with tmpPassword", function(done) {
            user = new User({
                _id: mail1
                ,firstName: firstName1
                ,lastName: lastName1
                ,password: password
                ,tmpPassword: tmpPassword
            });
            
            should.exist(user);
            should.exist(user._id);
            should.exist(user.firstName);
            should.exist(user.lastName);
            should.exist(user.password);
            should.exist(user.tmpPassword);
            
            user._id.should.be.a.String().and.be.exactly(mail1);
            user.firstName.should.be.a.String().and.be.exactly(firstName1);
            user.lastName.should.be.a.String().and.be.exactly(lastName1);
            user.password.should.be.a.String().and.be.exactly(password);
            user.tmpPassword.should.be.a.String().and.be.exactly(tmpPassword);
            
            return user.save(function(e, u, nRow) {
                should.not.exist(e);
                should.exist(u);
                should.exist(nRow);
                nRow.should.be.a.Number().and.be.exactly(1);
                
                return User.find({ _id: mail1 }, function (er, uu) {
                    should.not.exist(er);
                    should.exist(uu);
                    
                    should.exist(uu.length);
                    uu.length.should.be.a.Number().and.be.exactly(1);
                    
                    should.exist(uu[0]);

                    uu = uu[0];
                    should.exist(uu._id);
                    should.exist(uu.firstName);
                    should.exist(uu.lastName);
                    should.exist(uu.password);
                    should.exist(uu.tmpPassword);

                    uu._id.should.be.a.String().and.be.exactly(mail1);
                    uu.firstName.should.be.a.String().and.be.exactly(firstName1);
                    uu.lastName.should.be.a.String().and.be.exactly(lastName1);
                    uu.password.should.be.a.String().and.be.exactly(password);
                    uu.tmpPassword.should.be.a.String().and.be.exactly(tmpPassword);
                    
                    return done();
                });
            });
        });

        it("user with id " + mail1 + " without tmpPassword", function(done) {
            user = new User({
                _id: mail1
                ,firstName: firstName1
                ,lastName: lastName1
                ,password: password
            });

            should.exist(user);
            should.exist(user._id);
            should.exist(user.firstName);
            should.exist(user.lastName);
            should.exist(user.password);
            should.not.exist(user.tmpPassword);

            user._id.should.be.a.String().and.be.exactly(mail1);
            user.firstName.should.be.a.String().and.be.exactly(firstName1);
            user.lastName.should.be.a.String().and.be.exactly(lastName1);
            user.password.should.be.a.String().and.be.exactly(password);

            return user.save(function(e, u, nRow) {
                should.not.exist(e);
                should.exist(u);
                should.exist(nRow);
                nRow.should.be.a.Number().and.be.exactly(1);

                return User.find({ _id: mail1 }, function (er, uu) {
                    should.not.exist(er);
                    should.exist(uu);

                    should.exist(uu.length);
                    uu.length.should.be.a.Number().and.be.exactly(1);

                    should.exist(uu[0]);

                    uu = uu[0];

                    should.exist(uu._id);
                    should.exist(uu.firstName);
                    should.exist(uu.lastName);
                    should.exist(uu.password);
                    should.not.exist(uu.tmpPassword);

                    uu._id.should.be.a.String().and.be.exactly(mail1);
                    uu.firstName.should.be.a.String().and.be.exactly(firstName1);
                    uu.lastName.should.be.a.String().and.be.exactly(lastName1);
                    uu.password.should.be.a.String().and.be.exactly(password);

                    return done();
                });
            });
        });

        it("user with id " + mail2 + " with tmpPassword", function(done) {
            user = new User({
                _id: mail2
                ,firstName: firstName2
                ,lastName: lastName2
                ,password: password
                ,tmpPassword: tmpPassword
            });

            should.exist(user);
            should.exist(user._id);
            should.exist(user.firstName);
            should.exist(user.lastName);
            should.exist(user.password);
            should.exist(user.tmpPassword);

            user._id.should.be.a.String().and.be.exactly(mail2);
            user.firstName.should.be.a.String().and.be.exactly(firstName2);
            user.lastName.should.be.a.String().and.be.exactly(lastName2);
            user.password.should.be.a.String().and.be.exactly(password);
            user.tmpPassword.should.be.a.String().and.be.exactly(tmpPassword);

            return user.save(function(e, u, nRow) {
                should.not.exist(e);
                should.exist(u);
                should.exist(nRow);
                nRow.should.be.a.Number().and.be.exactly(1);

                return User.find({ _id: mail2 }, function (er, uu) {
                    should.not.exist(er);
                    should.exist(uu);

                    should.exist(uu.length);
                    uu.length.should.be.a.Number().and.be.exactly(1);

                    should.exist(uu[0]);

                    uu = uu[0];

                    should.exist(uu._id);
                    should.exist(uu.firstName);
                    should.exist(uu.lastName);
                    should.exist(uu.password);
                    should.exist(uu.tmpPassword);

                    uu._id.should.be.a.String().and.be.exactly(mail2);
                    uu.firstName.should.be.a.String().and.be.exactly(firstName2);
                    uu.lastName.should.be.a.String().and.be.exactly(lastName2);
                    uu.password.should.be.a.String().and.be.exactly(password);
                    uu.tmpPassword.should.be.a.String().and.be.exactly(tmpPassword);

                    return done();
                });
            });
        });

        it("user with id " + mail2 + " without tmpPassword", function(done) {
            user = new User({
                _id: mail2
                ,firstName: firstName2
                ,lastName: lastName2
                ,password: password
            });

            should.exist(user);
            should.exist(user._id);
            should.exist(user.firstName);
            should.exist(user.lastName);
            should.exist(user.password);
            should.not.exist(user.tmpPassword);

            user._id.should.be.a.String().and.be.exactly(mail2);
            user.firstName.should.be.a.String().and.be.exactly(firstName2);
            user.lastName.should.be.a.String().and.be.exactly(lastName2);
            user.password.should.be.a.String().and.be.exactly(password);

            return user.save(function(e, u, nRow) {
                should.not.exist(e);
                should.exist(u);
                should.exist(nRow);
                nRow.should.be.a.Number().and.be.exactly(1);

                return User.find({ _id: mail2 }, function (er, uu) {
                    should.not.exist(er);
                    should.exist(uu);

                    should.exist(uu.length);
                    uu.length.should.be.a.Number().and.be.exactly(1);

                    should.exist(uu[0]);

                    uu = uu[0];

                    should.exist(uu._id);
                    should.exist(uu.firstName);
                    should.exist(uu.lastName);
                    should.exist(uu.password);
                    should.not.exist(uu.tmpPassword);

                    uu._id.should.be.a.String().and.be.exactly(mail2);
                    uu.firstName.should.be.a.String().and.be.exactly(firstName2);
                    uu.lastName.should.be.a.String().and.be.exactly(lastName2);
                    uu.password.should.be.a.String().and.be.exactly(password);

                    return done();
                });
            });
        });

        it("user with same firstName, lastName and password", function(done) {
            return new User({
                _id: mail1
                ,firstName: firstName1
                ,lastName: lastName1
                ,password: password
            }).save(function(er) {
                should.not.exist(er);

                return new User({
                    _id: mail2
                    ,firstName: firstName1
                    ,lastName: lastName1
                    ,password: password
                }).save(function(err) {
                    should.not.exist(err);

                    return User.find({}, function (e, u) {
                        should.not.exist(err);
                        should.exist(u);

                        should.exist(u.length);
                        u.length.should.be.a.Number().and.be.exactly(2);

                        return done();
                    });
                });
            });
        });
    });

    describe('can\'t save', function() {
        it('another ' + mail1, function(done) {
            return new User({
                _id: mail1
                ,firstName: firstName1
                ,lastName: lastName1
                ,password: password
                ,tmpPassword: tmpPassword
            }).save(function(err, u, nRow) {
                should.not.exist(err);

                should.exist(u);
                should.exist(u._id);
                should.exist(u.firstName);
                should.exist(u.lastName);
                should.exist(u.password);
                should.exist(u.tmpPassword);

                u._id.should.be.a.String().and.be.exactly(mail1);
                u.firstName.should.be.a.String().and.be.exactly(firstName1);
                u.lastName.should.be.a.String().and.be.exactly(lastName1);
                u.password.should.be.a.String().and.be.exactly(password);
                u.tmpPassword.should.be.a.String().and.be.exactly(tmpPassword);

                should.exist(nRow);
                nRow.should.be.a.Number().and.be.exactly(1);

                return new User({
                    _id: mail1
                    ,firstName: firstName2
                    ,lastName: lastName2
                    ,password: password
                    ,tmpPassword: tmpPassword
                }).save(function(err) {
                    should.exist(err);

                    done();
                });
            });
        });

        it('invalid mail ' + invalidMail1, function(done) {
            user = new User({
                _id: invalidMail1
                ,firstName: firstName1
                ,lastName: lastName1
                ,password: password
                ,tmpPassword: tmpPassword
            });


            should.exist(user);
            should.exist(user._id);
            should.exist(user.firstName);
            should.exist(user.lastName);
            should.exist(user.password);
            should.exist(user.tmpPassword);

            user._id.should.be.a.String().and.be.exactly(invalidMail1);
            user.firstName.should.be.a.String().and.be.exactly(firstName1);
            user.lastName.should.be.a.String().and.be.exactly(lastName1);
            user.password.should.be.a.String().and.be.exactly(password);
            user.tmpPassword.should.be.a.String().and.be.exactly(tmpPassword);

            return user.save(function(err) {
                should.exist(err);

                done();
            });
        });

        it('invalid mail ' + invalidMail2, function(done) {
            user = new User({
                _id: invalidMail2
                ,firstName: firstName1
                ,lastName: lastName1
                ,password: password
                ,tmpPassword: tmpPassword
            });


            should.exist(user);
            should.exist(user._id);
            should.exist(user.firstName);
            should.exist(user.lastName);
            should.exist(user.password);
            should.exist(user.tmpPassword);

            user._id.should.be.a.String().and.be.exactly(invalidMail2);
            user.firstName.should.be.a.String().and.be.exactly(firstName1);
            user.lastName.should.be.a.String().and.be.exactly(lastName1);
            user.password.should.be.a.String().and.be.exactly(password);
            user.tmpPassword.should.be.a.String().and.be.exactly(tmpPassword);

            return user.save(function(err) {
                should.exist(err);

                done();
            });
        });
    });

    describe('can change', function() {
        it("change password", function(done) {
            user = new User({
                _id: mail1
                ,firstName: firstName1
                ,lastName: lastName1
                ,password: password
            }).save(function(e) {
                should.not.exist(e);
            });

            User.findByIdAndUpdate(mail1, { $set: { password: 'eee' }}, function(er) {
                should.not.exist(er);

                return User.findOne({ _id: mail1 }, function(err, uu) {
                    should.not.exist(err);

                    should.exist(uu);
                    should.exist(uu._id);
                    should.exist(uu.firstName);
                    should.exist(uu.lastName);
                    should.exist(uu.password);
                    should.not.exist(uu.tmpPassword);

                    uu._id.should.be.a.String().and.be.exactly(mail1);
                    uu.firstName.should.be.a.String().and.be.exactly(firstName1);
                    uu.lastName.should.be.a.String().and.be.exactly(lastName1);
                    uu.password.should.be.a.String().and.be.exactly("eee");

                    done();
                });
            });
        });

        it("add tmpPassword", function(done) {
            new User({
                _id: mail1
                ,firstName: firstName1
                ,lastName: lastName1
                ,password: password
            }).save(function(e, u, nRow) {
                should.not.exist(e);

                should.exist(u);

                should.exist(u._id);
                should.exist(u.firstName);
                should.exist(u.lastName);
                should.exist(u.password);
                should.not.exist(u.tmpPassword);

                u._id.should.be.a.String().and.be.exactly(mail1);
                u.firstName.should.be.a.String().and.be.exactly(firstName1);
                u.lastName.should.be.a.String().and.be.exactly(lastName1);
                u.password.should.be.a.String().and.be.exactly(password);

                should.exist(nRow);

                nRow.should.be.a.Number().and.be.exactly(1);

                u.tmpPassword = tmpPassword;

                u.save(function(err, uu, nRow) {
                    should.not.exist(err);

                    should.exist(uu);

                    should.exist(uu._id);
                    should.exist(uu.firstName);
                    should.exist(uu.lastName);
                    should.exist(uu.password);
                    should.exist(uu.tmpPassword);

                    uu._id.should.be.a.String().and.be.exactly(mail1);
                    uu.firstName.should.be.a.String().and.be.exactly(firstName1);
                    uu.lastName.should.be.a.String().and.be.exactly(lastName1);
                    uu.password.should.be.a.String().and.be.exactly(password);
                    uu.tmpPassword.should.be.a.String().and.be.exactly(tmpPassword);

                    should.exist(nRow);

                    nRow.should.be.a.Number().and.be.exactly(1);

                    done();
                });
            });
        });

        it("remove tmpPassword", function(done) {
            new User({
                _id: mail1
                ,firstName: firstName1
                ,lastName: lastName1
                ,password: password
                ,tmpPassword: tmpPassword
            }).save(function(e, u, nRow) {
                should.not.exist(e);

                should.exist(u);

                should.exist(u._id);
                should.exist(u.firstName);
                should.exist(u.lastName);
                should.exist(u.password);
                should.exist(u.tmpPassword);

                u._id.should.be.a.String().and.be.exactly(mail1);
                u.firstName.should.be.a.String().and.be.exactly(firstName1);
                u.lastName.should.be.a.String().and.be.exactly(lastName1);
                u.password.should.be.a.String().and.be.exactly(password);
                u.tmpPassword.should.be.a.String().and.be.exactly(tmpPassword);

                should.exist(nRow);

                nRow.should.be.a.Number().and.be.exactly(1);

                u.tmpPassword = undefined;

                u.save(function(err, uu, nRow) {
                    should.not.exist(err);

                    should.exist(uu);

                    should.exist(uu._id);
                    should.exist(uu.firstName);
                    should.exist(uu.lastName);
                    should.exist(uu.password);
                    should.not.exist(uu.tmpPassword);

                    uu._id.should.be.a.String().and.be.exactly(mail1);
                    uu.firstName.should.be.a.String().and.be.exactly(firstName1);
                    uu.lastName.should.be.a.String().and.be.exactly(lastName1);
                    uu.password.should.be.a.String().and.be.exactly(password);

                    should.exist(nRow);

                    nRow.should.be.a.Number().and.be.exactly(1);

                    done();
                });
            });
        });

        it("change tmpPassword", function(done) {
            new User({
                _id: mail1
                ,firstName: firstName1
                ,lastName: lastName1
                ,password: password
                ,tmpPassword: tmpPassword
        }).save(function(e, u, nRow) {
                should.not.exist(e);

                should.exist(u);

                should.exist(u._id);
                should.exist(u.firstName);
                should.exist(u.lastName);
                should.exist(u.password);
                should.exist(u.tmpPassword);

                u._id.should.be.a.String().and.be.exactly(mail1);
                u.firstName.should.be.a.String().and.be.exactly(firstName1);
                u.lastName.should.be.a.String().and.be.exactly(lastName1);
                u.password.should.be.a.String().and.be.exactly(password);
                u.tmpPassword.should.be.a.String().and.be.exactly(tmpPassword);

                should.exist(nRow);

                nRow.should.be.a.Number().and.be.exactly(1);

                u.tmpPassword = "ddd";

                u.save(function(err, uu, nRow) {
                    should.not.exist(err);

                    should.exist(uu);

                    should.exist(uu._id);
                    should.exist(uu.firstName);
                    should.exist(uu.lastName);
                    should.exist(uu.password);
                    should.exist(uu.tmpPassword);

                    uu._id.should.be.a.String().and.be.exactly(mail1);
                    uu.firstName.should.be.a.String().and.be.exactly(firstName1);
                    uu.lastName.should.be.a.String().and.be.exactly(lastName1);
                    uu.password.should.be.a.String().and.be.exactly(password);
                    u.tmpPassword.should.be.a.String().and.be.exactly("ddd");

                    should.exist(nRow);

                    nRow.should.be.a.Number().and.be.exactly(1);

                    done();
                });
            });
        });
    });

    describe('getMail', function() {
        it(mail1, function(done) {
            user = new User({
                _id: mail1
                ,firstName: firstName1
                ,lastName: lastName1
                ,password: password
            });

            should.exist(user);
            should.exist(user.getMail());
            user.getMail().should.be.a.String().and.be.exactly(mail1);

            done();
        });

        it(mail2, function(done) {
            user = new User({
                _id: mail2
                ,firstName: firstName1
                ,lastName: lastName1
                ,password: password
            });

            should.exist(user);
            should.exist(user.getMail());
            user.getMail().should.be.a.String().and.be.exactly(mail2);

            done();
        });
    });
    
    describe('checkPassword', function() {
        it("expected true", function(done) {
            user = new User({
                _id: mail1
                ,firstName: firstName1
                ,lastName: lastName1
                ,password: password
            });

            should.exist(user.checkPassword(password));
            user.checkPassword(password).should.be.a.Boolean().and.be.exactly(true);

            done();
        });

        it("expected false", function(done) {
            user = new User({
                _id: mail1
                ,firstName: firstName1
                ,lastName: lastName1
                ,password: password
            });

            should.exist(user.checkPassword("ddd"));
            user.checkPassword("ddd").should.be.a.Boolean().and.be.exactly(false);

            done();
        });
    });

    afterEach(function(done) {
        user = null;

        done();
    });
});
