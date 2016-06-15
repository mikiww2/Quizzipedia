/*
 * Nome del file: Institution.js
 * Percorso: public/services/Institution.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per l'ente
 *
 * * Diario delle modifiche:
 *
 */

angular.module('InstitutionManager').factory('Institution', ['Class', 'Director', 'ClassList','RoleList','Topics',function (Class, Director,ClassList,RoleList,Topics) {

    function Institution() {
        //qui dobbiamo fare una chiamata al server
        this.director = null; //Director
        this.creationDate = null;
        this.name = null;
        this.classes = []; //array di classi
        this.students = []; //array di stringhe (mail studenti dell'istituto)
        this.teachers = []; //array di stringhe (mail di insegnanti dell'istituto)
        this.roleList = null; //tipo RoleList
        this.classList = null; //ClassList
        this.topics = null; //Topics
    };


    Institution.prototype.setName = function(newName){
        this.name = newName;
    };

    Institution.prototype.getName = function(){
        return this.name;
    };

    Institution.prototype.setDirector = function(objectDirector){
        if(objectDirector instanceof Director){
            this.director = objectDirector;
        }
    };

    Institution.prototype.getDirector = function(){
        return this.director;
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

    Institution.prototype.getStudents = function(){
        return this.students;
    };

    Institution.prototype.removeStudent = function(studentMail) {
        var index = this.students.indexOf(studentMail);
        this.students.splice(index, 1);
    };

    Institution.prototype.getTeachers = function(){
        return this.teachers;
    };

    Institution.prototype.removeTeacher = function(teacherMail) {
        var index = this.teachers.indexOf(teacherMail);
        this.teachers.splice(index, 1);
    };


    Institution.prototype.getClassList = function(){
        return this.classList;
    };

    Institution.prototype.acceptClassRequest = function(indexOfRequest){

        if(indexOfRequest >= 0 && indexOfRequest < this.classList.length){
            this.removeClassRequest(indexOfRequest);
        }
    };

    Institution.prototype.removeClassRequest = function(indexOfRequest){
        this.classList.removeClassRequest(indexOfRequest);
    };


    Institution.prototype.getRoleList = function(){
        return this.roleList;
    };

    Institution.prototype.acceptRequestRole = function(mail, role){//role:String indichiamo se Studente o Docente
        if(role == "Student"){
            var index = this.roleList.students.indexOf(mail);
            this.roleList.removeStudent(index);
        }
        else {
            var index = this.roleList.teacher.indexOf(mail);
            this.roleList.removeTeacher(index);
        }
    };


    Institution.prototype.getTopics = function(){
        return this.topics;
    };


    return Institution;    

}]);