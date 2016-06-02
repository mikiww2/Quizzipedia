/*
 * Name: AuthenticationData.spec.js
 * Author: Vault-Tech
 * Path: tests/unit/client
 * Referring to: public/services/AuthenticationData.js
 * Creation date : 10.05.2016
 * Last modify date: 31.05.2016
 *
 */


'use strict';

  describe('AuthenticationData test', function() {

    var autData;
    var user;

    beforeEach(function() {
      angular.module('RequestsManager');
    });

    beforeEach(inject(function() {
      var $injector = angular.injector(['RequestsManager']);
      autData = $injector.get('AuthenticationData');
      user = new autData("Paolo", "Rossi", "paolo.rossi@gmail.com", "paolorossi");
    }));
    
    it('test if user is defined', function(){
      expect(user).toBeDefined();
      //console.log(user);
    }); 
    
    it('test method getFirstName', function(){
		expect(user.getFirstName()).toBe("Paolo");
	});

	it('test method getLastName', function(){
		expect(user.getLastName()).toBe("Rossi");
	});
	
	it('test method getMail', function(){
		expect(user.getMail()).toBe("paolo.rossi@gmail.com");
	});
	
	it('test method setPassword', function(){
		user.setPassword("paolorossi","rossi12345");
		expect(user.password).toBe("rossi12345");
		//console.log(user.password);
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
