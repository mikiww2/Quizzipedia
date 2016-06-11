angular.module('Quizzipedia').directive('homePageDirector',function(){
    return {
      restrict: 'E',
      templateUrl: './public/home/homepageDirector.html',
      controller: function ($scope, $http) {
            
            $scope.pendingRR = null;
            $scope.pendingCR = null;
            $scope.numberRequests = null;

            $scope.users = null;
            $scope.numberUsers = null;

            $scope.topics = null;
						$scope.numberTopics = null;

						$scope.classes = null;
						$scope.numberClasses = null;

            $scope.loadRequests = function () {
	            	$http.get('/api/requests/view_role_requests').success(function(response) {
	                  $scope.pendingRR = response;
	              });
	              $http.get('/api/requests/view_class_requests').success(function(response) {
	                  $scope.pendingCR = response;
	              });
	              $scope.numberRequests = $scope.pendingRR.length + $scope.pendingCR.length;
            }

            $scope.loadUsers = function () {
                $http.get('/api/institution/fetch_users_in_inst').success(function(response) {
                    $scope.users = response;
                });
                $scope.numberUsers = $scope.users.length;
            };

            $scope.loadTopics = function(){
			        	$http.get('/api/topic/fetch').success(function(response){
			              $scope.topics = response;
			      		});
			      		$scope.numberTopics = $scope.topics.length;
			      };

			      $scope.loadClasses = function() {
				        $http.get('/api/class/fetch_inst_classes').success(function(response) {
				            $scope.classes = response;
				        });
				        $scope.numberClasses = $scope.classes.length;
				    };
            
            $scope.loadRequests();
            $scope.loadUsers();
            $scope.loadTopics();
            $scope.loadClasses();
        }
    };
});