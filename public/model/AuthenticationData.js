angular.module('registrazione').factory('Data',[function(){
    function Data(){
        this.firstName = "a";
        this.lastName = "b";
        this.flag = false;
    };
    
    Data.prototype.modifica = function(fname,lname){
        this.flag = true;
        this.firstName = fname;
        this.lastName = lname;
    };
    
    return Data;
}]);