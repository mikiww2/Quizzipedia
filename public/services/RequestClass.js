angular.module('RequestsManager').factory('RequestClass',['Class', function(Class){
    function RequestClass (mail, classs){
        this.mail = mail;
        this.classs = classs; //tipo Class
    };
    
    RequestClass.prototype.getMail = function(){
        return this.mail;  
    };
    
    RequestClass.prototype.getNameClass = function(){
        return this.classs;
    };  
    
    return RequestClass;
}]);