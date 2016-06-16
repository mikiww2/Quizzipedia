/*
 * Nome del file: AnswerMultipleChoiceQ.js
 * Percorso: public/services/AnswerMultipleChoiceQ.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo riposta multipla
 *
 * * Diario delle modifiche:
 *
 */

angular.module('QuizSolver').factory('AnswerMultipleChoiceQ',['AnswerQuestion',function(AnswerQuestion){
    
    function AnswerMultipleChoiceQ(question){
        AnswerQuestion.call(this,question);
        this.givenAnswer = []; //bool[]
    };
    
    AnswerMultipleChoiceQ.prototype = AnswerQuestion.prototype;
    
    AnswerMultipleChoiceQ.prototype.checkMultiple = function(){
        
        var correct = true;
        for(var i = 0; i < this.givenAnswer.length && correct; i++){
            
            var given = this.givenAnswer[i].toString();
            var correctAnswer = this.question.details.arrayAnswer[i].isTrue.toString();
            
            if(given != correctAnswer){
                correct = false;
            }
            
        }
        
        return correct;
        
    };
    
    AnswerMultipleChoiceQ.prototype.addAnswer = function(ans){
        this.givenAnswer.push(ans);
    };
    
    AnswerMultipleChoiceQ.prototype.getGivenAnswer = function(){
      return this.givenAnswer;  
    };
    
    
    
    return AnswerMultipleChoiceQ;
    
    
}]);