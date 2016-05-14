angular.module().factory('Director',['User',function(User){
    
    function Director(firstName,lastName,mail,password){
        User.call(this,firstName,lastName,mail,password);        
    };    
        
    Director.prototype = User.prototype;    
    
    return Director;    
    
}]);