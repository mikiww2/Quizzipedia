"use strict";

var config = require('../../config/upload'); // path delle cartelle upload

var multer = require('multer'); // si occupa del salvataggio
var glob = require("glob"); // pattern matching su fs
var mkdirp = require('mkdirp'); // crea la cartella se manca
var fs = require('fs');



//set storage configuration
var storageTmp = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, config.pathTmpFiles);
        }
        , filename: function (req, file, cb) {
            // req.session.user._id
            cb(null, "nome.utente" + '_' + Date.now() + "_" + file.originalname);
        }
    });

exports.upload = function (req, res, next) {
    mkdirp(config.pathTmpFiles, function(err) {
        if(err) {
            console.log(err);
            res.send({ result: "error" });
        }
        else {
            multer({storage: storageTmp
                // , fileFilter: function(req, file, cb) {
                //     cb(null, true);
                // }
            }).single('file')(req, res, next);
            res.send({ result: "done" });
        }
    });
};

exports.remove = function (req, res, next) {
    // var user = req.session._id;
    var user = "nome.utente";
    var pattern = config.pathTmpFiles + "/" + user + "_*";

    glob(pattern, { nodir: true }, function (err, files) {
        if(err) {
            console.log(err);
            res.send({ result: "error" });
        }
        else {
            console.log("files :");
            console.log(files);

            files.forEach(function(file) {
                fs.unlink(file, function(err) {
                    if(err)
                        return console.log(err);
                });
            });
            res.send({ result: "done" });
        }
    });
};

// funzione usata da questionManager per salvare un allegato, ritorna il path o null se c'è stato un errore
exports.save = function(user, filename, questionId) {
    var newPathFile = config.pathFiles + "/" + questionId + "_" + Date.now() + "_" + filename;
    var pattern = config.pathTmpFiles + "/" + user + "_*_" + filename;

    console.log("old pattern file : " + pattern);
    console.log("new path file : " + newPathFile);

    mkdirp(config.pathFiles, function(err) {
        if (err)
            console.log(err);

        glob(pattern, function (err, matches) {
            if(err) {
                console.log(err);
                newPathFile = null;
            }
            else {
                console.log("file trovati da salvare");
                console.log(matches);
                fs.renameSync(matches[0], { nodir: true }, newPathFile, function(err) {
                    if (err) {
                        console.log(err);
                        newPathFile = null;
                    }
                });
            }
        });
    });

    return newPathFile;
};

