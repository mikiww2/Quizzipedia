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
    
    
    MatchingQ.prototype.insertText = function(id,txt){
        
        var element = new AnswerMatchingElement();
        element.setId(id);
        element.setTxt(txt);
        
        this.text.push(element);
    };
    
    MatchingQ.prototype.insertAttachment = function(id,attachment,type){
        var element = new AnswerMatchingElement();
        element.setId(id);
        element.setEmptyAttachment();
        element.attachment.setPath(attachment);
        element.attachment.setType(type);
        
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