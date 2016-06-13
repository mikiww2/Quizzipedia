/*
 * Nome del file: ShortAnswerQTest.js
 * Percorso: tests/ShortAnswerQTest.js
 * Autore: Vault-Tech
 * Data creazione: 06.06.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per il componente: public/services/ShortAnswerQ.js
 *
 * * Diario delle modifiche:
 *  07.06.2016 Test superato - Rudy Berton
 *  06.06.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('GenericQuestion test', function () {
    var GenericQuestion;
    var SAQ;
    var mock_gq;
    var mock_SAQ;

    beforeEach(function () {
        angular.module('CreateQuestion');
    });

    beforeEach(inject(function () {
        var $injector = angular.injector(['CreateQuestion']);
        GenericQuestion = $injector.get('GenericQuestion');
        mock_gq = new GenericQuestion();
        mock_gq.setAuthor("paoloRossi@gmail.com");
        mock_gq.setTitle("Rosso+Giallo forma");
        mock_gq.setDescription("Domanda riguardante i colori");
        mock_gq.setTopic("Colori");
        mock_gq.setDifficulty(2);
        mock_gq.setQuestionAttachment("nessun allegato");
        mock_gq.setKeyword(["colori","arancione", "giallo", "rosso"]);

        SAQ = $injector.get('ShortAnswerQ');
        mock_SAQ = new SAQ();
    }));

    it('test setAuthor() method', function(){
        mock_SAQ.setAuthor("paoloRossi@gmail.com");
        expect(mock_SAQ.author).toEqual(mock_gq.author);
    });

    it('test setTitle() method', function () {
        mock_SAQ.setTitle("Rosso+Giallo forma");
        expect(mock_SAQ.title).toEqual(mock_gq.title);
    });

    it('test setDescription() method', function () {
        mock_SAQ.setDescription("Domanda riguardante i colori");
        expect(mock_SAQ.description).toEqual(mock_gq.description);
    });

    it('test setTopic() method', function () {
        mock_SAQ.setTopic("Colori");
        expect(mock_SAQ.topic).toEqual(mock_gq.topic);
    });

    it('test setDifficulty() method', function () {
        mock_SAQ.setDifficulty(2);
        expect(mock_SAQ.difficulty).toEqual(mock_gq.difficulty);
    });

    it('test setQuestionAttachment() method', function() {
        mock_SAQ.setQuestionAttachment("nessun allegato");
        expect(mock_SAQ.questionAttachement).toEqual(mock_gq.questionAttachement);
    });

    it('test setKeyword() method', function () {
        var arrayKey=["colori","arancione", "giallo", "rosso"];
        mock_SAQ.setKeyword(arrayKey);
        expect(mock_SAQ.keywords).toEqual(mock_gq.keywords);
    });

    it('test setCorrectAnswer() method', function () {
        mock_SAQ.setCorrectAnswer("Arancione");
        expect(mock_SAQ.correctAnswer).toBe("Arancione");
    });
});
