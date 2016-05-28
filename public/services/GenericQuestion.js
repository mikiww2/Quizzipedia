angular.module('CreateQuestion').factory('GenericQuestion',[function(){
    
    function GenericQuestion(){
      
        this.author = null; // Teacher
        this.title = null; //String
        this.description = null; //String
        this.topic = null, //String
        this.difficulty = null; //int
        this.questionAttachement = null; //String
        this.keywords = []; //String[]
        
        
    };
    
    
    GenericQuestion.prototype.setTitle = function(newTitle){
        this.title = newTitle;
    };    
    
    GenericQuestion.prototype.setDescription = function(newDescription){
        this.description = newDescription;
    };
    
    GenericQuestion.prototype.setTopic = function(newTopic){
        this.topic = newTopic;
    };
    
    GenericQuestion.prototype.setDifficulty = function(newDifficulty){
        this.difficulty = newDifficulty;
    };
    
    GenericQuestion.prototype.setQuestionAttachment = function(newAttachment){
        this.questionAttachement = newAttachment;
    };
    
    GenericQuestion.prototype.setKeyword = function(newArrayKeyword){
        this.keywords = newArrayKeyword;
    };    
    
    GenericQuestion.prototype.createStatisticsQuestion = function(){ //return QuestionStatistics
        
    };
    
    return GenericQuestion;
    
    
    
}]);