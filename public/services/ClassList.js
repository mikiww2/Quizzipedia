module.factory('ClassList',['Request',function(Request){
    function ClassList(){
        this.classRequests = [];
    };
    
    ClassList.prototype.addClassRequest = function(mail,nameClass,year){
        
        this.classRequests.push(new Request(mail,nameClass,year));
        
    };
    
    ClassList.prototype.removeClassRequest = function(indexOfRequest){
        if(indexOfrequest >= 0 && indexOfRequest < this.classRequests.length){
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