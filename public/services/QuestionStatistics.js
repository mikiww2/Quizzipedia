/*
 * Nome del file: QuestionStatistics.js
 * Percorso: public/services/QuestionStatistics.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per le statistiche delle domande
 *
 * * Diario delle modifiche:
 *
 */

//Include Info

angular.module('').factory ('QuestionStatistics', [function() {
    function QuestionStatistics(quizNumber,successRate) {        
        this.quizNumber = quizNumber; //int
        this.successRate = successRate; //double
    };    
    
    QuestionStatistics.prototype.getQuizNumber = function(){
        return this.quizNumber;
    };
    
    QuestionStatistics.prototype.getSuccessRate = function(){
        return this.successRate;
    };    
    
    return QuestionStatistics;
    
}]);