/*
 * Nome del file: AnswerMultipleChoiceTest.js
 * Percorso: tests/AnswerMultipleChoiceTest.js
 * Autore: Vault-Tech
 * Data creazione: 06.06.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per la componente: public/services/AnswerMultipleChoiceTest.js
 *
 * * Diario delle modifiche:
 *  07.06.2016 Test superato - Rudy Berton
 *  06.06.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('AnswerMultipleChoice test', function () {
    var Attachment;
    var mock_att;
    var AMC;
    var mock_AMC;

    beforeEach(function() {
        angular.module('CreateQuestion');
    });

    beforeEach(inject(function() {
        var $injector = angular.injector(['CreateQuestion']);
        Attachment= $injector.get('Attachment');
        mock_att=new Attachment();
        mock_att.setType("audio");
        mock_att.setPath("/aud/TFquestions/pluto.mp3");
        mock_att.setX(3.17);
        mock_att.setY(4.44);

        AMC=$injector.get('AnswerMultipleChoice');
        mock_AMC= new AMC();
    }));

    it('test getTextAnswer() method', function () {
        expect(mock_AMC.getTextAnswer()).toBeNull();
    });

    it('test isTrue() method', function () {
        expect(mock_AMC.getIsTrue()).toBe(false);
    });

    it('test getAttachment() method', function() {
        expect(mock_AMC.getAttachment()).toBeNull();
    });

    it('test setEmptyAttachment() method', function(){
        mock_AMC.setEmptyAttachment();
        expect(mock_AMC.attachment).not.toBeNull();
    });

    it('test setAttachmentType() method', function () {
        mock_AMC.setEmptyAttachment();
        mock_AMC.setAttachmentType("audio");
        expect(mock_AMC.attachment.type).toEqual(mock_att.type);
    });

    it('test setAttachmentPath() method', function () {
        mock_AMC.setEmptyAttachment();
        mock_AMC.setAttachmentPath("/aud/TFquestions/pluto.mp3");
        expect(mock_AMC.attachment.path).toEqual(mock_att.path);
    });

    it('test setAttachmentCoordinateX() method', function () {
        mock_AMC.setEmptyAttachment();
        mock_AMC.setAttachmentCoordinateX(3.17);
        expect(mock_AMC.attachment.x).toEqual(mock_att.x);
    });

    it('test setAttachmentCoordinateY()method', function(){
        mock_AMC.setEmptyAttachment();
        mock_AMC.setAttachmentCoordinateY(4.44);
        expect(mock_AMC.attachment.y).toEqual(mock_att.y);
    });


});