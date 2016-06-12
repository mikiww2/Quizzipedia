/*
 * Nome del file: quiz.model.js
 * Percorso: app/model/quiz.model.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Model che rappresenta i quiz nel database e vari metodi associati
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
    ,topics: {
        type: [String]
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
        ,required: [true, 'difficulty is required']
        
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

//countQuestions
quizSchema.virtual('countQuestions').get(function() {
    this.questions.count({}, function(err, number) {
        return number;
    });
});

//Count Quiz with Question (scope = collection)
quizSchema.statics.CountQuizWithQuestion = function(question) {
    if(question.constructor.name !== 'ObjectID')
        question = question._id;

    return this.count({ questions: {$in: question} }, function(err, number) {
        return number;
    });
};

//find Quiz with topics (scope = collection)
quizSchema.statics.findQuizByTopics = function(topics) {
    var result = this.find();
    topics.forEach(function(entry) {
        result = result.find({ topics: {$in: entry}});
    });
    return result;
};

//find Quiz with keywords (scope = collection)
quizSchema.statics.findQuizByKeywords = function(keywords) {
    var result = this.find();
    keywords.forEach(function(entry) {
        result = result.find({ keywords: {$in: entry}});
    });
    return result;
};

//find Quiz with title (scope = collection)
quizSchema.statics.findQuizByTitle = function(title) {
  return this.find({ title: title });
};

//find Quiz with difficulty (scope = collection)
quizSchema.statics.findQuizByDifficulty = function(difficulty) {
  return this.find({ difficulty: difficulty });
};

//find Quiz with author (scope = collection)
quizSchema.statics.findQuizsByAuthor = function(author) {
  return this.find({ author: author });
};

//export
module.exports = mongoose.model('Quiz', quizSchema);