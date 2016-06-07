angular.module('RequestsManager').factory('RequestClass',[function(){
    function RequestClass (mail, className, year){
        this.mail = mail;
        this.className = className;
        this.year =year;
    };
    
    RequestClass.prototype.getMail = function(){
        return this.mail;  
    };
    
    RequestClass.prototype.getNameClass = function(){
        return this.className;
    };  

    RequestClass.prototype.getYear = function() {
        return this.year;
    };

    return RequestClass;
}]);