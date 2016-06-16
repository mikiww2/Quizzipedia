/*
 * Nome del file: AnswerTrueFalseQ.js
 * Percorso: public/services/AnswerTrueFalseQ.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo vero o falso
 *
 * * Diario delle modifiche:
 *
 */

angular.module('QuizSolver').factory('AnswerTrueFalseQ',['AnswerQuestion',function(AnswerQuestion){
    
    function AnswerTrueFalseQ(question,answer){
        
        AnswerQuestion.call(this,question);
        this.givenAnswer = answer; //bool
        
    };
    
    AnswerTrueFalseQ.prototype = AnswerQuestion.prototype;
    
    
    AnswerTrueFalseQ.prototype.checkTF = function(){
        //guardo la givenAnswer e vedo se è uguale alla risposta dentro il riferimento question
        if(this.givenAnswer == this.question.details.correctAnswer){
            return true;
        }
        else{
            return false;
        }
    };
    
    AnswerTrueFalseQ.prototype.getGivenAnswer = function(){
      return this.givenAnswer;  
    };
    
    AnswerTrueFalseQ.prototype.setGivenAnswer = function(answer){
      this.givenAnswer = answer;  
    };
    
    return AnswerTrueFalseQ;
    
}]);