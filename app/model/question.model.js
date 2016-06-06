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
    
    
}, { strict: true });

//find Questions with topic (scope = collection)
questionSchema.statics.findQuestionsByTopic = function(topic) {
  return this.find({ topic: topic });
};

//find Questions with keywords (scope = collection)
questionSchema.statics.findQuestionsByKeywords = function(keywords) {
    var result = this.find();
    keywords.forEach(function(entry) {
        result = result.find({ keywords: {$in: entry}});
    });
    return result;
};

//find Questions with difficulty (scope = collection)
questionSchema.statics.findQuestionsByDifficulty = function(difficulty) {
  return this.find({ difficulty: difficulty });
};

//find Questions with author (scope = collection)
questionSchema.statics.findQuestionsByAuthor = function(author) {
  return this.find({ author: author });
};

//export
module.exports =  mongoose.model('Question', questionSchema);