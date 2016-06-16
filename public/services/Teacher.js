/*
 * Nome del file: Teacher.js
 * Percorso: public/services/Teacher.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per il docente
 *
 * * Diario delle modifiche:
 *
 */

angular.module().factory('Teacher',['User',function(User){
    
    function Teacher(firstName,lastName,mail,password){
        User.call(this,firstName,lastName,mail,password);
        
        this.ownQuiz = []; //Quiz[]
    };
    
    
    Teacher.prototype.getOwnQuiz = function (){
      return this.ownQuiz;  
    };
    
    
    Teacher.prototype.addQuiz = function(newQuiz){ //newQuiz:Quiz
        this.ownQuiz.push(newQuiz);
    };
    
    Teacher.prototype.removeQuiz = function(indexOfQuiz){
       this.ownQuiz.splice(indexQuiz,1);  
    };
    
  
    
    
    
    return Teacher;
    
    
}]);