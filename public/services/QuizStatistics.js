/*
 * Nome del file: QuizStatistics.js
 * Percorso: public/services/QuizStatistics.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per le statistiche dei quiz
 *
 * * Diario delle modifiche:
 *
 */

angular.module('').factory ('QuizStatistics', [function() {
    function QuizStatistics(time,successRate,averageResult) {        
        this.timesSolved = time; //int
        this.successRate = successRate; //double
        this.averageResult = averageResult; //double
    };      
    
    QuizStatistics.prototype.getTimeSolved = function(){
        return this.timesSolved;
    };
    
    QuizStatistics.prototype.getSuccessRate = function(){
      return this.successRate;  
    };
    
    
    QuizStatistics.prototype.getAverageResult = function(){
        return this.averageResult;
    };   
    
    return QuizStatistics;
    
}]);