angular.module('managerRequests').controller('CtrlRequestRole',['$scope','RoleList','NoRole',function($scope,RoleList,NoRole){
    
    
    $scope.institutionName = ["A","B","C","D"]; //devo richiederla al server
    $scope.user = new NoRole("Pippo","Pluto","Paperino@gmail.com","1234567890");
    $scope.request = new RoleList(); //devo richiederla al server
    
    $scope.sendRoleRequest = {
        institutionSelect: null,
        roleSelect: null,
        message: null,
        sendRequest: function(sendRoleRequest){
            $scope.request.addRoleList(sendRoleRequest.institutionSelect,$scope.user.getMail(),sendRoleRequest.message,sendRoleRequest.roleSelect);
            
            
        }
    };
    
    
    
    
}]);