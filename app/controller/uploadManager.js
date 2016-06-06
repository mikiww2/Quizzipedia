"use strict";

var config = require('../../config/upload'); // path delle cartelle upload

var multer = require('multer'); // si occupa del salvataggio
var glob = require("glob"); //pattern matching su fs
    
//set storage configuration
var storageTmp = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, config.pathTmpFiles)
    },
    filename: function (req, file, cb) {
        cb(null, req.session.user._id + '_' + file.originalname);
        //nome del file "user.mail"+"_"+"nome originale del file"
    }
});

exports.upload = function (req, res) {
    multer({storage: storage}).single('file');
};

exports.remove = function (req, res) {
    var user = req.session._id;
    var pattern = config.pathTmpFiles + user + "_*";
    console.log("path glob : " + pattern);

    glob(pattern, { nodir: true }, function (err, files) {
        if(err)
            return console.log(err);
        files.forEach(function(file) {
            fs.unlink(file, function(err) {
                if(err)
                    return console.log(err);
            });
        });
    });
};

// funzione usata da questionManager per salvare un allegato
exports.save = function(user, filename, questionId) {
    var pathFile = config.pathTmpFiles + user + "_" + filename;
    var newPathFile = config.pathFiles + questionId + "_" + filename;
    console.log("old path file : " + pathFile);
    console.log("new path file : " + newPathFile);

    fs.renameSync(pathFile, newPathFile, function(err) {
        if(err)
            return console.log(err);
    });

    return newPathFile;
};

