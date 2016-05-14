angular.module().factory('Teacher',['User',function(User){
    
    function Teacher(firstName,lastName,mail,password){
        User.call(this,firstName,lastName,mail,password);
        
        this.ownQuiz = []; //Quiz[]
    };
    
    
    Teacher.prototype.getOwnQuiz = function (){
      return this.ownQuiz;  
    };
    
    
    Teacher.prototype.addQuiz = function(newQuiz){ //newQuiz:Quiz
        this.ownQuiz.push(newQuiz);
    };
    
    Teacher.prototype.removeQuiz = function(indexOfQuiz){
       this.ownQuiz.splice(indexQuiz,1);  
    };
    
    Teacher.prototype.getQuizStatistics = function(quiz){ //quiz: Quiz
      //uso il metodo createStatisticsQuiz della classe Quiz che ritorna un QuizStatistics    
        
    };
    
    Teacher.prototype.getStudentStatistics = function(quiz){
        //uso il metodo createStatisticsStudents della classe Quiz che ritorna un StudentsStatisticsQuiz
        
    };
    
    
    
    return Teacher;
    
    
}]);