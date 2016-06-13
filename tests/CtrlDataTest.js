/*
 * Nome del file: CtrlDataTest.js
 * Percorso: tests/CtrlDataTest.js
 * Autore: Vault-Tech
 * Data creazione: 25.05.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per il componente: public/authentic/CtrlData.js
 *
 * * Diario delle modifiche:
 * 	25.05 2016 Test superato - Rudy Berton
 * 	25.05.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('CtrlData test', function () {

    var scope;
    var createController;
    var httpBackend;
    var $window;

    beforeEach(function () {
        module('Registration');
    });


    beforeEach(inject(function ($rootScope, $controller,$injector) {

        /** Per simulare la richiesta fatta dal metodo sendRegistration() */
        httpBackend = $injector.get('$httpBackend');

        httpBackend.when('POST', '/api/auth/signup').respond(200, '');
        scope = $rootScope.$new();

        var fakeWindow = {
            location: {
                href: '/Quizzipedia/signin'}
        };

        createController = function() {
            return $controller('CtrlData', {'$scope': scope, $window: fakeWindow});
        };
    }));

    it('test checkMail() method', function () {
        var controller = createController();
        scope.user.email="paolobrosio@gmail.com";
        scope.user.cemail="paolobrosio@gmail.com";
        expect(scope.user.checkMail()).toBe(true);
    });

    it('test checkPassword() method', function () {
        var controller= createController();
        scope.user.password= "12345678";
        scope.user.cpassword="12345678";
        expect(scope.user.checkPassword()).toBe(true);
    });

    it('test sendRegistration() method fail 1', function () {
        var controller = createController();

        //CheckMail fallisce -> invia un Alert
        scope.user.email="paolobrosio";
        scope.user.cemail="paolobrosio@gmail.com";
        //scope.user.sendRegistration(); //stampa correttamente l'alert
    });

    it('test sendRegistration() method fail 2', function () {
        var controller= createController();

        //CheckMail ha successo, CheckPassword fallisce -> invia Alert
        scope.user.email="paolobrosio@gmail.com";
        scope.user.cemail="paolobrosio@gmail.com";
        scope.user.password= "1234";
        scope.user.cpassword="12345678";
        //scope.user.sendRegistration(); //stampa correttamente l'alert
    });

    it('test sendRegistration() method success', function () {
        httpBackend.expectPOST('/api/auth/signup');

        var controller= createController();
        scope.user.email="paolobrosio@gmail.com";
        scope.user.cemail="paolobrosio@gmail.com";
        scope.user.password= "12345678";
        scope.user.cpassword="12345678";
        scope.user.sendRegistration();
        httpBackend.flush();
    });

});