var app = angular.module('userController', []);

app.controller('uc', ['Users', function(Users) {
		var self = this;
		self.users = [];
		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Users.get().success(function(data) {
				self.users = data;
			});
	}]);