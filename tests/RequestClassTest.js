/*
 * Nome del file: RequestClassTest.js
 * Percorso: tests/RequestClassTest.js
 * Autore: Vault-Tech
 * Data creazione: 26.05.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per il componente: public/services/RequestClass.js
 *
 * * Diario delle modifiche:
 *  26.05 2016 Test superato - Rudy Berton
 *  26.05.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('RequestClass test', function () {
    var Classs;
    var RequestClass;
    var mock_class;
    var mock_requestClass;

    beforeEach(function() {
        angular.module('RequestsManager');
    });

    beforeEach(inject(function() {
        var $injector = angular.injector(['RequestsManager','InstClassManager']);
        RequestClass=$injector.get('RequestClass');
        mock_requestClass= new RequestClass("filippoMagnin@gmail.com","Classe 5A Liceo Scientifico G. Dal Piaz", "2015-2016");

    }));
    
    it('verify if mock_requestClass is defined', function () {
        expect(mock_requestClass).toBeDefined();
        //console.log(mock_requestClass);
    });

    it('test getMail() method', function () {
        expect(mock_requestClass.getMail()).toBe("filippoMagnin@gmail.com");
    });

    it('test getNameClass() method', function () {
       expect(mock_requestClass.getNameClass()).toEqual("Classe 5A Liceo Scientifico G. Dal Piaz");
    });

    it('test getYear() method', function () {
        expect(mock_requestClass.getYear()).toBe("2015-2016");
    });


});
