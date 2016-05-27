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
    ,topic: String
    ,title: String
    ,keywords: [String]
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
questionSchema.methods.findQuestionsByTopic = function findQuestionsByTopic(topic) {
  return this.model('Question').find({ topic: this.topic });
}

//find Questions with title (scope = collection)
questionSchema.methods.findQuestionsByTitle = function findQuestionsByTitle(title) {
  return this.model('Question').find({ title: this.title });
}

//find Questions with keywords (scope = collection)
questionSchema.methods.findQuestionsByKeywords = function findQuestionsByKeywords(keywords) {
    var result = this.model('Question').find();
    keywords.forEach(function(entry) {
        result = result.find({ keywords: {$in: entry}});
    });
    return result;
}

//find Questions with difficulty (scope = collection)
questionSchema.methods.findQuestionsByDifficulty = function findQuestionsByDifficulty(difficulty) {
  return this.model('Question').find({ difficulty: this.difficulty });
}

//find Questions with author (scope = collection)
questionSchema.methods.findQuestionsByAuthor = function findQuestionsByAuthor(author) {
  return this.model('Question').find({ author: this.author });
}

//export
module.exports =  mongoose.model('Question', questionSchema);