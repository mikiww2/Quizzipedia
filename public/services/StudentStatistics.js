//Include Info

angular.module('').factory ('StudentStatisticsQuiz', [function() {
    function StudentStatistics(student,result) {
        
        this.students = student; //Student[]
        this.results = result; //double[]
    };    
    
    StudentStatistics.prototype.getStudent = function(){
      return this.student;  
    };
    
    
    StudentStatistics.prototype.getResult = function(){
      return this.result;  
    };
    
    
    return StudentStatisticsQuiz;
    
}]);