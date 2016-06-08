angular.module('CreateQuestion').controller('CtrlQuestion',['$scope','$http','TrueFalseQ','ShortAnswerQ','MultipleChoiceQ','AnswerMultipleChoice','Attachment','Upload','$window', function($scope, $http, TrueFalseQ,ShortAnswerQ,MultipleChoiceQ,AnswerMultipleChoice,Attachment,Upload,$window){ //dipendenze verso tutti i tipi di domande e Topics
    
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
        
        $scope.save(shortAnswer,generic.questionType);
        
        generic.reset();
        $scope.MyShortAnswerQ = new ShortAnswerQ();
       
    };
    
    $scope.saveMultipleChoiceQ = function(generic,multipleChoice){
       
    };
    
    
    
    $scope.saveTrueFalseQ = function(generic,trueFalse){
       
        setGenericPart(generic,trueFalse);
        
            
        $scope.save(trueFalse,generic.questionType);
        
        generic.reset();
        $scope.MyTrueFalseQ = new TrueFalseQ();
        
        
    };
    
    
    
    
    /*
         if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    

                    reader.onload = function (e) {
                        
                        console.log("chiamato il metodo onload");
                        console.log(e.target.result);
                        
                        if(index == 'null'){
                            $('#blah')
                            .attr('src', e.target.result)
                            .width(150)
                            .height(200);
                            
                        }
                        else{
                            $('#blah'+index)
                            .attr('src', e.target.result)
                            .width(150)
                            .height(200);    
                        }
                        
                        
                        
                    };

                    reader.readAsDataURL(input.files[0]);
                }
    
    */
    
    
    
    $scope.uploadFiles = function(files,input){
        console.log(files[0]);
        $scope.files = files[0];
        if (files[0]){
            Upload.upload({
                url:'/api/upload/save',
                data: {file: files[0]}
            }).then(function(response){
                console.log(response);
            });
            
            /*var jq = $.noConflict();
            
            var reader = new FileReader();
            reader.onload = function(e){
                console.log(e.target.result);
              jq('#blah').attr('src', e.target.result).width(150).height(200);  
            };
            */
            
            //reader.readAsDataURL(input.files[0]);
            
            
            
        }       
    };
    
    
    /*
    $scope.$on('$locationChangeStart', function(event){
        console.log("sono stato chiamato");
        var answer = confirm("Sicuro di voler interrompere la creazione delle domanda?");
        
        if(!answer){
            event.preventDefault();
        }
    });
    */
    
    
   
/*window.onbeforeunload = function (event) {
  console.log(event);
    var answer = confirm('Sei sicura di voler uscire dalla creazione della domanda?');
    if(typeof event == 'undefined'){
        event = window.event;
    }
    if(event){
        event.returnValue = answer;
    }
    
    console.log(event);
    return answer;
  
}*/
   
    
    $scope.resetQuestion = function(){
        console.log("resetQuestion");
        $http.get('/api/upload/remove');
    };
 
    
    $scope.save = function(question, type){
      //salvo la domanda creata        
        

        var json = {type: type, question: question};
        
       $http.post('/api/question/test',json).success(function(response){
            
            //$http.get('/api/question/fetch').success(function(response){
              //  $scope.domande = response;
            //});
        
            alert(response.toJson);
        });
    };
    
    $scope.readURL = $(function (input,index) {
        
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    

                    reader.onload = function (e) {
                        
                        
                        
                        if(index == 'null'){
                            $('#blah')
                            .attr('src', e.target.result)
                            .width(150)
                            .height(200);
                            
                        }
                        else{
                            $('#blah'+index)
                            .attr('src', e.target.result)
                            .width(150)
                            .height(200);    
                        }
                        
                        
                        
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            });
    
}]);