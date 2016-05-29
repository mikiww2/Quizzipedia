
// formato JSON di question che serve=
// type = integer che indica il tipo
// text = stringa col testo della domanda
// answer = contiene le varie risposte ( da definire meglio in base al tipo di domanda )
exports.generate = function (question){
    var stringType = '|q?' + question.type + '#';
    var stringQuestion = question.txt + '#';
    var stringAnswers;

    switch (question.type){ // in base al tipo fa operare la funzione corrispondente nella stringa
        case '1':
            stringAnswers = question.ans + '#';
            break;
        case '2':
            stringAnswers = question.ans + '#';
            break;
        case '3':
            stringAnswers = question.ans + '#';
            break;
        case '4':
            stringAnswers = question.ans + '#';
            break;
        case '5':
            stringAnswers = question.ans + '#';
            break;
        default:
            return 'error!';
    }

    var result = stringType + stringQuestion +stringAnswers + '|';
    return result;
};

exports.parse(qml){

};



