/*
 * Nome del file: question.model.js
 * Percorso: app/model/question.model.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Model che rappresenta le domande nel database
 *
 * * Diario delle modifiche:
 *
 */

'use strict';

//declare required
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//question
var questionSchema = new Schema({
    qml: {
        type: String
        ,required: [true, 'qml question is required']
        }
    ,title: {
        type: String
        ,required: [true, 'title question is required']
    }
    ,topic: {
        type: String
        ,required: false
    }
    ,keywords: {
        type: [String]
        ,required: false
    }
    ,difficulty: {
        type: Number
        ,min: 1
        ,max: 4
        ,required: [true, 'difficulty is required']
        
    }
    ,author: {
        type: String
        ,required: [true, 'author is required']
    }
    ,description: {
        type: String
        ,required: [false]
    }
    ,institution: {
        type: String
        ,required: [true, 'institution name is required']
    }

}, { strict: true });

//export
module.exports =  mongoose.model('Question', questionSchema);