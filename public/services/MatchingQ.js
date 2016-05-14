angular.module().factory('MatchingQ',['Column',function(){
    
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