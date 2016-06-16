/*
 * Nome del file: Quiz.js
 * Percorso: public/services/Quiz.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per i quiz
 *
 * * Diario delle modifiche:
 *
 */

//  MANCANO DIPENDENZE DA TOPIC, CLASS E GENERICQUESTION

angular.module('QuizManager').factory('Quiz', [function () {
    function Quiz() {
        this.author = null; //stringa
        this.creationDate = null; //Data
        this.classes = []; //array di classi
        this.topic = null //Array di stringhe
        this.description = null;
        this.questions = []; //array di GenericQuestions
        this.keywords = []; //array di stringhe
        this.title = null; //String      
        
    };
    
    Quiz.prototype.addTopic = function (topic) {
        this.topics.push(topic);
    };
    
    
    
    
    Quiz.prototype.setDescription = function (newDescr) {
        this.description = newDescr;
    };
    
    Quiz.prototype.setTitle = function(newTitle){
        this.title = newTitle;
    };
    
    
    Quiz.prototype.addKeyword = function (keyword) {
        this.keywords.push(keyword);
    };
    
    Quiz.prototype.addQuestion = function (objectQuestion) {
        if (objectQuestion instanceof GenericQuestion) {
            this.questions.push(question);
        }
    };
    
    Quiz.prototype.removeQuestion = function (indexOfQuestion) {
        if (indexOfQuestion >= 0 && indexOfQuestion<this.questions.length) {
            this.questions.splice(indexOfQuestion, 1);
        }
    };
    
    Quiz.prototype.addClass = function (objectClass) {
        if (objectClass instanceof Class) 
            this.classes.push(objectClass);
    };
    
    Quiz.prototype.removeClass = function(index){
        this.classes.splice(index,1);
    };
    
    
   
    
    return Quiz;    
        
}]);