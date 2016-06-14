/*
 * Nome del file: CtrlUserManagerTest.js
 * Percorso: tests/CtrlUserManagerTest.js
 * Autore: Vault-Tech
 * Data creazione: 18.05.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per il componente: public/profile/CtrlUserManager.js
 *
 * * Diario delle modifiche:
 * 	19.05 2016 Test superato - Rudy Berton
 * 	18.05.2016 Creazione del test - Rudy Berton
 *
 */

"use strict";

describe("CtrlUserManager test", function(){
	var scope;
	var createController;
	var httpBackend;
	var request1;
	var request2;
	//~ var request3;

	beforeEach(function () {
		module('ProfileManager');
	});

	// 1° METODO per impostare il controller
	beforeEach(inject(function ($rootScope, $controller,$injector) {

		/** Per simulare la richiesta fatta dal metodo loadUser() */
		httpBackend = $injector.get('$httpBackend');
		request1 = httpBackend.when('GET', '/api/profile/get_user')
			.respond({firstName : 'Carlo', lastName : 'Conti', mail : 'carlo.conti@gmail.com', password : 'carloconti'});

		/** Per simulare la richiesta fatta dal metodo loadInstitutions() */
		request2= httpBackend.when('GET', '/api/institution/fetch_user_inst')
			.respond({'Scuola guida' : 'Studente', 'Scuola superiore G.Dal Piaz':'Docente'});

		scope = $rootScope.$new();

		createController = function() {
			return $controller('CtrlUserManager', {'$scope': scope});
		};
	}));


	// 2° METODO per impostare il controller
	//~ beforeEach(inject(function($injector) {
	//~
	//~ httpBackend = $injector.get('$httpBackend');
	//~ /** Per simulare la richiesta fatta dal metodo loadUser() */
	//~ request1 = httpBackend.when('GET', '/api/profile/get_full_info_user')
	//~ .respond({firstName : 'Carlo', lastName : 'Conti', mail : 'carlo.conti@gmail.com', password : 'carloconti'});
	//~
	//~ /** Per simulare la richiesta fatta dal metodo loadInstitutions() */
	//~ request2= httpBackend.when('GET', '/api/institution/fetch_user_inst')
	//~ .respond({'Scuola guida' : 'Studente', 'Scuola superiore G.Dal Piaz':'Docente'});
	//~
	//~ /**/
	//~
	//~ scope = $injector.get('$rootScope');
	//~
	//~ var $controller = $injector.get('$controller');
	//~
	//~ createController = function() {
	//~ return $controller('CtrlUserManager', {'$scope' : scope });
	//~ };
	//~ }));


	/*********Inizio dei test***********/

	it("test the method loadUser()",function(){
		var mock_user ={ //figura come un oggetto User
			firstName : 'Carlo',
			lastName : 'Conti',
			mail : 'carlo.conti@gmail.com',
			password : 'carloconti'
		};

		httpBackend.expectGET('/api/profile/get_user');

		var controller = createController();
		scope.loadUser();
		httpBackend.flush();

		expect(scope.user).toEqual(mock_user);
		//console.log(scope.user);
	});

	it("test the method loadInstitutions()", function(){
		var mock_instit={'Scuola guida' : 'Studente', 'Scuola superiore G.Dal Piaz':'Docente'};
		httpBackend.expectGET('/api/institution/fetch_user_inst');

		var controller = createController();
		scope.loadInstitutions();
		httpBackend.flush();

		expect(scope.institutions).toEqual(mock_instit);
		//console.log(scope.institutions);  

	});


});
	
