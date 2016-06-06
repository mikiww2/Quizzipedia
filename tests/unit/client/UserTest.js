/*
 * Name: tests/unit/client/UserTest.js
 * Author: Vault-Tech
 * Email: vaulttech.swe@gmail.com
 * Referring to: public/services/User.js
 * Creation date : 11.05.2016
 *
 * ** Diary **
 * 	12.05 2016 Test superato - Rudy Berton
 * 	11.05.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('User test',function(){
    var AuthenticationData;
    var User;
    var mock_user;
    var mock_autData;

    beforeEach(function() {
        angular.module('RequestsManager');
    });

    beforeEach(inject(function() {
        var $injector = angular.injector(['RequestsManager']);
        AuthenticationData=$injector.get('AuthenticationData');
        User=$injector.get('User');
        mock_autData= new AuthenticationData("Gabriele","Bianchi","gabriele.bianchi@gmail.com","gabrielebianchi");
        mock_user=new User("Gabriele","Bianchi","gabriele.bianchi@gmail.com","gabrielebianchi");
    }));


    it('test getAuthenticationData() method',function(){
        expect(mock_user.getAuthenticationData()).toEqual(mock_autData);
        //console.log(mock_user.getAuthenticationData());
    });

    it('test getMail() method', function () {
        expect(mock_user.getMail()).toBe("gabriele.bianchi@gmail.com");
        //console.log(mock_user.getMail());
    });
});
