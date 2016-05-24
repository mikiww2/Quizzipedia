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
    ,classes: [Schema.Types.ObjectId]
    ,topics: [String]
    ,description: [String]
    ,questions: [Schema.Types.ObjectId]
    ,keywords: [String]
    ,title: {
        type: String
        ,required: [true, 'title is required']
    }
}, { strict: true });

//export
module.exports = mongoose.model('Quiz', quizSchema);