/*
 * Nome del file: registerservice.js
 * Percorso: public/service/registerservice.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la registrazione
 *
 * * Diario delle modifiche:
 *
 */

angular.module('userService', [])
	.factory('Users', ['$http',function($http) {
		return {
			post : function() {
				return $http.post('/api/register');
			}
		}
	}]); 
