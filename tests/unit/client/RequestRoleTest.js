/*
 * Name: tests/unit/client/RequestRoleTest.js
 * Author: Vault-Tech
 * Email: vaulttech.swe@gmail.com
 * Referring to: public/services/RequestRole.js
 * Creation date : 29.05.2016
 *
 * ** Diary **
 * 	30.05 2016 Test superato - Rudy Berton
 * 	29.05.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('RequestRole test', function () {
    var requestRole;
    var mock_reqRole;

    beforeEach(function() {
        angular.module('RequestsManager');
    });

    beforeEach(inject(function() {
        var $injector = angular.injector(['RequestsManager']);
        requestRole = $injector.get('RequestRole');
        mock_reqRole = new requestRole("paolo.rossi@gmail.com","Scuola Guida Lunardon", "Salve, vorrei iscrivermi alle lezioni di scuola guida per poi sostenere l'esame della patente");
    }));

    it('test getMail() method', function () {
        expect(mock_reqRole.getMail()).toBe("paolo.rossi@gmail.com");
    });

    it('test getNameInstitution() method', function(){
        expect(mock_reqRole.getNameInstitution()).toBe("Scuola Guida Lunardon");
    });

    it('test getMessage()', function () {
        expect(mock_reqRole.getMessage()).toBe("Salve, vorrei iscrivermi alle lezioni di scuola guida per poi sostenere l'esame della patente");
    })
});