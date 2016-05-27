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

//get Questions with topic
questionSchema.methods.getQuestionsByTopic = function(topic) {
  return this.find({ topic: this.topic });
}

//get Questions with title
questionSchema.methods.getQuestionsByTitle = function(title) {
  return this.find({ title: this.title });
}

//get Questions with keywords
questionSchema.methods.getQuestionsByKeywords = function(keywords) {
    var result = this.find();
    keywords.forEach(function(entry) {
        result = result.find({ keywords: {$in: entry}});
    });
    return result;
}

//get Questions with difficulty
questionSchema.methods.getQuestionsByDifficulty = function (difficulty) {
  return this.find({ difficulty: this.difficulty });
}

//get Questions with author
questionSchema.methods.getQuestionsByAuthor = function (author) {
  return this.find({ author: this.author });
}

//find Questions with topic
questionSchema.methods.findQuestionsByTopic = function(topic) {
  return this.model('Question').find({ topic: this.topic });
}

//find Questions with title
questionSchema.methods.findQuestionsByTitle = function(title) {
  return this.model('Question').find({ title: this.title });
}

//find Questions with keywords
questionSchema.methods.findQuestionsByKeywords = function(keywords) {
    var result = this.model('Question').find();
    keywords.forEach(function(entry) {
        result = result.find({ keywords: {$in: entry}});
    });
    return result;
}

//find Questions with difficulty
questionSchema.methods.findQuestionsByDifficulty = function (difficulty) {
  return this.model('Question').find({ difficulty: this.difficulty });
}

//find Questions with author
questionSchema.methods.findQuestionsByAuthor = function (author) {
  return this.model('Question').find({ author: this.author });
}

//export
module.exports =  mongoose.model('Question', questionSchema);