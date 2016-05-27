angular.module('usermanager',[]).controller('CtrlFullUser',['$scope','$http',function($scope,$http){
    
  $scope.user = {};

  $http.get('/api/profile/get_full_info_user').success(function(response){
      $scope.user = response;
  });

}]);
