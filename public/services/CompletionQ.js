angular.module().factory('CompletionQ',['GenericQuestion',function(){
    
    function CompletionQ(){
      
        this.correctAnswer = null; //String[]
        this.text = null; //String
        this.suggestions = []; //String[]
    };
    
    
    
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