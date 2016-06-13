/*
 * Nome del file: GenericQuestionTest.js
 * Percorso: tests/GenericQuestionTest.js
 * Autore: Vault-Tech
 * Data creazione: 06.06.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per il componente: public/services/GenericQuestion.js
 *
 * * Diario delle modifiche:
 *  06.06.2016 Test superato - Rudy Berton
 *  06.06.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('GenericQuestion test', function () {
    var GenericQuestion;
    var mock_gq;
    var Attachment;
    var mock_att;

    beforeEach(function() {
        angular.module('CreateQuestion');
    });

    beforeEach(inject(function() {
        var $injector = angular.injector(['CreateQuestion']);
        Attachment=$injector.get('Attachment');
        mock_att=new Attachment();
        mock_att.setType("immagine");
        mock_att.setPath("/img/TFquestions/pluto.png");
        mock_att.setX(3.17);
        mock_att.setY(4.44);

        GenericQuestion = $injector.get('GenericQuestion');
        mock_gq = new GenericQuestion();
    }));

    it('test setAuthor() method', function(){
        mock_gq.setAuthor("paoloRossi@gmail.com");
        expect(mock_gq.author).toBe("paoloRossi@gmail.com");
    });

    it('test setTitle() method', function () {
        mock_gq.setTitle("Rosso+Giallo forma Arancione?");
        expect(mock_gq.title).toBe("Rosso+Giallo forma Arancione?");
    });

    it('test setDescription() method', function () {
        mock_gq.setDescription("Domanda riguardante i colori");
        expect(mock_gq.description).toBe("Domanda riguardante i colori");
    });

    it('test setTopic() method', function () {
        mock_gq.setTopic("Colori");
        expect(mock_gq.topic).toBe("Colori");
    });

    it('test setDifficulty() method', function () {
        mock_gq.setDifficulty(2);
        expect(mock_gq.difficulty).toBe(2);
    });

    it('test setQuestionAttachment() method', function() {
        mock_gq.setQuestionAttachment(mock_att);
        expect(mock_gq.questionAttachement).toBe(mock_att);
    });

    it('test setKeyword() method', function () {
        var arrayKey=["colori","arancione", "giallo", "rosso"];
        mock_gq.setKeyword(arrayKey);
        expect(mock_gq.keywords).toEqual(arrayKey);
    });

});
