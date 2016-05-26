
// formato JSON di question =
// type = integer che indica il tipo
// text = stringa col testo della domanda
// answer = contiene le varie risposte ( da definire meglio in base al tipo di domanda )
exports.parse(question){
    var stringType = '<q?' + question.type + '#';
    var stringQuestion = question.text + '#';
    var stringAnswers = '';
    //costruzione in base al tipo
    if (question.type == 1){ // 1 = vero falso

    };
    if (question.type == 2){ // 2 = risp multipla

    };
    if (question.type == 3){ // 3 = a completamento

    };
    if (question.type == 4){ // 4 = risp aperta

    };
    if (question.type == 5){ // 5 = a collegamento

    };


};

exports.generate(qml){

};

