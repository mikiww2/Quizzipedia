angular.module('CreateQuestion').factory('MultipleChoiceQ',['GenericQuestion',function(){
    
    function MultipleChoiceQ(){
        
        this.answers = []; //String
        this.answerAttachment = []; //String
        this.correctAnswer = []; //bool
        
    };
    
    
    MultipleChoiceQ.prototype.getAttachment = function(){
        return this.answerAttachment;
    };
    
    MultipleChoiceQ.prototype.setAttachment = function(position,attachment){
        this.answerAttachment.splice(position,1,attachment);
        //elimino l'elemento in posizione position e subito dopo aggiungo il nuovo elmento
    };
    
    MultipleChoiceQ.prototype.setAnswer = function(position,answer){
        this.answers.splice(position,1,answer);
    };
    
    MultipleChoiceQ.prototype.createAnswerQuestion = function(answer){ //answer:bool[]
        
    };
    
    MultipleChoiceQ.prototype.setCorrectAnswer = function(correctAnswer){//bool[]
        this.correctAnswer = correctAnswer;
    };
    
    return MultipleChoiceQ;
    
    
}]);