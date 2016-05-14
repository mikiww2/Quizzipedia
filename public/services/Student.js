angular.module().factory('Student',['User',function(User){
    function Student(firstName,lastName,mail,password){
        User.call(this,firstName,lastName,mail,password);
        this.quizProfile = []; //AnswerQuiz
    };
    
    
    Student.prototype.loadQuizProfile = function(){
      
        //prendiamo la lista di quiz ricevuta dal server e la assegno al quizProfile
        
    };
    
    Student.prototype.addQuizToProfile = function(quiz){ //answerQuiz: AnswerQuiz
          this.quizProfile.push(quiz);
        
    };
    
    Student.prototype.removeQuizFromProfile = function(indexOfQuiz){
       this.quizProfile.splice(indexOfQuiz,1);  
    };
    
    Student.prototype.getQuizProfile = function(){
      return this.quizProfile;
    };
    
    
    Student.prototype = User.prototype;
    
}]);