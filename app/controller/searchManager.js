/*
 * Nome del file: searchManager.js
 * Percorso: app/controller/searchManager.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 * Controller per la ricerca di quiz e domande nel database
 *
 * * Diario delle modifiche:
 *
 */

var Quiz = require('../model/quiz.model');
var Question = require('../model/question.model');

exports.findQuiz = function (req, res) {
    var title = req.body.title;
    var author = req.body.author;
    var selectedTopic = req.body.selectedTopic;
    var selectedKeywords = req.body.selectedKeywords;
    var difficulty = req.body.difficulty;
    var permission = req.body.permission; //da fare

};

exports.findQuestion = function (req, res) {
    var title = req.body.title;
    var author = req.body.author;
    var selectedTopic = req.body.selectedTopic;
    var selectedKeywords = req.body.selectedKeywords;
    var difficulty = req.body.difficulty;
    var result = Question.getQuestionsByTopic(selectedTopic);
    if (author)
        result = result.getQuestionsByAuthor(author);
    if (title)
        result = result.getQuestionsByTitle(title);
    if (selectedKeywords)
        result = result.getQuestionsByKeywords(selectedKeywords);
    if (difficulty)
        result = result.getQuestionsByDifficulty(difficulty);
    return result;
};