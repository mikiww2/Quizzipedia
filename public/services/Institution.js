angular.module('managerInstitution').factory('Institution', ['Class', 'Director', 'ClassList','RoleList','Topics',function (Class, Director,ClassList,RoleList,Topics) {
    function Institution() {
        //qui dobbiamo fare una chiamata al server
        this.director = null;
        this.creationDate = null;
        this.name = null;
        this.classes = []; //array di classi
        this.students = []; //array di stringhe (mail studenti dell'istituto)
        this.teachers = []; //array di stringhe (mail di insegnanti dell'istituto)
        this.roleList = null; //tipo RoleList
        this.classList = null; //ClassList
        this.topics = null; //Topics
    };
    
    
    
    Institution.prototype.getRoleList = function(){
      return this.roleList;  
    };
    
    
    Institution.prototype.getClassList = function(){
      return this.classList;  
    };
    
    
    Institution.prototype.acceptClassRequest = function(indexOfRequest){
        
    };
    
    Institution.prototype.removeClassRequest = function(indexOfRequest){
      this.classList.removeClassRequest(indexOfRequest);  
    };
    
    
    Institution.prototype.getTopics = function(){
      return this.topics;  
    };
    
    
    Institution.prototype.addClass = function(objectClass) {
        /*richiesta al server di trovare la classe giusta da pushare nell'array*/   
        
        if(objectClass instanceof Class){           
            this.classes.push(objectClass); 
        }       
    };
    
    Institution.prototype.removeClass = function(indexOfClass){
        if(indexOfClass >=0 && indexOfClass < this.classes.length){
             this.classes.splice(indexOfClass,1);
        }
    };
    
    Institution.prototype.getClasses = function(){
      return this.classes;  
    };
    
    Institution.prototype.setDirector = function(objectDirector){
        if(objectDirector instanceof Director){
            this.director = objectDirector;
        }
    };
    
    Institution.prototype.getDirector = function(){
      return this.director;  
    };
    
    Institution.prototype.acceptRequestRole = function(role){//role:String indichiamo se Studente o Docente
        
    };
    
    
    Institution.prototype.removeStudent = function(studentMail) {
        var index = this.students.indexOf(studentMail);
        this.students.splice(index, 1);
    };
    
    Institution.prototype.getStudents = function(){
      return this.students;  
    };
    
    Institution.prototype.getTeacher = function(){
      return this.teachers;  
    };
      
    Institution.prototype.removeTeacher = function(teacherMail) {
        var index = this.teachers.indexOf(teacherMail);
        this.teachers.splice(index, 1);
    };
    
    Institution.prototype.getName = function(){
      return this.name;  
    };
    
    Institution.prototype.setName = function(newName){
        this.name = newName;
    };
    
    return Institution;    

}]);