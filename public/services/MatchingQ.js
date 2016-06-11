angular.module().factory('MatchingQ',['Column',function(){
    
	/*
	il testo deve essere un array con questi json dentro
	{'text': 'testo del collegamento', 'id': 'id per collegarlo alla riposta giusta'}

	la risposta deve essere un array con questi json dentro
	{'text': 'testo della risposta da collegare', 'id': 'id per collegarla alla domanda giusta'}
	
	per gli allegati dimmi te, in teoria possono esserci sia nella domanda che risposta
	*/

    function MatchingQ(){
        this.columns = []; //Column[]
    };
    
    MatchingQ.prototype.addColumn = function(newColumn){ //newColumn:Column
      this.columns.push(newColumn);  
    };
    
    MatchingQ.prototype.createAnswerQuestion = function(answerColumn){ //AnswerColumn[]
        
    };
    
    MatchingQ.prototype.setColumns = function (newColumn){ //newColumns:Column[]
        
    };
    
    MatchingQ.prototype.getColumns= function(){
        return this.columns;
    };
    
    return MatchingQ;
    
    
}]);