/*
 * Nome del file: MultipleChoiceQ.js
 * Percorso: public/services/MultipleChoiceQ.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo risposta multipla
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').factory('MultipleChoiceQ',['GenericQuestion','AnswerMultipleChoice',function(GenericQuestion,AnswerMultipleChoice){
    
    
    /* sarebbe molto meglio un array singolo di json con questa forma:
        {'risposta': 'blabla', 'isTrue': 'true/false', 'attachment': json}

        il json degli allegati è uguale per risposte e domande ed è fatto cosi:
        {'type': 'img/aud/vid', 'path': '/dff/asd.jpg', 'x': '230', 'y': '70'}

        è il formato che io uso e se lo cambiate dimmelo perche mi tocca modificare tutto
        */
    
    
    function MultipleChoiceQ(){
        
        GenericQuestion.call(this); //Chiamo il costruttore del padre
        this.arrayAnswer = []; //arrayAnswer: AnswerMultipleChoice --> memorizzo tutte le risposte

        
    };
    
    MultipleChoiceQ.prototype = GenericQuestion.prototype;
    
    MultipleChoiceQ.prototype.addAnswer = function(answer){ //answer: AnswerMultipleChoice
      this.arrayAnswer.push(answer);
    };
    
    MultipleChoiceQ.prototype.setEmptyAttachment = function(index){
        this.arrayAnswer[index].setEmptyAttachment();
    };
    
    MultipleChoiceQ.prototype.getSize = function(){
      return this.arrayAnswer.length;  
    };
    
    
    MultipleChoiceQ.prototype.removeAnsw = function(position){
        this.arrayAnswer.splice(position,1);
       
    };
    
    MultipleChoiceQ.prototype.getArrayAnswer = function(){
        return this.arrayAnswer;  
    };
    
    MultipleChoiceQ.prototype.setNameAttachment = function(index,name){
        this.arrayAnswer[index].setAttachmentPath(name);
        
    };
    
    MultipleChoiceQ.prototype.setTypeAttachment = function(index,type){
      this.arrayAnswer[index].setAttachmentType(type);  
    };
    
    
    return MultipleChoiceQ;
    
    
}]);