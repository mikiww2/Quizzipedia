angular.module('userService', [])
	.factory('Users', ['$http',function($http) {
		return {
			post : function() {
				return $http.post('/api/register');
			}
		}
	}]); 
