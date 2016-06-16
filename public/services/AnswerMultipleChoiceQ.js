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
        console.log("CHECK MULTIPLECHOICE");
        
        var correct = true;
    console.log(this.givenAnswer.length);
        for(var i = 0; i < this.givenAnswer.length && correct; i++){
            //console.log('myanswer: '+this.givenAnswer[i]+ ' correct: '+this.question.details.arrayAnswer[i].isTrue);
            
            var given = this.givenAnswer[i].toString();
            var correctAnswer = this.question.details.arrayAnswer[i].isTrue.toString();
            console.log('given: '+ given + 'correctAnswer: '+correctAnswer);
            
            if(given != correctAnswer){
                correct = false;
            }
            
            /*
            if(this.givenAnswer[i] != this.question.details.arrayAnswer[i].isTrue){ //PROBLEMA
                console.log("diversi");
                correct = false;
            }*/
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