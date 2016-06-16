/*
 * Nome del file: Class.js
 * Percorso: public/services/Class.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la classe
 *
 * * Diario delle modifiche:
 *
 */

angular.module('InstClassManager').factory('Class', [function() {

    function Class() {
        this.name = null;
        this.description = null;
        this.academicYear = null;
        this.teachers = []; //array stringhe
        this.students = []; // array stringhe           
    };
    
  
    
    Class.prototype.getDescription = function () {
        return this.description;
    };
    
    Class.prototype.getName = function () {
        return this.name;
    };
    
    Class.prototype.getAcademicYear = function () {
        return this.academicYear;
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
        this.academicYear = newYear;
        
    };
    
    return Class;
    
}]);