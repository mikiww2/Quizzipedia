/*
 * Nome del file: MatchingQ.js
 * Percorso: public/services/MatchingQ.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo collegamenti
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').factory('MatchingQ',['GenericQuestion','AnswerMatchingElement',function(GenericQuestion,AnswerMatchingElement){
    
	/*
	il testo deve essere un array con questi json dentro
	{'text': 'testo del collegamento', 'id': 'id per collegarlo alla riposta giusta'}

	la risposta deve essere un array con questi json dentro
	{'text': 'testo della risposta da collegare', 'id': 'id per collegarla alla domanda giusta'}
	
	per gli allegati dimmi te, in teoria possono esserci sia nella domanda che risposta
	*/

    
    function MatchingQ(){
        GenericQuestion.call(this);
        this.text = [];
        this.answer = [];
    };
    
    MatchingQ.prototype = GenericQuestion.prototype;
    
    MatchingQ.prototype.getSizeText = function(){
      return this.text.length;  
    };
    
    MatchingQ.prototype.getSizeAnswer = function(){
      return this.answer.length;  
    };
    
    
    MatchingQ.prototype.insertTextIntoText = function(id,txt){
        
        var element = new AnswerMatchingElement();
        element.setId(id);
        element.setTxt(txt);
        
        this.text.push(element);
        
    };
    
    MatchingQ.prototype.insertTextIntoAnswer = function(id,txt){
        
        var element = new AnswerMatchingElement();
        element.setId(id);
        element.setTxt(txt);
        
        this.answer.push(element);
        
    };
    
    
    
    MatchingQ.prototype.insertAttachmentIntoText = function(id){
        var element = new AnswerMatchingElement();
        element.id = id;
        
        element.setEmptyAttachment();
        this.text.push(element);
            
    };
    
    MatchingQ.prototype.insertAttachmentIntoAnswer = function(id){
        var element = new AnswerMatchingElement();
        element.setId(id);
        element.setEmptyAttachment();
        
        this.answer.push(element);
    };
    
    MatchingQ.prototype.removeText = function(index){
        this.text.splice(index,1);
    };
    
    MatchingQ.prototype.removeAnswer = function(index){
        this.answer.splice(index,1);
    };
    
    
    
    
    return MatchingQ;
    
}]);