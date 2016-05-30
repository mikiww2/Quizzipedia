'use strict';

//declare required
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//question
var questionSchema = new Schema({
    author: String
    ,title: String
    ,description: String
    ,topic: String
    ,difficulty: {
        type: Number
        ,min: 1
        ,max: 4
        ,required: [true, 'difficulty is required']
    }
    ,type: {
        type: String
        ,default: 'trfs'
    }
    ,questionAttachement: String
    ,keywords: [String]
    ,correctAnswer: Boolean

}, { strict: true });

//export
module.exports =  mongoose.model('TFQuestion', questionSchema); 
