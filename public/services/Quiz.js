//Include Class, Questions, Info

angular.module('').factory('Quiz', ['Class','GenericQuestions', 'QuizStatistics', 'StudentsStatisticsQuiz', function (Class, GenericQuestions, QuizStatistics, StudentsStatisticsQuiz) {
    function Quiz() {
        this.author = null; //stringa
        this.creationDate = null; //Data
        this.classes = []; //array di classi
        this.topics = []; //Array di stringhe
        this.description = null;
        this.questions = []; //array di GenericQuestions
        this.keywords = []; //array di stringhe
        this.title = null; //String      
        
    };
    
    Quiz.prototype.addTopic = function (topic) {
        this.topics.push(topic);
    };
    
    
    Quiz.prototype.removeTopic = function(index){
        
    };
    
    Quiz.prototype.setDescription = function (newDescr) {
        this.description = newDescr;
    };
    
    Quiz.prototype.setTitle = function(newTitle){
        this.title = newTitle;
    };
    
    
    Quiz.prototype.addKeyword = function (keyword) {
        this.keywords.push(keyword);
    };
    
    Quiz.prototype.addQuestion = function (objectQuestion) {
        if (objectQuestion instanceof GenericQuestion) {
            this.questions.push(question);
        }
        //Aggiornamento server alla fine
    };
    
    Quiz.prototype.removeQuestion = function (indexOfQuestion) {
        if (indexOfQuestion >= 0 && indexOfQuestion<this.questions.length) {
            this.questions.splice(indexOfQuestion, 1);
        }       
        //Aggiornamento server alla fine
    };
    
    Quiz.prototype.addClass = function (objectClass) {
        if (objectClass instanceof Class) {
            this.classes.push(class);
        }
    };
    
    Quiz.prototype.removeClass = function(index){
        this.classes.splice(index,1);
    }
    
    
    Quiz.prototype.createStatisticsQuiz = function(){
        
    };
    
    Quiz.prototype.createStatisticsStudents = function(){
        
    };
    
    return Quiz;    
        
}]);