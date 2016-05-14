angular.module().factory('Column',['Cell',function(Cell){
    
    function Column(text,correctAnswer){
      
        this.text = text; //Cell[]
        this.correctAnswer = correctAnswer; //int[]
                
    };
    
    Column.prototype.addCell = function(position,text,attachment){ //int,String,String
        
        this.text.push(new Cell(position,text,attachment));
    };
    
    Column.prototype.getText = function(){
      return this.text;  
    };
    
    Column.prototype.getCorrectAnswer = function(){
      return this.correctAnswer;  
    };
    
    Column.prototype.setText = function(newText){ //newText:Cell[]
        this.text = newText;
    };
    
    Column.prototype.setCorrectAnswer = function(newAnswer){ //int[]
      this.correctAnswer = newAnswer;  
    };
    
    
    return Column;
    
    
    
}]);