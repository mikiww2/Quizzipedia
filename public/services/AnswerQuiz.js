/*
 * Nome del file: AnswerQuiz.js
 * Percorso: public/services/AnswerQuiz.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per un quiz
 *
 * * Diario delle modifiche:
 *
 */

angular.module('QuizSolver').factory('AnswerQuiz',['AnswerQuestion',function(AnswerQuestion){
    
    function AnswerQuiz(idQuiz){
        this.quiz = idQuiz; //idQuiz
        this.date = null; // Data
        this.solver = null; // chi risolve il quiz
        this.answerQuestion = [];//AnswerQuestion[]
    };
    
    
    
    AnswerQuiz.prototype.setIdQuiz = function(id){
      this.quiz = id;  
    };
    
    
    AnswerQuiz.prototype.addAnswer = function(answer){ //AnswerQuestion
        this.answerQuestion.push(answer);
    };
    
    AnswerQuiz.prototype.removeAnswer = function(indexOfAnswer){
      this.answerQuestion.splice(index,1);  
    };
    
    
    AnswerQuiz.prototype.getIdQuiz = function(){
      return this.idQuiz;
    };
    
    
    AnswerQuiz.prototype.getDate = function(){
      return this.date;  
    };
    
    AnswerQuiz.prototype.getAnswerQuestion = function(){
      return this.answerQuestion;  
    };
    
    
    return AnswerQuiz;
    
    
    
}]);