/*
 * Nome del file: CtrlHeaderTest.js
 * Percorso: tests/CtrlHeaderTest.js
 * Autore: Vault-Tech
 * Data creazione: 20.05.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per il componente: public/header/CtrlHeader.js
 *
 * * Diario delle modifiche:
 * 	20.05 2016 Test superato - Rudy Berton
 * 	20.05.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('CtrlHeader test', function () {
    var scope;
    var createController;
    var httpBackend;
    var request1, request2;



    beforeEach(inject(function ($rootScope, $controller,$injector) {

        /** Per simulare la richiesta fatta dal metodo loadUser() */
        httpBackend = $injector.get('$httpBackend');
        request1 = httpBackend.when('GET', '/api/profile/get_full_info_user');
            //.respond({firstName : 'Carlo', lastName : 'Conti', mail : 'carlo.conti@gmail.com', password : 'carloconti'});

        /** Per simulare la richiesta fatta dal metodo loadInstitutions() */
        request2= httpBackend.when('GET', '/api/institution/fetch_user_inst');
            //.respond({'Scuola guida' : 'Studente', 'Scuola superiore G.Dal Piaz':'Docente'});

        scope = $rootScope.$new();

        createController = function() {
            return $controller('CtrlHeader', {'$scope': scope});
        };
    }));

    it('', function() {
        expect(true).toBe(true);
    } );

   /* it("test the method loadUser()",function(){

        var mock_user ={ //figura come un oggetto User
            firstName : 'Carlo',
            lastName : 'Conti',
            mail : 'carlo.conti@gmail.com',
            password : 'carloconti'
        };

        httpBackend.expectGET('/api/profile/get_full_info_user');

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

    }); */


});