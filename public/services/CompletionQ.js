/*
 * Nome del file: CompletationQ.js
 * Percorso: public/services/CompletationQ.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo completamento testo
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').factory('CompletionQ',['GenericQuestion','TextCompletion','AnswerCompletion',function(GenericQuestion,TextCompletion,AnswerCompletion){
    
    
    /* il testo della domanda deve essere un array con questi json dentro 
    {'type': 'txt/id', 'value': 'blocco di testo della domanda se è tipo txt/ id della risposta se tipo id'}

    la risposta è un array con dentro json fatti cosi
    {'text': 'possibile risposta', 'id': 'id che indica il buco dove sarebbe corretta'}

     ti allego un esempio per capirti
       title: 
   [ { type: 'txt', value: 'napoleone è nato nel ' },
     { type: 'id', value: '1' },
     { type: 'txt', value: '. Nel ' },
     { type: 'id', value: '2' },
     { type: 'txt', value: 'è stato esiliato nell\' isola d\'' },
     { type: 'id', value: '3' } ],
  ans: 
   [ { text: '1800', id: '1' },
     { text: '1850', id: '2' },
     { attachment: [Object], id: '3' } ] }

    per il type di question e le altre informazioni rimane tutto uguale come per le altre tipologie di domanda

    */
    
    
    
    function CompletionQ(){
      
        GenericQuestion.call(this);
        this.text = []; //text: TextCompletion[]
        this.answer = []; //answer: AnswerCompletion[] 
        
    };
    
    CompletionQ.prototype = GenericQuestion.prototype;
    
    
    CompletionQ.prototype.insertText = function(text){
        var x = new TextCompletion();
        x.setType('txt');
        x.setValue(text);
        
        this.text.push(x);
    };
    
    CompletionQ.prototype.insertHole = function(numberHole){
      
        var x = new TextCompletion();
        x.setType('id');
        x.setValue(numberHole);
        
        this.text.push(x);
    };
    
    CompletionQ.prototype.insertAnswer = function(text,numberHole){
        
        var x = new AnswerCompletion();
        x.setText(text);
        x.setId(numberHole);
        
        this.answer.push(x);
        
    };
    
    CompletionQ.prototype.removeTextElement = function(index){
      
        if(index>=0 && index < this.text.length){
            this.text.splice(index,1);
        }
        
    };
    
    CompletionQ.prototype.removeSomeTextElements = function(index,nElements){
      
        if((index>=0 && index < this.text.length) && (nElements>= 0 && nElements <= this.text.length)){
            this.text.splice(index,nElements);
        }
        
    };
    
    CompletionQ.prototype.removeAns = function(index){
      
        if(index>= 0 && index < this.answer.length){
            this.answer.splice(index,1);
        }
    };
    
    CompletionQ.prototype.getTextElement = function(index){
        
        if(index>= 0 && index < this.text.length){
            return this.text[index].getValue();
        }
        
    };
    
    CompletionQ.prototype.getTypeTextElement = function(index){
      
        return this.text[index].getType();
    };
    
    CompletionQ.prototype.getAnswerElement = function(idHole){ //restituisce la risposta dove this.id == idHole
        
        for(var i = 0; i< this.answer.length;i++){
            if(this.answer[i].getId() == idHole){
                return this.answer[i].getText();
            }
        }
        
        return '';
        
    };
    
    CompletionQ.prototype.checkAnswer = function(valueHole){ //verifica che ogni answer sia associata a un solo buco
        var conta = 0;
        for(var i =0; i < this.answer.length; i++){
            
            if(this.answer[i].getId() == valueHole){
                conta = conta + 1;
            }
        }
        
        return conta; //se conta == 0 c'è un buco che non è associato a una answer, conta > 1 ci sono due answer associata allo stesso buco, se conta == 1 tutto ok 
        
    };
    
    CompletionQ.prototype.getSizeText = function(){
        return this.text.length;
    };
    
    CompletionQ.prototype.getSizeAnswer = function(){
        return this.answer.length;
    };
    
    return CompletionQ;
    
}]);