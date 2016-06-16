/*
 * Nome del file: Student.js
 * Percorso: public/services/Student.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per lo studente
 *
 * * Diario delle modifiche:
 *
 */

angular.module('RequestsManager').factory('Student',['User',function(User){

    function Student(firstName,lastName,mail,password){
        User.call(this,firstName,lastName,mail,password);
        this.quizProfile = []; //AnswerQuiz[]
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

    return Student;

}]);