angular.module('managerRequests').factory('RoleList',['RequestRole', function(RequestRole){
    
    function RoleList(){        
        this.students = []; //array RequestRole
        this.teacher = []; //array RequestRole
    };
    
    RoleList.prototype.addRoleList = function(mailUser, message, role){
        
        if(role == "Student"){
            this.students.push(new RequestRole(mailUser, message));    
        }
        else{
            this.teacher.push(new RequestRole(mailUser, message));
        }       
        
    };    
    
    RoleList.prototype.removeStudent = function(indexOfStudent){
        
        if(indexOfStudent >= 0 && indexOfStudent < this.students.length){
            this.students.splice(indexOfStudent,1);
            //faccio la richiesta al server?
        }
    };
    
    RoleList.prototype.removeTeacher = function(indexOfTeacher){
        
        if(indexOfTeacher >= 0 && indexOfTeacher < this.teacher.length){
            this.students.splice(indexOfTeacher,1);
            
            //faccio la richiesta al server?
        }
    };
    
    RoleList.prototype.acceptStudent = function(indexOfStudent){
        
        if(indexOfStudent>= 0 && indexOfStudent < this.students.length){
            //faccio richiesta al server e faccio diventare questo utente studente 
            
            this.removeStudent(indexOfStudent);
        }
        
        
    };
    
    RoleList.prototype.acceptTeacher = function(indexOfTeacher){
        
        if(indexOfTeacher>= 0 && indexOfTeacher < this.teacher.length){
            //faccio richiesta al server e faccio diventare questo utente insegnante
            
            this.removeTeacher(indexOfTeacher);
        }
    };
    
    return RoleList;
}]);