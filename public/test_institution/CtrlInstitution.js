angular.module('institutionmanager',[]).controller('CtrlInstitution',['$scope','$http',function($scope,$http){
    
  $scope.institutions = {};

  $http.get('/api/institution/fetch_user_inst').success(function(response){
      $scope.institutions = response;
  });

}]);
