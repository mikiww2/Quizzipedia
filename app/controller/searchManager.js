
var Quiz = require('../model/quiz.model');
var Question = require('../model/question.model');

export.findQuiz = function (req, res) {
    var title = req.body.title;
    var author = req.body.author;
    var selectedTopic = req.body.selectedTopic;
    var selectedKeywords[] = req.body.selectedKeywords;
    var difficulty = req.body.difficulty;
    var permission = req.body.permission; //da fare

};

export.findQuestion = function (req, res) {
    var title = req.body.title;
    var author = req.body.author;
    var selectedTopic = req.body.selectedTopic;
    var selectedKeywords[] = req.body.selectedKeywords;
    var difficulty = req.body.difficulty;
    var result = Question.findQuestionsByTopic(selectedTopic);
    if (author)
        result = result.findQuestionsByAuthor(author);
    if (title)
        result = result.findQuestionsByTitle(title);
    if (selectedKeywords)
        result = result.findQuestionsByKeywords(selectedKeywords);
    if (difficulty)
        result = result.findQuestionsByDifficulty(difficulty);
    return result;
};