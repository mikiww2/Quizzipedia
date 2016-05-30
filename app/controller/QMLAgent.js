/*
 * Nome del file: QMLAgent.js
 * Percorso: app/controller/QMLAgent.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 * Questo file contiene i metodi per generazione e parsing QML <-> JSON
 *
 * * Diario delle modifiche:
 *
 */

// formato JSON di question attualmente funzionante =
// type = integer che indica il tipo (manca dal form )
// txt = stringa col testo della domanda (title)
// txtattached = json con campi type, path, x, y per gli allegati della domanda
// ans = contiene le varie risposte ( da definire meglio in base al tipo di domanda, manca). array ?

var extract = function(string, start, end){ // estrae una data sottostringa tramite sentinelle, usare con attenzione
    var lenght = start.length;
    return string.slice(string.indexOf(start) + lenght, string.indexOf(end));
};

var generateAttached = function (question) { // funzione che gestisce gli allegati del generator
    if (question.txtattached) {
        var attachedtype = question.txtattached.type + ':';
        var attachedpath = question.txtattached.path;
        var attachedcoord = '';
        if (question.txtattached.x && question.txtattached.y){
            var attachedcoordX = ':x.' + question.txtattached.x;
            var attachedcoordY = ':y.' + question.txtattached.y;
            attachedcoord = attachedcoordX + attachedcoordY;
        }
        return '{' + attachedtype + question.txtattached.path + attachedcoord + '}';
    }
    else return '';
};

var appendAttached = function (attached){ // funzione che gestisce gli allegati del parser
    var attachedtype = extract(attached, '', ':');
    var attachedpath = extract(attached, ':', ':x');
    var attachedcoordX = extract(attached, ':x.', ':y');
    var attachedcoordY = attached.substr(attached.indexOf(':y.') + 3);
    return {'type': attachedtype, 'path': attachedpath, 'x': attachedcoordX, 'y': attachedcoordY};
};

exports.generate = function (question){
    var stringType = 'q?' + question.type + '#t#';
    //var stringQuestion = question.txt + '#a#'; // da aggiungere nelle funzioni specifiche
    var stringTextAndAnswers;

    switch (question.type){ // in base al tipo fa operare la funzione corrispondente nella stringa
        case '1': // tipo vero/falso
            stringTextAndAnswers = generateTF(question);
            break;
        case '2': // tipo risp multipla
            stringTextAndAnswers = generateRM(question);
            break;
        case '3': // tipo a completamento
            stringTextAndAnswers = generateCM(question);
            break;
        case '4': // tipo risp aperta
            stringTextAndAnswers = generateRA(question);
            break;
        case '5': // tipo a collegamenti
            stringTextAndAnswers = generateCL(question);
            break;

        // INSERIRE QUI I CASE PER LE NUOVE DOMANDE

        default:
            return 'error! question type not supported by generator';
    }
    var result = '|' + stringType + stringTextAndAnswers + '|';
    return result;
};

exports.parse = function (qml){
    if (qml.startsWith('|') && qml.endsWith('|')) {
        var type = extract(qml, 'q?', '#t#');
        var qson;
        switch (type){ // in base al tipo fa operare la funzione corrispondente nella stringa
            case '1': // tipo vero/falso
                qson = parserTF(qml);
                break;
            case '2': // tipo risp multipla

                break;
            case '3': // tipo a completamento

                break;
            case '4': // tipo risp aperta
                qson = parserRA(qml);
                break;
            case '5': // tipo a collegamenti

                break;

            // INSERIRE QUI I CASE PER LE NUOVE DOMANDE

            default:
                return 'error! question type not supported by parser';
        }
        //qson = {'type': type, 'text': text, 'ans': answer};
        return qson;
    }
    else
        throw 'qml syntax error';
};

// funzioni per la generazione di stringa di risposta specifica per ogni tipo

var generateTF = function (question) { //teoricamente ok
    var attached = generateAttached(question);
    return question.txt + attached + '#a#' + question.ans + '#e#';
};

var generateRM = function (question) { // da sistemare quando il form sarà funzionante
    var stringAnswers = '';
    for (var item of question.ans)
        stringAnswers = '§' + stringAnswers + item;
    return stringAnswers;
};

var generateCM = function (question) { // da sistemare quando il form sarà funzionante
    return question.ans + '#';
};

var generateRA = function (question) {  // teoricamente ok
    var attached = generateAttached(question);
    return question.txt + attached + '#a#' + question.ans + '#e#';
};

var generateCL = function (question) { // da sistemare quando il form sarà funzionante
    return question.ans + '#';
};

// funzioni per il parsing del qml specifico per tipo

var parserTF = function (qml) { // teoricamente ok
    var type = extract(qml, 'q?', '#t#');
    var text = extract(qml, '#t#', '#a#');
    var attached = extract(text, '{', '}');
    var textwoattached = extract(text, '', '{');
    var answer = extract(qml, '#a#', '#e#');
    return {
        'type': type,
        'txt': textwoattached,
       // 'text': attached,
        'txtattached': appendAttached(attached),
        'ans': answer};
};

var parserRM = function (qml) { // da sistemare con form funzionante

};

var parserCM = function (qml) { // // da sistemare con form funzionante

};

var parserRA = function (qml) { // teoricamente ok
    var type = qml.charAt(qml.indexOf('q?')+2);
    var text = extract(qml, '#t#', '#a#');
    var answer = extract(qml, '#a#', '#e#');
    return {'type': type, 'txt': text, 'ans': answer};
};

var parserCL = function (qml) { // da sistemare con form funzionante

};