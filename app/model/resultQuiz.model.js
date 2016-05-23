'use strict';

//declare required
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//answer question
var answerQuestionSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId
        ,required: [true, 'question is required']
    }
    ,qml: {
        type: String
        ,required: [true, 'qml question with answer is required']
        }
    ,solution: Boolean
}, { strict: true });

//answer quiz
var resultQuizSchema = new Schema({
    user: {
        type: String
        ,required: [true, 'user is required']
    }
    ,date: {
        type: Date
        ,required: [true, 'date is required']
    }
    ,answers: [answerQuestionSchema]
    ,quiz: {
        type: Schema.Types.ObjectId
        ,required: [true, 'quiz is required']
    }
//     author: {
//         type: String
//         ,required: [true, 'author is required']
//     }
}, { strict: true });

//export
module.exports = mongoose.model('resultQuiz', resultQuizSchema);