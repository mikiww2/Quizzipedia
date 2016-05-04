angular.module('registrazione').factory('ChildData',['Data',function(Data){
    
    function ChildData(){
        Data.call(this);
        this.flag2 = false;
        this.email = "cicciolina@boh.com"
    };
    
    
    ChildData.prototype.modifica = function(fname,lname,mail){
        this.flag2 = true;
        this.email = mail;
        Data.prototype.modifica.call(this,fname,lname);
        
    };
    
    
    return ChildData;
}]);