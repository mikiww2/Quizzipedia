angular.module('userApp', ['userController', 'userService']);

angular.module('Quizzipedia',[]);
angular.module('Registration',['Quizzipedia']);
angular.module('CreateQuestion',['Quizzipedia']);
angular.module('QuestionManager',['Quizzipedia', 'CreateQuestion']);
angular.module('ProfileManager', ['Quizzipedia']);
angular.module('RequestsManager', ['Quizzipedia']);