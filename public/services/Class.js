angular.module('managerInstitution').factory('Class', [function() {
    function Class() {
        this.description = "Nessuna descrizione aggiunta";
        this.name = null;
        this.academicYear = null;
        this.teachers = []; //array stringhe
        this.students = []; // array stringhe           
    };
    
    //definiamo un altro costruttori con parametri in input?    
    
    Class.prototype.getDescription = function () {
        return this.description;
    };
    
    Class.prototype.getName = function () {
        return this.name;
    };
    
    Class.prototype.getAcademicYear = function () {
        return this.academicyear;
    };
    
    Class.prototype.getTeachers = function () {
        return this.teachers;
    };
    
    Class.prototype.getStudents = function () {
        return this.students;
    };
    
    Class.prototype.addTeacher = function (teacherMail) {        
        this.teachers.push(teacherMail);
    };
    
    Class.prototype.removeTeacher = function(teacherMail) {
        var index = this.teachers.indexOf(teacherMail);
        this.teachers.splice(index, 1);
    };
    
    Class.prototype.addStudent = function (studentMail) {
        this.students.push(studentMail);
    };
    
    Class.prototype.removeStudent = function(studentMail) {
        var index = this.students.indexOf(studentMail);
        this.students.splice(index, 1);
    };
    
    Class.prototype.edit = function(newDescription, newName, newYear){
        this.description = newDescription;
        this.name = newName;
        this.academicyear = newYear;
        
    };
    
    return Class;
    
}]);