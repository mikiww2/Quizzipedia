angular.module('').factory ('QuizStatistics', [function() {
    function QuizStatistics(time,successRate,averageResult) {        
        this.timesSolved = time; //int
        this.successRate = successRate; //double
        this.averageResult = averageResult; //double
    };      
    
    QuizStatistics.prototype.getTimeSolved = function(){
        return this.timesSolved;
    };
    
    QuizStatistics.prototype.getSuccessRate = function(){
      return this.successRate;  
    };
    
    
    QuizStatistics.prototype.getAverageResult = function(){
        return this.averageResult;
    };   
    
    return QuizStatistics;
    
}]);