/*
 * Nome del file: AnswerMatchingQ.js
 * Percorso: public/services/AnswerMatchingQ.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo collegamenti
 *
 * * Diario delle modifiche:
 *
 */

angular.module('QuizSolver').factory('AnswerMatchingQ',['AnswerQuestion','AnswerMatchingQElement',function(AnswerQuestion,AnswerMatchingQElement){
    
    function AnswerMatchingQ(question){
        
        AnswerQuestion.call(this,question);
        this.givenAnswer = []; //array di AnswerMatchingQElement 
        
    };
    
    AnswerMatchingQ.prototype = AnswerQuestion.prototype;
    
    AnswerMatchingQ.prototype.addAnswer = function(elem){
        this.givenAnswer.push(elem);
    };
    
    
    AnswerMatchingQ.prototype.checkMatching = function(){
        /*
        prendo la prima answer e leggo l'id, adesso vado a cercare nell'array delle risposte di question
        la risposta con quell'id e infine controllo se la risp che c'è in answer è uguale a quella che c'è 
        nell'answer di question
        
        */
        
        var error = true;
        
        for(var i = 0;i < this.givenAnswer.length && error; i++){
            var id_answer = this.givenAnswer[i].id;
            var value_answer = this.givenAnswer[i].valueAnswer;
            
            var correct_value_id = null;
            var trovato = false;
            
            var array = this.question.details.answer;
            for(var j = 0; j < array.length && !trovato; j++){
                if(array[j].attachment != null){
                    if(array[j].attachment.path == value_answer){
                        trovato = true;
                        correct_value_id = array[j].id;
                    }
                }
                else if(array[j].txt != null){
                    if(array[j].txt == value_answer){
                        trovato = true;
                        correct_value_id = array[j].id;
                    }
                    
                }
            }
            /*for(var j = 0; j < array.length && !trovato; j++){
                if(array[j].id == id_answer){
                    trovato = true;
                    if(array[j].attachment != null){
                        correct_value_answer = array[j].attachment.getPath();
                    }
                    else if(array[j].txt != null){
                        correct_value_answer = array[j].txt;
                    }
                }
            }*/
            if(id_answer != correct_value_id){
                error = false;
            }
        }
        
        return error;
        
        
    };
    
    AnswerMatchingQ.prototype.setGivenAnswerColumn = function(answer){ //answer:AnswerColumn
    
        this.givenAnswerColumn = answer;
    };
    
    AnswerMatchingQ.prototype.getGivenAnswerColumn = function(){
      
        return this.givenAnswerColumn;
    };
    
    return AnswerMatchingQ;
    
    
    
}]);