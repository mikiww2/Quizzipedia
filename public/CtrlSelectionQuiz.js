angular.module().controller('CtrlQuizSelection',['$scope','$http',function(){
    
    
    $scope.user = null;
    $scope.loadUser = function(){
      //carico l'utente loggato in questo momento  
    };
    
    $scope.classes = [];
    $scope.loadClasses = function(){
      //carico le classi in cui lo studente è inscritto  
    };
    
    $scope.quizList = [];
    $scope.loadQuizList = function(classes){
        //carica tutti i quiz apparteneti alle classi indicate nell'array classes[]
    };
    
    $scope.selectedQuiz = null;
    
    
    
}]);