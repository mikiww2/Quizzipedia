/*
 * Nome del file: AnswerCompletationQ.js
 * Percorso: public/services/AnswerCompletationQ.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo completamento testo
 *
 * * Diario delle modifiche:
 *
 */

angular.module('QuizSolver').factory('AnswerCompletionQ',['AnswerQuestion',function(AnswerQuestion){
    
    function AnswerCompletionQ(question){
      
        AnswerQuestion.call(this,question);
        this.givenAnswer = []; //negli indici dispari ci sono le stringhe dei buchi
        
        
    };
    
    
    AnswerCompletionQ.prototype = AnswerQuestion.prototype;
    
    AnswerCompletionQ.prototype.checkCompletion = function(){
        /*
        so che i buchi si trovano nell'array testo con indice dispari e lo incremento ogni volta di 2
        leggo l'id del buco e cerco nelle risposte il buco con quell'id confronto la risposta corretta con quella
        che ha dato l'utente
        
        */
        
        var condizione = true;
        
        var index = 1; //primo buco nel testo
        while(index < this.givenAnswer.length && condizione){
            var answer = this.givenAnswer[index];
            
            var idHole = this.question.details.text[index].value;
            
            var trovato = false;
            var correctValue = null;
            for(var i = 0; i < this.question.details.answer.length; i++){
                if(this.question.details.answer[i].id == idHole){
                     trovato = true;
                    correctValue = this.question.details.answer[i].text;
                }
            }
            
            if(answer != correctValue){
                condizione = false;
            }
            
            
            index = index + 2;
        }
        
        return condizione;
        
        
    };
    
    AnswerCompletionQ.prototype.addAnswer = function(ans){
        this.giveAnswer.push(ans);
    };
    
    AnswerCompletionQ.prototype.getGivenAnswer = function(){
      return this.givenAnswer;  
    };
    
    return AnswerCompletionQ;
    
    
    
}]);