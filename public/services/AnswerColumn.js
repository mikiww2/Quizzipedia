angular.module().factory('AnswerColumn',[function(){
    
    function AnswerColumn(){
      
        this.givenAnswerCell = []; //int[]
        
    };
    
    
    AnswerColumn.prototype.setGivenAnswerCell = function(answer){ //int[]
      this.givenAnswerCell = answer;  
    };
    
    AnswerColumn.prototype.getGivenAnswerCell = function(){
      return this.givenAnswerCell;  
    };
    
    
    
    AnswerColumn.prototype.check = function(){
      
        
        
    };
    
    return AnswerColumn;
    
}]);