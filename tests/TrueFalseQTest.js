/*
 * Nome del file: TrueFalseQTest.js
 * Percorso: tests/TrueFalseQTest.js
 * Autore: Vault-Tech
 * Data creazione: 07.06.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per il componente: public/services/TrueFalseQ.js
 *
 * * Diario delle modifiche:
 *  07.06.2016 Test superato - Rudy Berton
 *  07.06.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';
describe('Director test', function() {
    var GenericQuestion;
    var TFQ;
    var mock_gq;
    var mock_TFQ;

    beforeEach(function () {
        angular.module('CreateQuestion');
    });

    beforeEach(inject(function () {
        var $injector = angular.injector(['CreateQuestion']);
        GenericQuestion = $injector.get('GenericQuestion');
        mock_gq = new GenericQuestion();
        mock_gq.setAuthor("paoloRossi@gmail.com");
        mock_gq.setTitle("Rosso+Giallo forma Arancione?");
        mock_gq.setDescription("Domanda riguardante i colori");
        mock_gq.setTopic("Colori");
        mock_gq.setDifficulty(2);
        mock_gq.setQuestionAttachment("nessun allegato");
        mock_gq.setKeyword(["colori","arancione", "giallo", "rosso"]);

        TFQ = $injector.get('TrueFalseQ');
        mock_TFQ = new TFQ();
    }));

    it('test setAuthor() method', function(){
        mock_TFQ.setAuthor("paoloRossi@gmail.com");
        expect(mock_TFQ.author).toEqual(mock_gq.author);
    });

    it('test setTitle() method', function () {
        mock_TFQ.setTitle("Rosso+Giallo forma Arancione?");
        expect(mock_TFQ.title).toEqual(mock_gq.title);
    });

    it('test setDescription() method', function () {
        mock_TFQ.setDescription("Domanda riguardante i colori");
        expect(mock_TFQ.description).toEqual(mock_gq.description);
    });

    it('test setTopic() method', function () {
        mock_TFQ.setTopic("Colori");
        expect(mock_TFQ.topic).toEqual(mock_gq.topic);
    });

    it('test setDifficulty() method', function () {
        mock_TFQ.setDifficulty(2);
        expect(mock_TFQ.difficulty).toEqual(mock_gq.difficulty);
    });

    it('test setQuestionAttachment() method', function() {
        mock_TFQ.setQuestionAttachment("nessun allegato");
        expect(mock_TFQ.questionAttachement).toEqual(mock_gq.questionAttachement);
    });

    it('test setKeyword() method', function () {
        var arrayKey=["colori","arancione", "giallo", "rosso"];
        mock_TFQ.setKeyword(arrayKey);
        expect(mock_TFQ.keywords).toEqual(mock_gq.keywords);
    });

    it('test setCorrectAnswer() method', function () {
        mock_TFQ.setCorrectAnswer(false);
        expect(mock_TFQ.correctAnswer).toBe(false);
    });
});
