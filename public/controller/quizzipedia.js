angular.module('registrazione',[]).controller('CtrlRegistration',['Data','ChildData','$scope',function(Data,ChildData,$scope){
    
    
    //$scope.dati = new Data();
    $scope.dati = new ChildData();
    
    
    $scope.user ={
        firstName: null,
        lastName: null,
        mail: null,
        flag: false,
        update: function(user){
            this.flag = true;
            $scope.dati.modifica(user.firstName,user.lastName,user.mail);
            //this.firstName = null;
            //this.lastName = null;
            //this.flag = false;
        }
    };
    
    
}]);