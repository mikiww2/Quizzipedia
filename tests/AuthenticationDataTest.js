/*
 * Nome del file: AuthenticationDataTest.js
 * Percorso: tests/AuthenticationDataTest.js
 * Autore: Vault-Tech
 * Data creazione: 10.05.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per il componente: public/services/AuthenticationData.js
 *
 * * Diario delle modifiche:
 *  12.05 2016 Test superato - Rudy Berton
 *  10.05.2016 Creazione del test - Rudy Berton
 *
 */


'use strict';

  describe('AuthenticationData test', function() {

    var autData;
    var mock_autData;

    beforeEach(function() {
      angular.module('RequestsManager');
    });

    beforeEach(inject(function() {
      var $injector = angular.injector(['RequestsManager']);
      autData = $injector.get('AuthenticationData');
      mock_autData = new autData("Paolo", "Rossi", "paolo.rossi@gmail.com", "paolorossi");
    }));
    
    it('test if mock_autData is defined', function(){
      expect(mock_autData).toBeDefined();
      //console.log(mock_autData);
    }); 
    
    it('test method getFirstName()', function(){
		expect(mock_autData.getFirstName()).toBe("Paolo");
	});

	it('test method getLastName()', function(){
		expect(mock_autData.getLastName()).toBe("Rossi");
	});
	
	it('test method getMail()', function(){
		expect(mock_autData.getMail()).toBe("paolo.rossi@gmail.com");
	});
	
	it('test method setPassword()', function(){
        mock_autData.setPassword("paolorossi","rossi12345");
		expect(mock_autData.password).toBe("rossi12345");
		//console.log(mock_autData.password);
	});
	
  });





//JASMINE non funzionante

//~ 'use strict';
//~ 
//~ angular=require('../../../node_modules/angular/angular.min.js');
//~ require('../../../node_modules/angular-mocks/angular-mocks.js');
//~ require('../../../public/core.js');
//~ require('../../../public/services/AuthenticationData.js');
//~ 
//~ 
//~ describe('AuthenticationData test', function(){
	//~ var autData;
    //~ var user;
//~ 
    //~ beforeEach(function() {
      //~ angular.module('RequestsManager');
    //~ });
//~ 
    //~ beforeEach(inject(function() {
      //~ var $injector = angular.injector(['RequestsManager']);
      //~ autData = $injector.get('AuthenticationData');
      //~ user = new autData("Paolo", "Rossi", "paolo.rossi@gmail.com", "paolorossi");
    //~ }));
    //~ 
    //~ it('test if var user is defined', function(){
      //~ expect(user).toBeDefined();
      //~ //console.log(user);
    //~ }); 
    //~ 
    //~ it('test method getFirstName', function(){
		//~ expect(user.getFirstName()).toBe("Paolo");
	//~ });
//~ 
	//~ it('test method getLastName', function(){
		//~ expect(user.getLastName()).toBe("Rossi");
	//~ });
	//~ 
	//~ it('test method getMail', function(){
		//~ expect(user.getMail()).toBe("paolo.rossi@gmail.com");
	//~ });
	//~ 
	//~ it('test method setPassword', function(){
		//~ user.setPassword("paolorossi","rossi12345");
		//~ expect(user.getPassword()).toBe("rossi12345");
	//~ });	
//~ });
