/*
 * Name: tests/unit/client/RequestClassTest.js
 * Author: Vault-Tech
 * Email: vaulttech.swe@gmail.com
 * Referring to: public/services/RequestClass.js
 * Creation date : 26.05.2016
 *
 * ** Diary **
 * 	26.05 2016 Test superato - Rudy Berton
 * 	26.05.2016 Creazione del test - Rudy Berton
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
        Classs=$injector.get('Class');
        RequestClass=$injector.get('RequestClass');
        mock_class= new Classs();
        mock_class.edit("Classe composta da 21 studenti della scuola statate G.Dal Piaz","5A Scientifico","2015");
        mock_class.addTeacher("vania.strada@gmail.com");
        mock_class.addTeacher("Salvatore_Passaro@hotmail.it");
        mock_class.addTeacher("AnnaTurra@gmail.com");
        mock_class.addStudent("marco.rubin@gmail.com");
        mock_class.addStudent("fabioPavanello@gmail.com");
        mock_class.addStudent("elena.DeSalvador@gmail.com");
        mock_class.addStudent("SilviaTonin@gmail.com");
        //console.log(mock_class);

        mock_requestClass= new RequestClass("filippoMagnin@gmail.com",mock_class);

    }));
    
    it('verify if mock_requestClass is defined', function () {
        expect(mock_requestClass).toBeDefined();
        //console.log(mock_requestClass);
    });

    it('test getMail() method', function () {
        expect(mock_requestClass.getMail()).toBe("filippoMagnin@gmail.com");
    });

    it('test getNameClass() method', function () {
       expect(mock_requestClass.getNameClass()).toEqual(mock_class);
    });


});