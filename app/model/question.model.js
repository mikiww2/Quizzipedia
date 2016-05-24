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
    ,keywords: [String]
    ,difficulty: {
        type: Number
        ,min: 1
        ,max: 5
        ,required: [true, 'difficulty is required']
        
    }
    ,author: {
        type: String
        ,required: [true, 'author is required']
    }
    
    
}, { strict: true });

//find Questions with topic
questionSchema.methods.findQuestionsByTopic = function (topic) {
  return this.model('Question').find({ topic: this.topic });
}

//find Questions with keywords
questionSchema.methods.findQuestionsByKeywords = function (keywords) {
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

// //find Questions with attibutes
// questionSchema.methods.findQuestionsByAttribute = function (topic, keywords, difficulty, author) {
//     //
//   return this.model('Organization').find({ director: this.director });
// }

//export
module.exports =  mongoose.model('Question', questionSchema);