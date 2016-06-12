/*
 * Nome del file: DirectorTest.js
 * Percorso: tests/DirectorTest.js
 * Autore: Vault-Tech
 * Data creazione: 18.05.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per il componente: public/services/Director.js
 *
 * * Diario delle modifiche:
 *  19.05 2016 Test superato - Rudy Berton
 *  18.05.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';
describe('Director test', function(){
    var User;
    var Director;
    var mock_user;
    var mock_director;

    beforeEach(function() {
        angular.module('RequestsManager');
    });

    beforeEach(inject(function() {
        var $injector = angular.injector(['RequestsManager']);
        User=$injector.get('User');
        Director=$injector.get('Director');
        //mock_user=new User("Antonio","Caovilla","antonio.Caovilla@gmail.com","antocaovilla");
        mock_director=new Director("Antonio","Caovilla","antonio.Caovilla@gmail.com","antocaovilla");
    }));

    it('test getAuthenticationData() method',function(){
        expect(mock_director.getAuthenticationData()).toEqual(mock_director.authenticationData);
        //console.log(mock_director.getAuthenticationData());
    });


    it('test getMail() method', function () {
        expect(mock_director.getMail()).toBe("antonio.Caovilla@gmail.com");
        //console.log(mock_director.getMail());
    });


});
