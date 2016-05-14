angular.module().factory('AnswerQuiz',['Quiz','AnswerQuestion',function(Quiz, AnswerQuestion){
    
    function AnswerQuiz(quiz,date,answerQuestion){
        this.quiz = quiz; //Quiz
        this.date = date; // Data
        this.answerQuestion = answerQuestion;//AnswerQuestion[]
    };
    
    
    AnswerQuiz.prototype.check = function(){
        //return bool
    };
    
    
    AnswerQuiz.prototype.addAnswer = function(answer){ //AnswerQuestion
        
    };
    
    AnswerQuiz.prototype.removeAnswer = function(indexOfAnswer){
      this.answerQuestion.splice(index,1);  
    };
    
    
    AnswerQuiz.prototype.getQuiz = function(){
      return this.quiz;
    };
    
    
    AnswerQuiz.prototype.getDate = function(){
      return this.date;  
    };
    
    AnswerQuiz.prototype.getAnswerQuestion = function(){
      return this.answerQuestion;  
    };
    
    
    return AnswerQuiz;
    
    
    
}]);