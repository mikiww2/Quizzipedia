/*
 * Nome del file: core.js
 * Percorso: public/core.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  File che raggruppa i moduli di angular
 *
 * * Diario delle modifiche:
 *
 */

angular.module('userApp', ['userController', 'userService']);

angular.module('Quizzipedia',[]);
angular.module('Registration',['Quizzipedia']);
angular.module('Authentication',['Quizzipedia']);
angular.module('RecoverPswd',['Quizzipedia']);
angular.module('Issues',['Quizzipedia']);
angular.module('QuestionManager',['Quizzipedia', 'CreateQuestion', 'ui.bootstrap']);
angular.module('CreateQuestion',['Quizzipedia', 'ngFileUpload']);
angular.module('ProfileManager', ['Quizzipedia']);
angular.module('RequestsManager', ['Quizzipedia']);
angular.module('InstClassManager', ['Quizzipedia', 'ui.bootstrap']);
angular.module('TopicsManager', ['Quizzipedia']);
angular.module('StatisticManager', ['Quizzipedia']);
angular.module('UsersManager', ['Quizzipedia']);
angular.module('SearchManager', ['Quizzipedia']);
angular.module('QuizManager', ['Quizzipedia', 'ui.bootstrap']);
angular.module('QuizSolver', ['Quizzipedia','CreateQuestion']);

angular.module('InstitutionManager', ['Quizzipedia']);
