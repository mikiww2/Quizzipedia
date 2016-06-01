angular.module('CreateQuestion').factory('MultipleChoiceQ',['GenericQuestion',function(){
    
    function MultipleChoiceQ(){
        
        this.answers = []; //String
        this.answerAttachment = []; //String
        this.correctAnswer = []; //bool

        /* sarebbe molto meglio un array singolo di json con questa forma:
        {'risposta': 'blabla', 'isTrue': 'true/false', 'attachment': json}

        il json degli allegati è uguale per risposte e domande ed è fatto cosi:
        {'type': 'img/aud/vid', 'path': '/dff/asd.jpg', 'x': '230', 'y': '70'}

        è il formato che io uso e se lo cambiate dimmelo perche mi tocca modificare tutto
        */
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