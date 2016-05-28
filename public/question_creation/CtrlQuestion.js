angular.module('CreateQuestion').controller('CtrlQuestion',['$scope','$http','TrueFalseQ','ShortAnswerQ', function($scope, $http, TrueFalseQ,ShortAnswerQ){ //dipendenze verso tutti i tipi di domande e Topics
    
    $scope.topics = []; //inizializzato dal server
    
    $scope.domande = [];
    $scope.teacher = "teacher@gmail.com"; //mi serve solo la mail che va recuperata dal server
    
    $scope.MyGenericQ ={
        title: null,
        description: null,
        attachment: null,
        topic: null,
        questionType: null,
        difficulty: null,
        keywords: []
    };
    
    $scope.MyTrueFalseQ ={
        answer: null //bool
    };
    
    $scope.MyShortAnswerQ = {
        answer: null //String
    };
    
    $scope.MyMultipleChoiceQ = {
        correctAnswer: [],
        wrongAnswer: [],
        insertAnswer: function(text, check){//name:String della risposta  check:bool memorizza se corretto (se true faccio il push in correctAnswer)
            if(check){
                $scope.multipleChoiceSection.correctAnswer.push(name);
            }
            else{
                $scope.multipleChoiceSection.wrongAnswer.push(name);
            }
        },
        removeAnswer: function(text, check){ //check == true devo cerco la risposta dentro a correctAnswer altrimenti wrongAnswer
            
        }
        
    };
    
    $scope.MyCompletionQ ={
      
        text: null,
        correctAnswer: [],
        wrongAnswer: [],
        insertAnswer: function(name,correct){ //correct == true allora inserisco in correctAnswer altrimenti wrongAnswer
        
        },
        removeAnswer: function(name,correct){ //correct == true rimuovo la risposta da correctAnswer altrimenti wrongAnswer
            
        }
        
    };    
    
    $scope.MyMatchingQ = {
      answer: [], //answer temporanea che deve essere inserita in allAnswer
      allAnswers:[], //è la tabella dei collegamenti
      saveAnswer: function(answer){
          $scope.MyMatchingQ.allAnswers.push(answer);
      },
      removeAnswer: function(answer){
          
      }
    };
    
    
    $scope.createQuestion = function(typeQuestion){
      
        switch(typeQuestion){
            case "mtch": $scope.saveMatchingQ($scope.MyGenericQ,$scope.MyMatchingQ); break;
            case "cmpl": $scope.saveCompletionQ($scope.MyGenericQ,$scope.MyCompletionQ); break;
            case "open": $scope.saveShortAnswerQ($scope.MyGenericQ,$scope.MyShortAnswerQ); break;
            case "mult": $scope.saveMultipleChoiceQ($scope.MyGenericQ,$scope.MyMultipleChoiceQ); break;
            case "trfs": $scope.saveTrueFalseQ($scope.MyGenericQ,$scope.MyTrueFalseQ); break;
            default: alert("This question type doesn't exist");
        }
        
        
    };
    
    
    
    var setGenericPart = function(generic,question){
        question.setAuthor($scope.teacher);
        question.setTitle(generic.title);
        question.setDescription(generic.description);
        question.setTopic(generic.topic);
        question.setDifficulty(generic.difficulty);
        question.setQuestionAttachment(generic.attachment);
        question.setKeyword(generic.keywords);
    };
    
    
    $scope.saveMatchingQ = function(generic,matching){
       
    };
    
    $scope.saveCompletionQ = function(generic,completion){
       
    };
    
    $scope.saveShortAnswerQ = function(generic,shortAnswer){
        
        var questionShort = new ShortAnswerQ();
        
        setGenericPart(generic,questionShort);
        questionShort.setCorrectAnswer(shortAnswer.answer);
        
        $scope.save(questionShort);
       
    };
    
    $scope.saveMultipleChoiceQ = function(generic,multipleChoice){
       
    };
    
    
    
    $scope.saveTrueFalseQ = function(generic,trueFalse){
       
        var questionTF = new TrueFalseQ();
        
        setGenericPart(generic,questionTF);
        
        questionTF.setCorrectAnswer(trueFalse.answer);
        
        
        $scope.save(questionTF);
        
        
        
        
    };
    
    $scope.save = function(question){
      //salvo la domanda creata        
        
        $scope.domande.push(question);
    };
    
    
    
}]);