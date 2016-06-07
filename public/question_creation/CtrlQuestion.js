angular.module('CreateQuestion').controller('CtrlQuestion',['$scope','$http','TrueFalseQ','ShortAnswerQ','MultipleChoiceQ','AnswerMultipleChoice','Attachment','Upload','$window','$timeout', function($scope, $http, TrueFalseQ,ShortAnswerQ,MultipleChoiceQ,AnswerMultipleChoice,Attachment,Upload,$window,$timeout){ //dipendenze verso tutti i tipi di domande e Topics
    
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
        keywords: [],
        reset: function(){ //Non pulisce le keywords
            this.title = null;
            this.description = null;
            this.attachment = null;
            this.topic = null;
            this.questionType = null;
            this.difficulty = null;
            this.keywords = [];
        }
    };
    
    
    $scope.MyTrueFalseQ = new TrueFalseQ();
    
    $scope.MyShortAnswerQ = new ShortAnswerQ();
    
    $scope.MyMultipleChoiceQ = {
      
        question: new MultipleChoiceQ(),
        size: 0,
        create: function(index){ //per i textarea
            var x = new AnswerMultipleChoice();
            this.question.addAnswer(x);
            this.question.arrayAnswer[index].textAnswer = "";
            this.size = this.size +1;
        },
        remove: function(index){
            this.question.removeAnswer(index);
            this.size = this.size -1;
        },
        preUpload: function(index){
            var x = new AnswerMultipleChoice();
            this.question.addAnswer(x);
            this.question.setEmptyAttachment(index);
            this.size = this.size + 1;
        }
        
        
        
    };
    
   
   
    
       
    $scope.MyCompletionQ ={
      
        text: null,
        correctAnswer: [],
        wrongAnswer: [],
        insertAnswer: function(name,correct){ //correct == true allora inserisco in correctAnswer altrimenti wrongAnswer
        
        },
        removeAnswer: function(name,correct){ //correct == true rimuovo la risposta da correctAnswer altrimenti wrongAnswer
            
        },
        reset: function(){
            this.text = null;
            this.correctAnswer = [];
            this.wrongAnswer = [];
        }
        
    };    
    
    $scope.MyMatchingQ = {
      answer: [], //answer temporanea che deve essere inserita in allAnswer
      allAnswers:[], //è la tabella dei collegamenti
      saveAnswer: function(answer){
          $scope.MyMatchingQ.allAnswers.push(answer);
      },
      removeAnswer: function(answer){
          
      },
      reset: function(){
          this.answer = [];
          this.allAnswers = [];
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
        
        //var questionShort = new ShortAnswerQ();
        
        setGenericPart(generic,shortAnswer);
        //questionShort.setCorrectAnswer(shortAnswer.answer);
        
        $scope.save(shortAnswer);
        
        generic.reset();
        $scope.MyShortAnswerQ = new ShortAnswerQ();
       
    };
    
    $scope.saveMultipleChoiceQ = function(generic,multipleChoice){
       
    };
    
    
    
    $scope.saveTrueFalseQ = function(generic,trueFalse){
       
        setGenericPart(generic,trueFalse);
        
            
        $scope.save(trueFalse);
        
        generic.reset();
        $scope.MyTrueFalseQ = new TrueFalseQ();
        
        
    };
    
    
    /*$scope.onFileSelect = function($files){
        for(var i = 0; i< $files.length; i++){
            $scope.localfiles.push($files[i]);
        }
    };*/

    
    
    $scope.uploadFiles = function(files){
        console.log(files);
        $scope.files = files;
        if (files && files.length){
            console.log("porco diosfhduhfdsuhfuidhsufihdsuihfdsui");
            Upload.upload({
                url:'/api/upload/save',
                data: {file: files}
            }).then(function(response){
                alert(response);
            });
        }
        
        
    };
    
    
    
    $scope.save = function(question){
      //salvo la domanda creata        
        
        var json = {
          domanda: question,
            file: $scope.localfiles
        };
        

       $http.post('/api/question/test',json).success(function(response){
            
            //$http.get('/api/question/fetch').success(function(response){
              //  $scope.domande = response;
            //});
        
            alert(response.toJson);
        });
    };
    
    
     //GESTIONE UPLOAD FILE
    
   /* $scope.submit = function(){
      
        if($scope.upload_form.file.$valid && $scope.file){
            $scope.upload($scope.file);
        }
        
    };*/
    
    /*$scope.upload = function(file){
        Upload.upload({
            url: 'http://localhost:8080/upload', //API
            data: {file: file},
            
        }).then(function(response){
            if(response.data.error_code === 0){
                $window.alert('Success' + response.config.data.file.name + 'uploaded. Response: ');
            }
            else {
                $window.alert('an error accured');
            }
        },function(response){
            console.log('Error status: '+ response.status);
            $window.alert('Error status: '+ response.status);
        },function(evt){
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: '+ progressPercentage + '%'+ evt.config.data.file.name);
            $scope.progress = 'progress: '+ progressPercentage + '%';
        });
    };*/
    
    
    
}]);