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

// //Count Quiz with Question (scope = collection)
// quizSchema.static.CountQuizWithQuestion = function CountQuizWithQuestion(question) {
//     return this.find({ questions: { $in: function() {
//         if(question.constructor.name === 'ObjectID')
//             return question;
//         else
//             return question._id;
//     } } }).lenght;
// }

// //find Quiz with topics (scope = collection)
// quizSchema.static.findQuizByTopics = function findQuizByTopics(topics) {
//     var result = this.find();
//     topics.forEach(function(entry) {
//         result = result.find({ topics: {$in: entry}});
//     });
//     return result;
// }

// //find Quiz with keywords (scope = collection)
// quizSchema.static.findQuizByKeywords = function findQuizByKeywords(keywords) {
//     var result = this.find();
//     keywords.forEach(function(entry) {
//         result = result.find({ keywords: {$in: entry}});
//     });
//     return result;
// }

// //find Quiz with title (scope = collection)
// quizSchema.static.findQuizByTitle = function findQuizByTitle(title) {
//   return this.find({ title: this.title });
// }

// //find Quiz with difficulty (scope = collection)
// quizSchema.static.findQuizByDifficulty = function findQuizByDifficulty(difficulty) {
//   return this.find({ difficulty: this.difficulty });
// }

// //find Quiz with author (scope = collection)
// quizSchema.static.findQuizsByAuthor = function findQuizsByAuthor(author) {
//   return this.find({ author: this.author });
// }

//export
module.exports = mongoose.model('Quiz', quizSchema);