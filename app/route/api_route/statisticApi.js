var statisticM = require('../../controller/statisticsManager');

module.exports = function (app) {

    app.post('/api/statistic/students', function (req, res, next) {
        statisticM.get_students_results(req, res);
    });

    app.get('/api/statistic/quiz', function (req, res, next) {
        statisticM.quiz_results(req, res);
    });

    app.get('/api/statistic/question', function (req, res, next) {
        statisticM.question_results(req, res);
    });

    app.post('/api/statistic/teachers', function (req, res, next) {
        statisticM.teacher(req, res);
    });
};