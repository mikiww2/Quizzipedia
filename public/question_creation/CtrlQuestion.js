/*
 * Nome del file: CtrlQuestion.js
 * Percorso: public/question_creation/CtrlQuestion.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la creazione dei vari tipi di domanda
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').controller('CtrlQuestion',['$scope','$http','TrueFalseQ','ShortAnswerQ','MultipleChoiceQ','AnswerMultipleChoice','Attachment','Upload','$window','CompletionQ','MatchingQ', function($scope, $http, TrueFalseQ,ShortAnswerQ,MultipleChoiceQ,AnswerMultipleChoice,Attachment,Upload,$window,CompletionQ,MatchingQ){ //dipendenze verso tutti i tipi di domande e Topics
    
    
    $scope.domande = [];
    
    $scope.teacher = "teacher@gmail.com"; //mi serve solo la mail che va recuperata dal server
    
    $scope.MyGenericQ ={
        title: null,
        description: null,
        attachment: new Attachment(),
        topic: null,
        questionType: null,
        difficulty: null,
        keywords: []
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
            
            this.question.removeAnsw(index);
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
    
   
   
       
    $scope.MyCompletionQ = {
      
        question: new CompletionQ(),
        initText: function(){
            
            this.question.insertText("");
            this.question.insertHole(this.question.getSizeText());
        },
        initAnswer: function(){
            
            this.question.insertAnswer("",-1);
        },
        fixAnswer: function(idHole,value){
        
            var size = this.question.getSizeAnswer();
            
            if(idHole == 'null'){
                
                for(var i = 0; i< size; i++){
                    
                    this.question.answer[i].setId(value);
                }
            }
            else{
                
                for(var i = 0; i < size;i++){
                    if(this.question.answer[i].getId() == idHole){
                        this.question.answer[i].setId(value);
                    }
                }
                
            }
            
        },
        removeAnswer: function(index){
            this.question.removeAns(index);
            
        },
        removeText: function(index,type){
            var size = this.question.getSizeText();
            
            if( size == 2){ //ok
                this.question.removeSomeTextElements(0,size);
                this.fixAnswer('null',-1);
                
            }
            
            if( size >= 4){
                
                if(type == 'hole'){
                    
                    var left = index - 1;
                    var right = index + 1;
                    
                    if(left >=0 && right< size){ //se true allora fusione dei textarea
                        
                        var testo = this.question.getTextElement(left);
                        testo = testo + this.question.getAnswerElement(this.question.getTextElement(index)) + this.question.getTextElement(right);
                        
                        this.question.text[left].setValue(testo);
                        
                    }
                    
                    this.fixAnswer(this.question.getTextElement(index),-1);
                          
                }
                else{ //txt
                    this.fixAnswer(this.question.getTextElement(index+1),-1);
                }
                
                
                var start = null;
                
                if((type == 'txt') || (type == 'hole' && (index + 1 < size))){
            
                    this.question.removeSomeTextElements(index,2);
                    start = index;
                }
                else if((type == 'hole') && (index + 1 >= size)){
                    
                    this.question.removeSomeTextElements(index - 1,2);
                    start = this.question.getSizeText();
                    
                }
                
                
                //sistemo i value dei buchi e inizio dalla posizione start
                
                for(var i = start; i < this.question.getSizeText();i++){
                    
                    if(this.question.getTypeTextElement(i) == 'id'){
                        var idValue = this.question.getTextElement(i);
                        
                        this.fixAnswer(idValue,i);
                        this.question.text[i].setValue(i);
                        
                    }
                }
                
            }
            
            
        }
        
    };
    
    
    
    
    
    
    
    
    $scope.MyMatchingQ = {
        questionMatch: new MatchingQ(),
        destinationAttachment: "",
        setDestination: function(value){
            this.destinationAttachment = value;
        },
        createTextArea: function(isPortionText){
            if(isPortionText){
                this.questionMatch.insertTextIntoText(-1,"");
            }
            else{
                this.questionMatch.insertTextIntoAnswer(-1,"");    
            }
            
        },
        createAttachment: function(isPortionText){
            if(isPortionText){
                
                this.questionMatch.insertAttachmentIntoText(-1);
            }
            else{
                
                this.questionMatch.insertAttachmentIntoAnswer(-1);
            }
        },
        removeTextElement: function(index){
            
            this.setNegativeIdAnswer(this.questionMatch.text[index].getId());
            this.questionMatch.removeText(index);
            
        },
        removeAnswerElement: function(index){
            this.questionMatch.removeAnswer(index);
        },
        setNegativeIdAnswer: function(id){ //sistema gli indici del testo e risposte 
               var size = this.questionMatch.getSizeAnswer();
                var change = false;
            
               for(var i = 0; i < size && !change; i++){
                   if(this.questionMatch.answer[i].getId() == id){
                       this.questionMatch.answer[i].setId(-1);
                       change = true;
                   }
               }
        },
        
        
      
    };
    
    
    $scope.createQuestion = function(typeQuestion){
        switch(typeQuestion){
            case "mtch": $scope.saveMatchingQ($scope.MyGenericQ,$scope.MyMatchingQ.questionMatch); break;
            case "cmpl": $scope.saveCompletionQ($scope.MyGenericQ,$scope.MyCompletionQ.question); break;
            case "open": $scope.saveShortAnswerQ($scope.MyGenericQ,$scope.MyShortAnswerQ); break;
            case "mult": $scope.saveMultipleChoiceQ($scope.MyGenericQ,$scope.MyMultipleChoiceQ.question); break;
            case "trfs": $scope.saveTrueFalseQ($scope.MyGenericQ,$scope.MyTrueFalseQ); break;
            default: alert("This question type doesn't exist"); break;
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
       
        //prima di salvare ho dei controlli da fare
        var questionIsValid = true;
        
        //controllo che ci sia un numero sufficiente di risposte
        if(matching.getSizeText() > matching.getSizeAnswer()){
            questionIsValid = false;
            alert("Salvataggio interrotto perchè non sono state inserite un numero sufficiente di risposte! Aggiungerne di nuove e confermate la creazione della domanda");
        }
        
        if(questionIsValid){
            //ho un numero di risposte sufficienti
            
            
            //controllo che nella parte di testo non ci siano id = -1
            var indexNegative = false;
            var k = 0;
            for(k; k < matching.getSizeText() && !indexNegative; k++){
                if(matching.text[k].getId() == -1){
                    indexNegative = true;
                }
            }
            
            
            if(indexNegative){
                questionIsValid = false;
                
                if(matching.text[k-1].txt != null){
                    alert("il frammento di testo:" + matching.text[k-1].getTxt() + " ha un id = -1 che non è valido nel testo ma è valido solo nelle risposte");              
                }
                else if(matching.text[k-1].attachment != null){
                    alert("il frammento di testo:" + matching.text[k-1].getAttachment().getPath() + " ha un id = -1 che non è valido nel testo ma è valido solo nelle risposte");
                    
                }
                
            }
            
            
            
            
            //devo controllare che ogni parte del testo abbia un sola risposta associata
            if(questionIsValid && !indexNegative){
                var condition = true; //suppongo che ogni testo ha una ed una sola risposta associata0
                for(var i = 0; i < matching.getSizeText() && condition; i++){
                    var id = matching.text[i].getId();
                    var conta = 0;
                
                    
                    for(var j=0; j < matching.getSizeAnswer(); j++){
                    
                        if(matching.answer[j].getId() == id){
                            conta = conta + 1;
                        }
                    
                    }
                    
                    if(conta == 0){
                        questionIsValid = false;
                        condition = false;
                        if(matching.text[i].txt != null){
                            alert("Il frammento di testo: "+ matching.text[i].getTxt() + " non ha nessuna risposta associata! La domanda non è stata salvata");    
                        }
                        else if(matching.text[i].attachment != null){
                            alert("Il frammento di testo: "+ matching.text[i].getAttachment().getPath() + " non ha nessuna risposta associata! La domanda non è stata salvata");    
                        }
                        
                    }
                    else if(conta > 1){
                        questionIsValid = false;
                        condition = false;
                        if(matching.text[i].txt != null){
                            alert("Il frammento di testo: "+ matching.text[i].getTxt() + " ha " + conta + " risposte assegnate! Ne deve avere solo una. Domanda non salvata");    
                        }
                        else if(matching.text[i].attachment != null){
                            alert("Il frammento di testo: "+ matching.text[i].getAttachment().getPath() + " ha " + conta + " risposte assegnate! Ne deve avere solo una. Domanda non salvata");    
                        }
                        
                    }
                
                }
                
            }
            
            
        }
        
        
        if(questionIsValid){ //se dopo tutti i controlli è TRUE allora salvo la domanda
            
            setGenericPart(generic,matching);
            
            $scope.save(matching,generic.questionType);
        }
        
        
    };
    
    $scope.saveCompletionQ = function(generic,completion){
        
        //controllare che tutti i buchi del testo abbiano una ed una sola domanda associata
        
        var questionIsValid = true; //suppongo vada tutto bene
        
        for(var i = 0; i < completion.getSizeText() && questionIsValid; i++){
            
            if(completion.getTypeTextElement(i) == 'id'){ //è un buco
                
                var valueHole = completion.getTextElement(i);
                var result = completion.checkAnswer(valueHole);
                
                if(result == 0){
                    questionIsValid = false;
                    alert("Lo spazio "+ valueHole + "non ha risposte associate e la domanda non è stata salvata");
                }
                else if(result > 1){
                    questionIsValid = false;
                    alert("Lo spazio "+ valueHole+ "ha più di una risposta associata e la domanda non è stata salvata");
                }
                
                
            }
        }
        
        if(questionIsValid){
            //salviamo la domanda
            setGenericPart(generic,completion);
            
            $scope.save(completion,generic.questionType);
        }
        
        
       
    };
    
    $scope.saveShortAnswerQ = function(generic,shortAnswer){
        
        //var questionShort = new ShortAnswerQ();
        
        setGenericPart(generic,shortAnswer);
        //questionShort.setCorrectAnswer(shortAnswer.answer);
        
        $scope.save(shortAnswer,generic.questionType);
       
    };
    
    $scope.saveMultipleChoiceQ = function(generic,multipleChoice){
       setGenericPart(generic,multipleChoice);
        
        $scope.save(multipleChoice,generic.questionType);
    };
    
    
    
    $scope.saveTrueFalseQ = function(generic,trueFalse){
       
        setGenericPart(generic,trueFalse);
        $scope.save(trueFalse,generic.questionType);
        
        
    };
    
    
    
    $scope.uploadFiles = function(files,isQuestion,index){
        
        $scope.files = files[0];
        var imgRegExp = new RegExp(/^image/g);
        var videoRegExp = new RegExp(/^video/g);
        var audioRegExp = new RegExp(/^audio/g);
        
        var notDuplicate = true;
        
        if(files[0]){
            
            if($scope.MyGenericQ.attachment.getPath() == files[0].name){ //devo controllare anche il tipo, ma per adesso facciamo solo immagini
                notDuplicate = false;
                
            }
            
            if(notDuplicate){
                
                if($scope.MyGenericQ.questionType == 'mult'){
                    var q = $scope.MyMultipleChoiceQ.question.arrayAnswer;
                    for(var i = 0; i< q.length && notDuplicate;i++){ //controllo allegati risposte
                    
                        if(q[i].attachment != null){
                        
                            if(q[i].getAttachment().getPath() == files[0].name){
                                notDuplicate = false;
                            }
                        }
                    
                    }
                }
                else if($scope.MyGenericQ.questionType == 'mtch'){
                    var text = $scope.MyMatchingQ.questionMatch.text;
                    var answer = $scope.MyMatchingQ.questionMatch.answer;
                    
                    for(var i =0; i < text.length && notDuplicate; i++){
                        if(text[i].attachment != null){
                            if(text[i].getAttachment().getPath() == files[0].name){
                                notDuplicate = false;
                            }
                        }
                    }
                    
                    if(notDuplicate){
                        for(var j = 0; j < answer.length && notDuplicate; j++){
                            if(answer[j].attachment != null){
                                if(answer[j].getAttachment().getPath() == files[0].name){
                                    notDuplicate = false;
                                }
                            }
                        }
                    }
                }
                
                    
            }
            
            
                    
            if(!notDuplicate){
                    alert("File con lo stesso nome già presente in questa domanda");
            }
            
        }
        
        
        if (files[0] && notDuplicate){
            Upload.upload({
                url:'/api/upload/save',
                data: {file: files[0]}
            }).then(function(response){
                
            });
            
            if(isQuestion == 'question'){
                $scope.MyGenericQ.attachment.setPath(files[0].name);
                
                if(files[0].type.search(imgRegExp) != -1){ //imgRegExp.test(files[0].type) != -1
                        
                    $scope.MyGenericQ.attachment.setType('img');
                }
                else if(files[0].type.search(videoRegExp) != -1){
                    $scope.MyGenericQ.attachment.setType('vid');
                }
                else if(files[0].type.search(audioRegExp) != -1){
                    $scope.MyGenericQ.attachment.setType('aud');
                }
                
                
            }
            else if(isQuestion == 'answer'){
                
                if($scope.MyGenericQ.questionType == 'mult'){
                    $scope.MyMultipleChoiceQ.setNameAttachment(index,files[0].name);
                    
                    
                    if(files[0].type.search(imgRegExp) != -1){ //imgRegExp.test(files[0].type) != -1
                        $scope.MyMultipleChoiceQ.question.setTypeAttachment(index,'img');
                    }
                    else if(files[0].type.search(videoRegExp) != -1){
                        $scope.MyMultipleChoiceQ.question.setTypeAttachment(index,'vid');
                    }
                    else if(files[0].type.search(audioRegExp) != -1){
                        $scope.MyMultipleChoiceQ.question.setTypeAttachment(index,'aud');
                    }
                    
                }
                else if($scope.MyGenericQ.questionType == 'mtch'){
                        if($scope.MyMatchingQ.destinationAttachment == 'text'){
                            $scope.MyMatchingQ.questionMatch.text[index].setNameAttachment(files[0].name);
                            
                            if(files[0].type.search(imgRegExp) != -1){
                                $scope.MyMatchingQ.questionMatch.text[index].setTypeAttachment('img');
                            }
                            else if(files[0].type.search(videoRegExp) != -1){
                                $scope.MyMatchingQ.questionMatch.text[index].setTypeAttachment('vid');
                            }else if(files[0].type.search(audioRegExp) != -1){
                                $scope.MyMatchingQ.questionMatch.text[index].setTypeAttachment('aud');
                            }
                        }
                        else{ // answer
                            $scope.MyMatchingQ.questionMatch.answer[index].setNameAttachment(files[0].name);
                            
                            if(files[0].type.search(imgRegExp) != -1){
                                $scope.MyMatchingQ.questionMatch.answer[index].setTypeAttachment('img');
                            }
                            else if(files[0].type.search(videoRegExp) != -1){
                                $scope.MyMatchingQ.questionMatch.answer[index].setTypeAttachment('vid');
                            }
                            else if(files[0].type.search(audioRegExp) != -1){
                                $scope.MyMatchingQ.questionMatch.answer[index].setTypeAttachment('aud');
                            }
                        }
                }
            }        
            
        }
                   
    };
    
    
 
    
    $scope.resetQuestion = function(){
        
        $http.get('/api/upload/remove');
    };
 
    
    $scope.save = function(question, type){
      //salvo la domanda creata        
        
        
        
        var json = {type: type, question: question};
       
       $http.post('/api/question/save',json).success(function(response){
            $window.location.href = '/Quizzipedia/questionMgmt';          
        });
        
        
    };
    
    $scope.topicsList = [];
    $scope.loadTopics = function () {
        $http.get('/api/topic/fetch').success(function(response) {
            $scope.topicsList = response;
        });
        
    }

    $scope.loadTopics();
	
	
    
}]);








