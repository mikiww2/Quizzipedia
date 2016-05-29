
// formato JSON di question che serve=
// type = integer che indica il tipo (manca dal form )
// text = stringa col testo della domanda (title)
// answer = contiene le varie risposte ( da definire meglio in base al tipo di domanda, manca)
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
    if (qml.startsWith('|') && qml.endsWith('|')) {
        var type = qml.charAt(3);
        var text;
        var answer;

        var qson = {'type': type};
        return qson;
    }
    else
        throw 'qml syntax error';
};

// funzioni per la creazione di stringa di risposta specifica per ogni tipo

var answerTF = function (answer) { //teoricamente ok
    return answer + '#';
}

var answerRM = function (answer) { // da sistemare quando il form sarà funzionante
    var stringAnswers = '';
    for (var item of answer)
        stringAnswers = '§' + stringAnswers + item;
    return stringAnswers;
}

var answerCM = function (answer) { // da sistemare quando il form sarà funzionante
    return answer + '#';
}

var answerRA = function (answer) {  // teoricamente ok
    return answer + '#';
}

var answerCL = function (answer) { // da sistemare quando il form sarà funzionante
    return answer + '#';
}