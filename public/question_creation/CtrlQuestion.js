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
            
            this.question.addAnswer(new AnswerMultipleChoice());
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
        },
        setNameAttachment: function(index,name){
            this.question.setNameAttachment(index,name);  
        },
        setTypeAttachment: function(index,type){
            this.question.setTypeAttachment(index,type);
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
            case "mult": $scope.saveMultipleChoiceQ($scope.MyGenericQ,$scope.MyMultipleChoiceQ.question); break;
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
       setGenericPart(generic,multipleChoice);
        
        $scope.save(multipleChoice,generic.questionType);
        generic.reset();
        $scope.MyMultipleChoiceQ.question = new MultipleChoiceQ();
        $scope.MyMultipleChoiceQ.size = 0;
    };
    
    
    
    $scope.saveTrueFalseQ = function(generic,trueFalse){
       
        setGenericPart(generic,trueFalse);
        
            
        $scope.save(trueFalse,generic.questionType);
        
        generic.reset();
        $scope.MyTrueFalseQ = new TrueFalseQ();
        
        
    };
    
    
    
    $scope.uploadFiles = function(files,isQuestion,index){
        console.log(files[0]);
        $scope.files = files[0];
        if (files[0]){
            Upload.upload({
                url:'/api/upload/save',
                data: {file: files[0]}
            }).then(function(response){
                
            });
            
            if(isQuestion == 'question'){
                $scope.MyGenericQ.attachment = files[0].name;
            }
            else if(isQuestion == 'answer'){
                if($scope.MyGenericQ.questionType == 'mult'){
                    $scope.MyMultipleChoiceQ.setNameAttachment(index,files[0].name);
                    
                    var imgRegExp = new RegExp(/^image/g);
                    if(files[0].type.search(imgRegExp) != -1){ //imgRegExp.test(files[0].type) != -1
                        $scope.MyMultipleChoiceQ.question.setTypeAttachment(index,'img');
                    }
                    
                }
            }
            
            
            
            
        }
                   
    };
    
    
 
    
    $scope.resetQuestion = function(){
        console.log("resetQuestion");
        $http.get('/api/upload/remove');
    };
 
    
    $scope.save = function(question, type){
      //salvo la domanda creata        
        
        console.log(question);
        
        var json = {type: type, question: question};
        
       /*$http.post('/api/question/test',json).success(function(response){           
           
            
        });*/
    };
    
			
	
	
    
}]);









	//IMMAGINI AUDIO E VIDEO
	 /*   $scope.readURL = function (input,index) {

            var imageRegex = (/\.(gif|jpg|jpeg|tiff|png)$/i);
            var audioRegex = (/\.(?:wav|mp3)$/i);
            
            
		
		if(input.files && imageRegex.test(input.files[0].name)) { //IMAGE
			window.alert("This is an image of type: " + input.files[0].type); //test
			
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				
				reader.onload = function (e) {
					
					if(index == 'null'){
						$('#blah')
						.attr('src', e.target.result)
						.height(140)
						.width('auto');
                        
                        $scope.MyGenericQ.attachment = input.files[0].name;
						
					}
					else{
						$('#blah'+index)
						.attr('src', e.target.result)
						.height(140)
						.width('auto');    
					}                      

				};

				reader.readAsDataURL(input.files[0]);
				$('#blah').show();
			}
			
			else {
				$('#blah').hide(); 
			}
		} //END OF IMAGE
		//AUDIO
		else if(input.files && audioRegex.test(input.files[0].name)){	
			window.alert("This is an audio file of type: " + input.files[0].type); //test
			
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				
				reader.onload = function (e) {
					$('#audio-preview').attr('src', e.target.result);                

				};

				reader.readAsDataURL(input.files[0]);
				$('#audio-preview').show();
			}
			
			else {
				$('#audio-preview').hide(); 
			}
		} //END OF AUDIO
		
		else if(input.files[0].type === "video/mp4")	{
			window.alert("This is a video file of type: " + input.files[0].type); //test
			
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				
				reader.onload = function (e) {
					$('#video-preview').attr('src', e.target.result);
				};

				reader.readAsDataURL(input.files[0]);
				$('#video-preview').show();
			}
			
			else {
				$('#video-preview').hide(); 
			}
		} */