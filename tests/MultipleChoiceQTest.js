/*
 * Nome del file: MultipleChoiceQTest.js
 * Percorso: tests/MultipleChoiceQTest.js
 * Autore: Vault-Tech
 * Data creazione: 07.06.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Test per la componente: public/services/MultipleChoiceQTest.js
 *
 * * Diario delle modifiche:
 *  07.06.2016 Test superato - Rudy Berton
 *  07.06.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('MultipleChoiceQ test', function () {
    var GenericQuestion;
    var mock_gq;
    var Attachment;
    var mock_att;
    var AnswerMultipleChoice;
    var amc1, amc2, amc3;
    var MultipleChoiceQ;
    var mock_MCQ;

    beforeEach(function() {
        angular.module('CreateQuestion');
    });

    beforeEach(inject(function() {
        var $injector = angular.injector(['CreateQuestion']);

        GenericQuestion = $injector.get('GenericQuestion','AnswerMultipleChoice');
        mock_gq = new GenericQuestion();

        Attachment=$injector.get('Attachment');
        mock_att=new Attachment();
        mock_att.setType("immagine");
        mock_att.setPath("/img/TFquestions/pippo.png");
        mock_att.setX(3.17);
        mock_att.setY(4.44);

        AnswerMultipleChoice=$injector.get('AnswerMultipleChoice');
        amc1=new AnswerMultipleChoice();
        amc1.setEmptyAttachment();
        amc1.setAttachmentType("audio");
        amc1.setAttachmentPath("/aud/TFquestions/pluto.mp3");
        amc1.setAttachmentCoordinateX(3.17);
        amc1.setAttachmentCoordinateY(2.10);

        amc2=new AnswerMultipleChoice();

        amc3=new AnswerMultipleChoice();
        amc3.setEmptyAttachment();
        amc3.setAttachmentType("video");
        amc3.setAttachmentPath("/vid/TFquestions/paperino.avi");
        amc3.setAttachmentCoordinateX(5.90);
        amc3.setAttachmentCoordinateY(2.65);

        MultipleChoiceQ=$injector.get('MultipleChoiceQ');
        mock_MCQ=new MultipleChoiceQ();

    }));

    it('test setAuthor() method', function(){
        mock_MCQ.setAuthor("paoloRossi@gmail.com");
        expect(mock_MCQ.author).toBe("paoloRossi@gmail.com");
    });

    it('test setTitle() method', function () {
        mock_MCQ.setTitle("Rosso+Giallo forma Arancione?");
        expect(mock_MCQ.title).toBe("Rosso+Giallo forma Arancione?");
    });

    it('test setDescription() method', function () {
        mock_MCQ.setDescription("Domanda riguardante i colori");
        expect(mock_MCQ.description).toBe("Domanda riguardante i colori");
    });

    it('test setTopic() method', function () {
        mock_MCQ.setTopic("Colori");
        expect(mock_MCQ.topic).toBe("Colori");
    });

    it('test setDifficulty() method', function () {
        mock_MCQ.setDifficulty(2);
        expect(mock_MCQ.difficulty).toBe(2);
    });

    it('test setQuestionAttachment() method', function() {
        mock_MCQ.setQuestionAttachment(mock_att);
        expect(mock_MCQ.questionAttachement).toBe(mock_att);
    });

    it('test setKeyword() method', function () {
        var arrayKey=["colori","arancione", "giallo", "rosso"];
        mock_MCQ.setKeyword(arrayKey);
        expect(mock_MCQ.keywords).toEqual(arrayKey);
    });

    it('test addAnswer() method', function () {
        mock_MCQ.addAnswer(amc1);
        mock_MCQ.addAnswer(amc2);
        mock_MCQ.addAnswer(amc3);
        expect(mock_MCQ.arrayAnswer).toEqual([amc1,amc2, amc3]);
    });

    it('test setEmptyAttachment() method', function () {
        mock_MCQ.addAnswer(amc1);
        mock_MCQ.addAnswer(amc2);
        mock_MCQ.addAnswer(amc3);
        mock_MCQ.setEmptyAttachment(1);
        expect(mock_MCQ.arrayAnswer[1]).not.toBeNull();
    });

    it('test getSize() method', function(){
        mock_MCQ.addAnswer(amc1);
        mock_MCQ.addAnswer(amc2);
        mock_MCQ.addAnswer(amc3);
        expect(mock_MCQ.getSize()).toBe(3);
    });

    it('test removeAnswer() method', function () {
        mock_MCQ.addAnswer(amc1);
        mock_MCQ.addAnswer(amc2);
        mock_MCQ.addAnswer(amc3);
        mock_MCQ.removeAnswer(1);
        expect(mock_MCQ.arrayAnswer).toEqual([amc1, amc3]);
    });

    it('test getArrayAnswer() method', function () {
        mock_MCQ.addAnswer(amc1);
        mock_MCQ.addAnswer(amc2);
        mock_MCQ.addAnswer(amc3);
        expect(mock_MCQ.getArrayAnswer()).toEqual([amc1,amc2, amc3]);
    });

    it('test setNameAttachment() method', function () {
        mock_MCQ.addAnswer(amc1);
        mock_MCQ.addAnswer(amc2);
        mock_MCQ.addAnswer(amc3);
        mock_MCQ.setEmptyAttachment(1);
        mock_MCQ.setNameAttachment(1,"/img/TFquestions/minnie.png");
        expect(mock_MCQ.arrayAnswer[1].attachment.path).toBe("/img/TFquestions/minnie.png");
    });

    it('test setTypeAttachment() method', function () {
        mock_MCQ.addAnswer(amc1);
        mock_MCQ.addAnswer(amc2);
        mock_MCQ.addAnswer(amc3);
        mock_MCQ.setEmptyAttachment(1);
        mock_MCQ.setTypeAttachment(1,"immagine");
        expect(mock_MCQ.arrayAnswer[1].attachment.type).toBe("immagine");

    });


});