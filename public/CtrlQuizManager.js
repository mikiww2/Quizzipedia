/*
 * Nome del file: CtrlQuizManager.js
 * Percorso: public/CtrlQuizManager.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller che gestisce i quiz
 *
 * * Diario delle modifiche:
 *
 */

angular.module().controller('CtrlQuizManager',['Teacher','$scope','$http',function(Teacher,$scope,$http){
    
    $scope.teacher = null;
    
    $scope.loadTeacher = function(){
      //invio una richiesta al server e inizializzo la variabile $scope.teacher  
    };
    
    $scope.removeQuiz = function(indexOfQuiz){
        //prendo l'array quiz che trovo in Teacher e lo elimino e lo notifico anche al server 
    };
    
    $scope.modifyQuiz = function(quiz){
         //non sono sicuro vada quiz...
    };
    
}]);