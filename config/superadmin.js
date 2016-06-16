/*
 * Nome del file: superadmin.js
 * Percorso: config/superadmin.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  gestisce l'account di superadmin di quizzipedia,
 *  fornendo in admin.txt i dati di accesso per l'admin
 *
 * * Diario delle modifiche:
 *
 */

'use strict';

var fs = require('fs'),
    database = require('../config/database'),
    mongoose = require('mongoose'),
    randomstring = require('randomstring'),
    User = require('../app/model/user.model'),
    async = require('async');

mongoose.connect(database.localUrl);

var path = './config/',
    filename = 'admin.txt',
    mail = 'admin@quizzipedia.it',
    first = 'Super',
    last = 'Admin',
    password = null,
    file = null;

console.log(' ####  #    # # ###### ###### # #####  ###### #####  #   ##');
console.log('#    # #    # #     #      #  # #    # #      #    # #  #  #');
console.log('#    # #    # #    #      #   # #    # #####  #    # # #    #');
console.log('#  # # #    # #   #      #    # #####  #      #    # # ######');
console.log('#   #  #    # #  #      #     # #      #      #    # # #    #');
console.log(' ### #  ####  # ###### ###### # #      ###### #####  # #    #');
console.log();

async.series([
    function(done) {
        fs.access(path + filename, function(err) { // default fs.F_OK, se il file è visibile
            if(err) {
                // console.log(filename + ' non trovato, lo ricreo');

                file = false;

                done();
            }
            else {
                // console.log(filename + ' trovato');

                file = true;

                User.findOne({_id: mail}).exec(function (err, user) {
                    if (err)
                        console.log(err);
                    else if (user)
                        password = user.password;

                    done();
                });
            }
        });
    },
    function(done) {
        if(password == null) {
            User.remove({_id: mail}).exec(function (err) {
                if (err)
                    console.log(err);

                done();
            });
        }
        else
            done();
    },
    function(done) {
        if(password == null) {
            new User({
                _id: mail
                , firstName: first
                , lastName: last
                , password: randomstring.generate(16)
            }).save(function (err, user) {
                if (err)
                    console.log(err);
                password = user.password;

                done();
            });
        }
        else
            done();
    },
    function(done) {
        mongoose.connection.close();

        var stream = fs.createWriteStream(path + filename);

        stream.once('open', function() {
            stream.write("###################################################################\n");
            stream.write("#   ####  #    # # ###### ###### # #####  ###### #####  #   ##    #\n");
            stream.write("#  #    # #    # #     #      #  # #    # #      #    # #  #  #   #\n");
            stream.write("#  #    # #    # #    #      #   # #    # #####  #    # # #    #  #\n");
            stream.write("#  #  # # #    # #   #      #    # #####  #      #    # # ######  #\n");
            stream.write("#  #   #  #    # #  #      #     # #      #      #    # # #    #  #\n");
            stream.write("#   ### #  ####  # ###### ###### # #      ###### #####  # #    #  #\n");
            stream.write("###################################################################\n");
            stream.write("###################################################################\n");
            stream.write("#                                                                 #\n");
            stream.write("#  Informazioni di accesso per il superadmin                      #\n");
            stream.write("#                                                                 #\n");
            stream.write('#     username : ' + mail + "                             #\n");
            stream.write('#     password : ' + password + "                                 #\n");
            stream.write("#                                                                 #\n");
            stream.write("###################################################################\n");
            stream.end();
        });
        
        console.log('username : ' + mail);
        console.log('password : ' + password);
        console.log();

        done();
    }
]);