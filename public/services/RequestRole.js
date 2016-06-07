angular.module('RequestsManager').factory('RequestRole',[function(){
    
    function RequestRole(mail,nameOfInstitution,message){
      
        this.mail = mail;
        this.nameInstitution = nameOfInstitution;
        this.message = message;
        
    };
    
    RequestRole.prototype.getMail = function(){
       return this.mail;  
    };
    
    RequestRole.prototype.getNameInstitution = function(){
      return this.nameInstitution;  
    };
    
    RequestRole.prototype.getMessage = function(){
        return this.message;
    };
    
    
    
    return RequestRole;
    
}]);