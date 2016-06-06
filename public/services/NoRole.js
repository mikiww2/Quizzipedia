angular.module('Quizzipedia').factory('NoRole',['User', 'AnswerQuiz',function(User, AnswerQuiz){
    
    function NoRole(firstName,lastName,mail,password){
        User.call(this,firstName,lastName,mail,password);
        this.quizProfile = []; //AnswerQuiz
    };
    
    
    NoRole.prototype.loadProfileQuiz = function(){
       //prendiamo la lista di quiz ricevuta dal server e la assegno al quizProfile  
    };
    
    
    NoRole.prototype.addQuizToProfile = function(quiz){ //quiz:AnswerQuiz
        if(quiz instanceof AnswerQuiz)
        this.quizProfile.push(quiz);
    };
    
    NoRole.prototype.removeQuizFromProfile = function(indexOfQuiz){
      this.quizProfile.splice(indexOfQuiz,1);  
    };
    
    NoRole.prototype.getQuizProfile = function(){
      return this.quizProfile;  
    };
    
    NoRole.prototype = User.prototype;
    
    
    return NoRole;
    
}]);