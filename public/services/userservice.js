/*
 * Nome del file: userservice.js
 * Percorso: public/services/userservice.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per i servizi utente
 *
 * * Diario delle modifiche:
 *
 */

angular.module('userService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Users', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/users');
			}
		}
	}]);