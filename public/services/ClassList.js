/*
 * Nome del file: ClassList.js
 * Percorso: public/services/ClassList.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la lista delle classi
 *
 * * Diario delle modifiche:
 *
 */

angular.module('RequestsManager').factory('ClassList',['RequestClass',function(RequestClass){
    function ClassList(){
        this.classRequests = []; // array di RequestClass
    };
    
    ClassList.prototype.addClassRequest = function(mail,className,year){
        
        this.classRequests.push(new RequestClass(mail,className,year));
        
    };
    
    ClassList.prototype.removeClassRequest = function(indexOfRequest){
        if(indexOfRequest >= 0 && indexOfRequest < this.classRequests.length){
            this.classRequests.splice(indexOfRequest,1);
        }
    };
    
    ClassList.prototype.acceptClassRequest = function(indexOfRequest){
      
        if(indexOfRequest >= 0 && indexOfRequest < this.classRequests.length){
            //aggiungere l'utente dentro a questa classe e lo rimuovo dalla classRequest
            
            //prima di rimuoverla faccio la richiesta al server
            this.removeClassRequest(indexOfRequest);
        }
    };

    return ClassList;
    
}]);