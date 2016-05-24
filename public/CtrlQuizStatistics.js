angular.module().controller('CtrlQuizStatistics',['$scope','$http','QuizStatistics','GenericQuiz',function($scope,$http,QuizStatistics,GenericQuiz){ //GenericQuestion serve per usare i metodo get per le info delle domande
    
    $scope.quizStatistics = []; //QuizStatistics
    $scope.loadQuiz = function(){
      //chiedo al server di inviarmi tutte i quiz creati da questo teacher e mi restituisce un QuizStatistics[] e lo assegno a $scope.quizStatistics  
    };
    
    
}]);