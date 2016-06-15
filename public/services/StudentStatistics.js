/*
 * Nome del file: StudentStatistics.js
 * Percorso: public/services/StudentStatistics.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per le statistiche studente
 *
 * * Diario delle modifiche:
 *
 */

//Include Info

angular.module('').factory ('StudentStatisticsQuiz', [function() {
    function StudentStatistics(student,result) {
        
        this.students = student; //Student[]
        this.results = result; //double[]
    };    
    
    StudentStatistics.prototype.getStudent = function(){
      return this.student;  
    };
    
    
    StudentStatistics.prototype.getResult = function(){
      return this.result;  
    };
    
    
    return StudentStatisticsQuiz;
    
}]);