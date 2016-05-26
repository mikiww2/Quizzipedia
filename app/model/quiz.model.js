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

//countQuestions
quizSchema.virtual('countQuestions').get(function() {
    return this.questions.lenght;
});

//Count Quiz with Question
quizSchema.methods.CountQuizWithQuestion = function(question) {
    return this.model('Quiz').find({ questions: { $in: function() {
        if(question.constructor.name === 'ObjectID')
            return question;
        else
            return question._id;
    } } }).lenght;
}

//get Quiz with topics
quizSchema.methods.getQuizByTopics = function(topics) {
    var result = this.find();
    topics.forEach(function(entry) {
        result = result.find({ topics: {$in: entry}});
    });
    return result;
}

//get Quiz with keywords
quizSchema.methods.getQuizByKeywords = function(keywords) {
    var result = this.find();
    keywords.forEach(function(entry) {
        result = result.find({ keywords: {$in: entry}});
    });
    return result;
}

//get Quiz with title
quizSchema.methods.getQuizByTitle = function(title) {
  return this.find({ title: this.title });
}

//get Quiz with author
quizSchema.methods.getQuizsByAuthor = function (author) {
  return this.find({ author: this.author });
}

//find Quiz with topics
quizSchema.methods.findQuizByTopics = function(topics) {
    var result = this.model('Quiz').find();
    topics.forEach(function(entry) {
        result = result.find({ topics: {$in: entry}});
    });
    return result;
}

//find Quiz with keywords
quizSchema.methods.findQuizByKeywords = function(keywords) {
    var result = this.model('Quiz').find();
    keywords.forEach(function(entry) {
        result = result.find({ keywords: {$in: entry}});
    });
    return result;
}

//find Quiz with title
quizSchema.methods.findQuizByTitle = function(title) {
  return this.model('Quiz').find({ title: this.title });
}

//find Quiz with author
quizSchema.methods.findQuizsByAuthor = function (author) {
  return this.model('Quiz').find({ author: this.author });
}

//export
module.exports = mongoose.model('Quiz', quizSchema);