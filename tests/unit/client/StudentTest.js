/*
 * Name: tests/unit/client/StudentTest.js
 * Author: Vault-Tech
 * Email: vaulttech.swe@gmail.com
 * Referring to: public/services/User.js
 * Creation date : 13.05.2016
 *
 * ** Diary **
 * 	13.05 2016 Test superato - Rudy Berton
 * 	13.05.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('Student test', function() {
    var Student;
    var mock_student;

    beforeEach(function() {
        angular.module('RequestsManager');
    });

    beforeEach(inject(function() {
        var $injector = angular.injector(['RequestsManager']);
        Student=$injector.get('Student');
        mock_student=new Student("Silvia","Tonin","SilviaT@gmail.com","ToninSilvia");
    }));

    it('test getAuthenticationData() method', function () {
        expect(mock_student.getAuthenticationData()).toEqual(mock_student.authenticationData);
        //console.log(mock_student.getAuthenticationData());
    });

    it('test getMail() method', function (){
        expect(mock_student.getMail()).toBe("SilviaT@gmail.com");
        //console.log(mock_student.getMail());
    });

  /*  it('test addQuizToProfile() and removeQuizFromProfile() methods', function () {
        ???????????
    });
    */

});