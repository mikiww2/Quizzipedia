/*
 * Name: tests/unit/client/TopicsTest.js
 * Author: Vault-Tech
 * Email: vaulttech.swe@gmail.com
 * Referring to: public/services/Topics.js
 * Creation date : 03.06.2016
 *
 * ** Diary **
 * 	03.06.2016 Test superato - Rudy Berton
 * 	03.06.2016 Creazione del test - Rudy Berton
 *
 */

'use strict';

describe('Topics test', function() {

    var Topics;
    var mock_topic;

    beforeEach(function () {
        angular.module('TopicsManager');
    });

    beforeEach(inject(function () {
        var $injector = angular.injector(['TopicsManager']);
        Topics = $injector.get('Topics');
        mock_topic = new Topics();
    }));

    it('test addTopic() method', function () {
        mock_topic.addTopic("Matematica");
        mock_topic.addTopic("Storia");
        mock_topic.addTopic("Filosofia");
        expect(mock_topic.topics).toEqual(["Matematica","Storia","Filosofia"]);
    });

    it('test removeTopic() method', function () {
        mock_topic.addTopic("Matematica");
        mock_topic.addTopic("Storia");
        mock_topic.addTopic("Filosofia");
        expect(mock_topic.topics).toEqual(["Matematica","Storia","Filosofia"]);

        mock_topic.removeTopic(0);
        expect(mock_topic.topics).toEqual(["Storia","Filosofia"]);

    });

});