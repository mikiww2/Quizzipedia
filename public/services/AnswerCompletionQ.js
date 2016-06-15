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
    
    function AnswerCompletionQ(solver,question,answer){
      
        AnswerQuestion.call(this,solver,question);
        this.givenAnswer = answer; //String[]
        
        
    };
    
    AnswerCompletionQ.prototype.check = function(){
        /*
        so che i buchi si trovano nell'array testo con indice dispari e lo incremento ogni volta di 2
        leggo l'id del buco e cerco nelle risposte il buco con quell'id confronto la risposta corretta con quella
        che ha dato l'utente
        
        */
    };
    
    AnswerCompletionQ.prototype.getGivenAnswer = function(){
      return this.givenAnswer;  
    };
    
    return AnswerCompletionQ;
    
    
    
}]);