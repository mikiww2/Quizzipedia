angular.module('userApp', ['userController', 'userService']);

angular.module('Quizzipedia',[]);
angular.module('Registration',['Quizzipedia']);
angular.module('QuestionManager',['Quizzipedia', 'CreateQuestion']);
angular.module('CreateQuestion',['Quizzipedia', 'ngFileUpload']);
angular.module('ProfileManager', ['Quizzipedia']);
angular.module('RequestsManager', ['Quizzipedia']);
angular.module('InstClassManager', ['Quizzipedia', 'ui.bootstrap']);
angular.module('TopicsManager', ['Quizzipedia']);
angular.module('UsersManager', ['Quizzipedia']);
angular.module('SearchManager', ['Quizzipedia']);
angular.module('QuizManager', ['Quizzipedia', 'ui.bootstrap']);

angular.module('InstitutionManager', ['Quizzipedia']);
