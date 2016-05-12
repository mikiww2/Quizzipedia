module.factory('RequestClass',['Class', function(Class){
    function RequestClass (mail, class){
        this.mail = mail;
        this.class = class; //tipo Class             
    };
    
    Request.prototype.getMail = function(){
        return this.mail;  
    };
    
    Request.prototype.getNameClass = function(){
        return this.class;
    };  
    
    return RequestClass;
}]);