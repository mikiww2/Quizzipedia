angular.module().factory('AnswerMatchingQElement',[function(){
    
    function AnswerMatchingQElement(){
        this.id = null;
        this.valueAnswer = null;
    };
    
    AnswerMatchingQElement.prototype.setId = function(id){
        this.id = id;
    };
    
    AnswerMatchingQElement.prototype.setValueAnswer = function(value){
        this.valueAnswer = value;
    };
    
    
    
    return AnswerMatchingQElement;
    
    
}]);