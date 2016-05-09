angular.module('registration',[]).controller('CtrlData',['$scope','$http',function($scope,$http){
    
    $scope.user = {
      
        firstName: null,
        lastName: null,
        email: null,
        cemail: null,
        password: null,
        cpassword: null,
        checkMail: function(){
            return $scope.user.email == $scope.user.cemail;
        },
        checkPassword: function(){
            return $scope.user.password == $scope.user.cpassword;
        },
        sendRegistration: function(){
            
            var condition = true;
            
            if(!$scope.user.checkMail()){
                condition = false;
                alert("Le mail non coincidono");
            }
            
            if(!$scope.user.checkPassword()){
                condition = false;
                alert("Le password non coincidono");
            }
            
            if(condition){
                //salva tutto nel server
                return $http.post('/api/registration', $scope.user).success(function(response){
                    alert(response);
                }).error(function(response){
                    alert(response);
                });
            }
        }
        
    };
    
    
    
    
    
}]);