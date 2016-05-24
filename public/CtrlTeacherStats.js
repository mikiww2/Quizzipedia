angular.module().controller('CtrlTeacherStats',['$scope','$http',function($scope,$http){
    
    $scope.teachers = []; //Teacher[]
    $scope.selectedTeacher = null;
    $scope.questions = []; //GenericQuestion
    
    $scope.loadTeachers = function(){
      //carico tutti i Teacher di questo instituto  
    };
    
    $scope.loadQuestions = function(){
      //carico tutte le domande del Teacher selezionato  
    };
    
    
}]);