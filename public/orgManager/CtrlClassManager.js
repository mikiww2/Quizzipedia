/*
 * Nome del file: CtrlClassManager.js
 * Percorso: public/orgManager/CtrlClassManager.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per il reperimento della lista di classi, modifica e eliminazione
 *
 * * Diario delle modifiche:
 *
 */

angular.module('InstClassManager').controller('CtrlClassManager',['Class', '$scope', '$http', '$window', function (Class, $scope, $http, $window){
    
    $scope.classes = [];
    $scope.userClasses = [];
    $scope.classMembers = [];
    $scope.myClass = new Class();
    $scope.index = null;
    $scope.memberToRemove = null;
    $scope.userClassesWithQuizzes = [];
          
    $scope.fetchClassesWithQuiz = function () {
      $http.get('/api/class/fetch_classes_with_quiz').success(function(response) {
          $scope.userClassesWithQuizzes = response;
      });
    }
    
    $scope.loadClasses = function() { 
        $http.get('/api/class/fetch_inst_classes').success(function(response) {
            $scope.classes = response;
        });
    };
    
    $scope.loadUserClasses = function () {
        $http.get(' /api/class/fetch_classes_details').success(function(response) {
            $scope.userClasses = response;
        });
    };
    
    $scope.loadMembers = function (selectedClass, index) {
        if ($scope.classMembers[index] == null) {
            var request = {class_id : selectedClass};
            $http.post('/api/class/fetch_class_members', request).success(function(response) {
                $scope.classMembers[index] = response;
                
                angular.forEach ($scope.classMembers[index], function(member) {
                if (member.role == "teacher")
                    member.role = "Docente";
                else if (member.role =="student")
                    member.role = "Studente";
                else if (member.role=="director")
                    member.role = "Responsabile";
                })
            });
        }
    }
        
    $scope.createClass = function() {
        var request = { description : $scope.myClass.getDescription(), name : $scope.myClass.getName(), academicYear : $scope.myClass.getAcademicYear()};
        $http.post('/api/class/create_class', request); 
        $scope.classes.push(request);
        $scope.myClass = new Class();       
    };
    
    $scope.delete = function() {
        var request = {_id : $scope.classes[$scope.index]._id};
        $http.post('/api/class/remove_class', request);
        $scope.classes.splice($scope.index, 1);
        $scope.myClass = new Class();
        $scope.index = null;        
    };
    
    $scope.edit = function (){
        var request = {_id : $scope.classes[$scope.index]._id, description : $scope.myClass.getDescription()};
        $http.post('/api/class/update_class', request);
        $scope.classes[$scope.index].description = $scope.myClass.getDescription();
        $scope.myClass = new Class();
        $scope.index = null;
    };
    
    $scope.selectClass = function (indexOfClass) {
        $scope.myClass.edit($scope.classes[indexOfClass].description, $scope.classes[indexOfClass].name, $scope.classes[indexOfClass].academicYear);    
        $scope.index = indexOfClass;
    };
    
    $scope.setIndex = function (newIndex) {
        $scope.index = newIndex;
    };
    
    $scope.setMemberToRemove = function (member) {
        $scope.memberToRemove = member;
    };
    
    $scope.deleteFromClass = function (){
        var request = {user : $scope.memberToRemove.user, class_id : $scope.userClasses[$scope.index].class_id};
        $http.post('/api/class/remove_from_class', request);
        var userIndex = $scope.classMembers[$scope.index].indexOf($scope.memberToRemove);
        $scope.classMembers[$scope.index].splice(userIndex, 1);
        $scope.memberToRemove=null;
        $scope.index=null;
    };
    
     $scope.selectQuiz = function(quizToSolve) {
        $http.post('/api/quiz/prepare_quiz_execution', quizToSolve)
                .success(function(response) {
                    $window.location.href = '/Quizzipedia/quizExec';
                });
    };
    
    $scope.loadClasses(); 
    $scope.loadUserClasses();
    $scope.fetchClassesWithQuiz();
}]);
    
    
        
        