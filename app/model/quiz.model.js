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
    ,difficulty: {
        type: Number
        ,min: 1
        ,max: 4
        ,required: [true, 'difficulty is required']
        
    }
    ,questions: [Schema.Types.ObjectId]
    ,keywords: [String]
    ,title: {
        type: String
        ,required: [true, 'title is required']
    }
}, { strict: true });

//countQuestions
quizSchema.virtual('countQuestions').get(function() {
    return this.questions.lenght;
});

//Count Quiz with Question (scope = collection)
quizSchema.statics.CountQuizWithQuestion = function(question) {
    if(question.constructor.name !== 'ObjectID')
        question = question._id;

    return this.find({ questions: {$in: question} }).lenght;
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