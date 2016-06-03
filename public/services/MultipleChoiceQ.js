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
    
    
    
    MultipleChoiceQ.prototype.removeAnswer = function(position){
        this.arrayAnswer.splice(position,1);
    };
    
    MultipleChoiceQ.prototype.getArrayAnswer = function(){
        return this.arrayAnswer;  
    };
    
    
    
    return MultipleChoiceQ;
    
    
}]);