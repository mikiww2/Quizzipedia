angular.module().factory('CompletionQ',['GenericQuestion',function(){
    
    function CompletionQ(){
      
        this.correctAnswer = null; //String[]
        this.text = null; //String
        this.suggestions = []; //String[]
    };
    /* il testo della domanda deve essere un array con questi json dentro 
    {'type': 'txt/id', 'value': 'blocco di testo della domanda se è tipo txt/ id della risposta se tipo id'}

    la risposta è un array con dentro json fatti cosi
    {'text': 'possibile risposta', 'id': 'id che indica il buco dove sarebbe corretta'}

     ti allego un esempio per capirti
       title: 
   [ { type: 'txt', value: 'napoleone è nato nel ' },
     { type: 'id', value: '1' },
     { type: 'txt', value: '. Nel ' },
     { type: 'id', value: '2' },
     { type: 'txt', value: 'è stato esiliato nell\' isola d\'' },
     { type: 'id', value: '3' } ],
  ans: 
   [ { text: '1800', id: '1' },
     { text: '1850', id: '2' },
     { attachment: [Object], id: '3' } ] }

    per il type di question e le altre informazioni rimane tutto uguale come per le altre tipologie di domanda

    */
    
    CompletionQ.prototype.setText = function(newText){
      
        this.text = newText;
    };
    
    CompletionQ.prototype.setCorrectAnswer = function(correctAnswer){
        this.correctAnswer = correctAnswer;
    };
    
    CompletionQ.prototype.setSuggestion = function(suggestions){
      this.suggestions = suggestions;  
    };  
    
    
    CompletionQ.prototype.removeSuggestion = function(index){
      this.suggestions.splice(index,1);  
    };
    
    CompletionQ.prototype.createAnswerQuestion = function(answer){ //answer:String[]
        
    };
    
    CompletionQ.prototype.getSuggestion = function() {
        return this.suggestions;
    };
    
    return CompletionQ;
    
}]);