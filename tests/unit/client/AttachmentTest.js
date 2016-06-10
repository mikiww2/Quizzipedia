/*
 * Name: tests/unit/client/AttachmentTest.js
 * Author: Vault-Tech
 * Email: vaulttech.swe@gmail.com
 * Referring to: public/services/Attachment.js
 * Creation date : 08.05.2016
 *
 * ** Diary **
 * 	08.05.2016 Test superato - Rudy Berton
 * 	08.05.2016 Modifica del test - Rudy Berton
 * 	07.05.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('Attachment test', function() {

    var att;
    var mock_att;

    beforeEach(function () {
        angular.module('CreateQuestion');
    });

    beforeEach(inject(function () {
        var $injector = angular.injector(['CreateQuestion']);
        att = $injector.get('Attachment');
        mock_att = new att();
    }));

    it('test getType() method', function () {
        expect(mock_att.getType()).toBeNull();
    });

    it('test getPath() method', function () {
        expect(mock_att.getPath()).toBe("");
    });

    it('test getX() method', function () {
        expect(mock_att.getX()).toBeNull();
    });

    it('test getY() method', function () {
        expect(mock_att.getY()).toBeNull();
    });

    it('test setType() method', function(){
        mock_att.setType("audio");
        expect(mock_att.type).toBe("audio");
    });

    it('test setPath() method', function(){
        mock_att.setPath("/img/TFquestions/pluto.png");
        expect(mock_att.path).toBe("/img/TFquestions/pluto.png");
    });

    it('test setX() method', function () {
        mock_att.setX(3.17);
        expect(mock_att.x).toBe(3.17);
    });

    it('test setY() method', function () {
        mock_att.setY(4.44);
        expect(mock_att.y).toBe(4.44);
    });
});