
// formato JSON di question che serve=
// type = integer che indica il tipo
// text = stringa col testo della domanda
// answer = contiene le varie risposte ( da definire meglio in base al tipo di domanda )
exports.generate = function (question){
    var stringType = '|q?' + question.type + '#';
    var stringQuestion = question.txt + '#';
    var stringAnswers;

    switch (question.type){ // in base al tipo fa operare la funzione corrispondente nella stringa
        case '1': // tipo vero/falso
            stringAnswers = answerTF(question.ans);
            break;
        case '2': // tipo risp multipla
            stringAnswers = answerRM(question.ans);
            break;
        case '3': // tipo a completamento
            stringAnswers = answerCM(question.ans);
            break;
        case '4': // tipo risp aperta
            stringAnswers = answerRA(question.ans);
            break;
        case '5': // tipo a collegamenti
            stringAnswers = answerCL(question.ans);
            break;

        // INSERIRE QUI I CASE PER LE NUOVE DOMANDE

        default:
            return 'error!';
    }

    var result = stringType + stringQuestion + stringAnswers + '|';
    return result;
};

exports.parse(qml){

};

// funzioni per la creazione di stringa di risposta specifica per ogni tipo

var answerTF = function (answer) {
    return answer + '#';
}

var answerRM = function (answer) {
    return answer + '#';
}

var answerCM = function (answer) {
    return answer + '#';
}

var answerRA = function (answer) {
    return answer + '#';
}

var answerCL = function (answer) {
    return answer + '#';
}