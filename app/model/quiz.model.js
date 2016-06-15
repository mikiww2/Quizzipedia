/*
 * Nome del file: quiz.model.js
 * Percorso: app/model/quiz.model.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Model che rappresenta i quiz nel database
 *
 * * Diario delle modifiche:
 *
 */

'use strict';

//declare required
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//quiz
var quizSchema = new Schema({
    
    author: {
        type: String
        ,required: [true, 'author is required']
    }
    ,creationDate: {
        type: Date
        ,required: [true, 'date is required']
    }
    ,classes: {
        type: [Schema.Types.ObjectId]
        ,required: false
    }
    ,topic: {
        type: String
        ,required: false
    }
    ,description: {
        type: [String]
        ,required: false
    }
    ,difficulty: {
        type: Number
        ,min: 1
        ,max: 4
        ,required: false
        
    }
    ,questions: {
        type: [Schema.Types.ObjectId]
        ,required: [true, 'quiz must have at least one question']
    }
    ,keywords: {
        type: [String]
        ,required: false
    }
    ,title: {
        type: String
        ,required: [true, 'title is required']
    }
    ,institution: {
        type: String
        ,required: [true, 'institution name is required']
    }
}, { strict: true });

//export
module.exports = mongoose.model('Quiz', quizSchema);