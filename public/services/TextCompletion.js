angular.module('CreateQuestion').factory('TextCompletion',[function(){
    
    function TextCompletion(){
      
        this.type = null; //'txt/id'
        this.value = null; //testo domanda --> type = txt 
                           //id buco --> type = id
        
    };
    
    TextCompletion.prototype.getType = function(){
      return this.type;  
    };
    
    TextCompletion.prototype.getValue = function(){
      return this.value;  
    };
    
    TextCompletion.prototype.setType = function(type){
      this.type = type;  
    };
    
    TextCompletion.prototype.setValue = function(value){
        
        this.value = value;
    };
    
    
    
    return TextCompletion;
    
    
}]);