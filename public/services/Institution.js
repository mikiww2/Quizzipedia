angular.module('managerInstitution').factory('Institution', ['Class', 'Director', function (Class, Director) {
    function Institution() {
        //qui dobbiamo fare una chiamata al server
        this.director = Director;
        this.creationDate = null;
        this.name = "TorreArchimede";
        this.classes = []; //array di classi
        this.students = []; //array di stringhe (mail studenti dell'istituto)
        this.teachers = []; //array di stringhe (mail di insegnanti dell'istituto)
        this.roleList = null; //tipo RoleList
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
    
    Institution.prototype.addStudent = function(studentMail) {
        this.students.push(studentMail);
    };
    
    Institution.prototype.removeStudent = function(studentMail) {
        var index = this.students.indexOf(studentMail);
        this.students.splice(index, 1);
    };
    
    Institution.prototype.addTeacher = function(teacherMail) {
        this.students.push(teacherMail);
    };
    
    Institution.prototype.removeTeacher = function(teacherMail) {
        var index = this.teachers.indexOf(teacherMail);
        this.teachers.splice(index, 1);
    };
    
    Institution.prototype.getName = function(){
      return this.name;  
    };
    
    return Institution;    

}]);