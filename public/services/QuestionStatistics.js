//Include Info

angular.module('').factory ('QuestionStatistics', [function() {
    function QuestionStatistics(quizNumber,successRate) {        
        this.quizNumber = quizNumber; //int
        this.successRate = successRate; //double
    };    
    
    QuestionStatistics.prototype.getQuizNumber = function(){
        return this.quizNumber;
    };
    
    QuestionStatistics.prototype.getSuccessRate = function(){
        return this.successRate;
    };    
    
    return QuestionStatistics;
    
}]);