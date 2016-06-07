"use strict";

var config = require('../../config/upload'); // path delle cartelle upload

var multer = require('multer'); // si occupa del salvataggio
var glob = require("glob"); // pattern matching su fs
var mkdirp = require('mkdirp'); // crea la cartella se manca




//set storage configuration
var storageTmp = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
            cb(null, config.pathTmpFiles);
    }
    , filename: function (req, file, cb) {
        // cb(null, req.session.user._id + '_' + file.originalname); // + '.' +  mime.extension(file.mimetype)
        cb(null, "nome.utente" + '_' + file.originalname);
    }
});

exports.upload = function (req, res) {
    mkdirp(config.pathTmpFiles, function(err) {
        if(err)
            console.log(err);
    });
    multer({storage: storageTmp}).single('file');
    res.send("done");
};

exports.remove = function (req, res) {
    // var user = req.session._id;
    var user = "nome.utente";
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

    res.send("done");
};

// funzione usata da questionManager per salvare un allegato
exports.save = function(user, filename, questionId) {
    var pathFile = config.pathTmpFiles + user + "_" + filename;
    var newPathFile = config.pathFiles + questionId + "_" + filename;
    console.log("old path file : " + pathFile);
    console.log("new path file : " + newPathFile);

    mkdirp(config.pathFiles, function(err) {
        if (err)
            console.log(err);
    });

    fs.renameSync(pathFile, newPathFile, function(err) {
        if (err)
            return console.log(err);
    });

    return newPathFile;
};

