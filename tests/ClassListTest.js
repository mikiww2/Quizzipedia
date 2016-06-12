/*
 * Nome del file: ClassListTest.js
 * Percorso: tests/ClassListTest.js
 * Autore: Vault-Tech
 * Data creazione: 01.06.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per il componente: public/services/ClassList.js
 *
 * * Diario delle modifiche:
 *  01.06 2016 Test superato - Rudy Berton
 *  01.06.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('ClassList test', function () {
    var RequestClass;
    var rc1, rc2, rc3, rc4;
    var ClassList;
    var mock_classList;

    beforeEach(function() {
        angular.module('RequestsManager');
    });

    beforeEach(inject(function() {
        var $injector = angular.injector(['RequestsManager','InstClassManager']);

        RequestClass=$injector.get('RequestClass');
        rc1= new RequestClass("filippoMagnin@gmail.com","5A Liceo Scientifico G.Dal Piaz", "2015-2016");
        rc2=new RequestClass("giadaCorona@gmail.com","5A Liceo Scientifico G.Dal Piaz", "2015-2016");
        rc3=new RequestClass("elenaBoccato@gmail.com", "5A Liceo Scientifico G.Dal Piaz", "2015-2016");
        rc4=new RequestClass("RudyB@gmail.com", "5A Liceo Scientifico G.Dal Piaz", "2015-2016");

        ClassList= $injector.get('ClassList');
        mock_classList=new ClassList();
    }));

    it('test addClassRequest() method', function () {
        mock_classList.addClassRequest("filippoMagnin@gmail.com","5A Liceo Scientifico G.Dal Piaz", "2015-2016");
        mock_classList.addClassRequest("giadaCorona@gmail.com","5A Liceo Scientifico G.Dal Piaz", "2015-2016");
        mock_classList.addClassRequest("elenaBoccato@gmail.com", "5A Liceo Scientifico G.Dal Piaz", "2015-2016");
        mock_classList.addClassRequest("RudyB@gmail.com", "5A Liceo Scientifico G.Dal Piaz", "2015-2016");

        expect(mock_classList.classRequests).toEqual([rc1,rc2,rc3,rc4]);
       // console.log(mock_classList.classRequests);

    });

    it('test removeClassRequest() method', function () {
        mock_classList.addClassRequest("filippoMagnin@gmail.com","5A Liceo Scientifico G.Dal Piaz", "2015-2016");
        mock_classList.addClassRequest("giadaCorona@gmail.com","5A Liceo Scientifico G.Dal Piaz", "2015-2016");
        mock_classList.addClassRequest("elenaBoccato@gmail.com", "5A Liceo Scientifico G.Dal Piaz", "2015-2016");
        mock_classList.addClassRequest("RudyB@gmail.com", "5A Liceo Scientifico G.Dal Piaz", "2015-2016");
        expect(mock_classList.classRequests).toEqual([rc1,rc2,rc3,rc4]);

        mock_classList.removeClassRequest(2);
        expect(mock_classList.classRequests).toEqual([rc1,rc2,rc4]);
    });

    it('test acceptClassRequest() method', function () {
        mock_classList.addClassRequest("filippoMagnin@gmail.com","5A Liceo Scientifico G.Dal Piaz", "2015-2016");
        mock_classList.addClassRequest("giadaCorona@gmail.com","5A Liceo Scientifico G.Dal Piaz", "2015-2016");
        mock_classList.addClassRequest("elenaBoccato@gmail.com", "5A Liceo Scientifico G.Dal Piaz", "2015-2016");
        mock_classList.addClassRequest("RudyB@gmail.com", "5A Liceo Scientifico G.Dal Piaz", "2015-2016");
        expect(mock_classList.classRequests).toEqual([rc1,rc2,rc3,rc4]);

        mock_classList.acceptClassRequest(1);
        mock_classList.acceptClassRequest(1);
        expect(mock_classList.classRequests).toEqual([rc1,rc4]);
    });

});
