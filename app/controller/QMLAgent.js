/*
 * Nome del file: QMLAgent.js
 * Percorso: app/controller/QMLAgent.js
 * Autore: Vault-Tech
 * Data creazione: 02.05.2016
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller che contiene i metodi per generazione e parsing QML <-> JSON
 *
 * * Diario delle modifiche:
 *  09.05.2016 Stesura metodo generate e parse - Filippo Tesser
 *  12.05.2016 Stesura funzioni specifiche per tipo - Filippo Tesser
 *  19.05.2016 Stesura funzioni extract, generateAttached e appendAttached - Filippo Tesser
 *  21.05.2016 Inserita gestione allegati per ogni funzione - Filippo Tesser
 *
 */

var pathAtt = require('../../config/upload').pathFiles;

var extract = function(string, start, end){ // estrae una data sottostringa tramite sentinelle, usare con attenzione
    var lenght = start.length;
    return string.slice(string.indexOf(start) + lenght, string.indexOf(end));
};

var generateAttached = function (item) { // funzione che gestisce gli allegati del generator
    if (item.attachment) {
        var attachedtype = item.attachment.type + ':';
        var attachedpath = item.attachment.path;
        var attachedcoord = '';
        if (item.attachment.x && item.attachment.y){
            var attachedcoordX = ':x.' + item.attachment.x;
            var attachedcoordY = ':y.' + item.attachment.y;
            attachedcoord = attachedcoordX + attachedcoordY;
        }
        return '{' + attachedtype + attachedpath + attachedcoord + '}';
    }
    else return '';
};

var appendAttached = function (attached){ // funzione che gestisce gli allegati del parser
    var attachedtype = extract(attached, '', ':'),
        attachedpath = pathAtt + '/' + attached.substr(attached.indexOf(':') + 1),
        attachedcoordX = null,
        attachedcoordY = null;

    if (attached.includes(':x.') && attached.includes(':y.')) {
        attachedcoordX = extract(attached, ':x.', ':y');
        attachedcoordY = attached.substr(attached.indexOf(':y.') + 3);
        attachedpath = pathAtt + '/' + extract(attached, ':', ':x');
    }
    
    return {'type': attachedtype, 'path': attachedpath, 'x': attachedcoordX, 'y': attachedcoordY};
};

exports.generate = function (question){
    var stringType = 'q?' + question.type + '#t#';
    var stringTextAndAnswers;

    switch (question.type){ // in base al tipo fa operare la funzione corrispondente nella stringa
        case 'trfs': // tipo vero/falso
            stringTextAndAnswers = generateTF(question.question);
            break;
        case 'mult': // tipo risp multipla
            stringTextAndAnswers = generateRM(question.question);
            break;
        case 'cmpl': // tipo a completamento
            stringTextAndAnswers = generateCM(question.question);
            break;
        case 'open': // tipo risp aperta
            stringTextAndAnswers = generateRA(question.question);
            break;
        case 'mtch': // tipo a collegamenti
            stringTextAndAnswers = generateCL(question.question);
            break;

        // INSERIRE QUI I CASE PER LE NUOVE DOMANDE

        default:
            return 'error! question type not supported by generator';
    }
    var result = '|' + stringType + stringTextAndAnswers + '|';
    return result;
};

exports.parse = function (qml){
    if (qml.startsWith('|') && qml.endsWith('|') && qml.includes('#t#') && qml.includes('#a#') && qml.includes('#££#')) {
        var type = extract(qml, 'q?', '#t#');
        var qson; //creazione json vuoto
        switch (type){ // in base al tipo fa operare la funzione corrispondente nella stringa
            case 'trfs': // tipo vero/falso
                qson = parserTF(qml);
                break;
            case 'mult': // tipo risp multipla
                qson = parserRM(qml);
                break;
            case 'cmpl': // tipo a completamento
                qson = parserCM(qml);
                break;
            case 'open': // tipo risp aperta
                qson = parserRA(qml);
                break;
            case 'mtch': // tipo a collegamenti
                qson = parserCL(qml);
                break;

            // INSERIRE QUI I CASE PER LE NUOVE DOMANDE

            default:
                return 'error! question type not supported by parser';
        }
        return qson;
    }
    else
        throw 'qml syntax error';
};

// funzioni per la generazione di stringa qml specifica per ogni tipo
{
    var generateTF = function (question) { //teoricamente ok
        var stringAttached = generateAttached(question);
        return question.description + stringAttached + '#a#' + question.correctAnswer + '#££#';
    };

    var generateRM = function (question) { // teoricamente ok
        var attached = generateAttached(question);
        var stringAnswers = '';
        for (var item of question.arrayAnswer) {
            var txt = '';
            if (item.textAnswer)
                txt = item.textAnswer;
            var stringAttached = generateAttached(item);
            stringAnswers = stringAnswers + txt + stringAttached + '[' + item.isTrue + ']' + '§';
        }
        if (stringAnswers.endsWith('§')) //elimina la ultima § dalla stringa per evitare problemi nel parser
            stringAnswers = stringAnswers.substr(0, stringAnswers.length - 1);
        return question.description + attached + '#a#' + stringAnswers + '#££#';
    };

    var generateCM = function (question) { // teoricamente ok, da testare casi particolari
        var stringTitle = '';
        for (var item of question.text) {
            if (item.type == 'txt') {
                stringTitle = stringTitle + item.value;
            }
            if (item.type == 'id') {
                stringTitle = stringTitle + '[' + item.value + ']';
            }
            stringTitle = stringTitle + '§';
        }
        var stringAnswers = '';
        for (var item of question.answer){
            if (item.text) // se la risposta è testuale
                stringAnswers = stringAnswers + item.text + '[' + item.id + ']§';
            if (item.attachment) // se la risposta è un media
                stringAnswers = stringAnswers + generateAttached(item) + '[' + item.id + ']§';
        }
        if (stringAnswers.endsWith('§')) //elimina la ultima § dalla stringa per evitare problemi nel parser
            stringAnswers = stringAnswers.substr(0, stringAnswers.length - 1);
        if (stringTitle.endsWith('§')) //elimina la ultima § dalla stringa per evitare problemi nel parser
            stringTitle = stringTitle.substr(0, stringTitle.length - 1);
        return stringTitle + '#a#' + stringAnswers + '#££#';
    };

    var generateRA = function (question) {  // teoricamente ok
        var stringAttached = generateAttached(question);
        return question.description + stringAttached + '#a#' + question.correctAnswer + '#££#';
    };

    var generateCL = function (question) { // da sistemare quando il form sarà comprensibile
        var stringTitle = '';
        for (var item of question.text) {
            var txt = '';
            if (item.txt)
                txt = item.txt;
            var stringAttached = generateAttached(item);
            stringTitle = stringTitle + txt + stringAttached + '[' + item.id + ']' + '§';
        }
        if (stringTitle.endsWith('§')) //elimina la ultima § dalla stringa per evitare problemi nel parser
            stringTitle = stringTitle.substr(0, stringTitle.length - 1);
        var stringAnswers = '';
        for (var item of question.answer){
            var txt = '';
            if (item.txt)
                txt = item.txt;
            var stringAttached = generateAttached(item);
            stringAnswers = stringAnswers + txt + stringAttached + '[' + item.id + ']' + '§';
        }
        if (stringAnswers.endsWith('§')) //elimina la ultima § dalla stringa per evitare problemi nel parser
            stringAnswers = stringAnswers.substr(0, stringAnswers.length - 1);
        return stringTitle + '#a#' + stringAnswers + '#££#';
    };
}

// funzioni per il parsing del qml specifico per tipo
{
    var parserTF = function (qml) { // teoricamente ok , da testare nei casi particolari
        var qson = {'type': 'trfs'};
        var question = {}; //creazione json vuoto
        var text = extract(qml, '#t#', '#a#'); //estrazione stringa di domanda
        if (text.includes('{') && text.endsWith('}')) {  // se presente allegato nella stringa
            question.title = extract(text, '', '{');
            console.log(extract(text, '{', '}'));
            question.questionAttachment = appendAttached(extract(text, '{', '}'));
        }
        else {
            question.title = text;
            question.questionAttachment = null;
        }
        var answer = extract(qml, '#a#', '#££#');
        question.correctAnswer = answer;
        qson.question = question;
        return qson;
    };

    var parserRM = function (qml) { // teoricamente ok, da testare nei casi particolari
        var qson = {'type': 'mult'};
        var question = {};  //creazione json vuoto
        var text = extract(qml, '#t#', '#a#'); //estrazione stringa di domanda
        if (text.includes('{') && text.endsWith('}')) {  // se presente allegato nella stringa
            question.title = extract(text, '', '{');
            question.questionAttachment = appendAttached(extract(text, '{', '}'));
        }
        else { //se non presente allegato
            question.title = text;
            question.questionAttachment = null;
        }
        var answer = extract(qml, '#a#', '#££#'); //estrae le risposte
        var arrayAns = answer.split('§'); //array di stringhe delle risposte
        var arrayJsonAns = []; //conterrà i json delle risposte
        for (var item of arrayAns) {
            var isTrue = extract(item, '[', ']');
            if (item.includes('{') && item.includes('}')) {
                arrayJsonAns.push({'attachment': appendAttached(extract(item, '{', '}')), 'isTrue': isTrue, 'textAnswer': null});
            }
            else{
                var txt = extract(item, '', '[');
                arrayJsonAns.push({'textAnswer': txt, 'isTrue': isTrue, 'attachment': null});
            }
        }
        question.arrayAnswer = arrayJsonAns;
        qson.question = question;
        return qson;
        };

    var parserCM = function (qml) { // teoricamente ok, da testare casi particolari
        var qson = {'type': 'cmpl'};
        var question = {}; //creazione json vuoto
        var text = extract(qml, '#t#', '#a#'); // estrae il testo della  domanda
        var arrayTitles = text.split('§'); //array che contiene le stringhe delle risposte
        var arrayJsonTitle = []; //conterrà i json delle risposte
        for (var item of arrayTitles){
            var jsonTitle;
            if (item.startsWith('[') && item.endsWith(']')){
                jsonTitle = {'type': 'id', 'value': extract(item, '[', ']')};
            }
            else {
                jsonTitle = {'type': 'txt', 'value': item};
            }
            arrayJsonTitle.push(jsonTitle);
        }
        var answer = extract(qml, '#a#', '#££#'); //estrae la stringa delle risposte
        var arrayAnswers = answer.split('§'); //array che contiene le stringhe delle risposte
        var arrayJsonAns = []; //conterrà i json delle risposte
        for (var item of arrayAnswers){
            var answerId = extract(item, '[', ']');
            var jsonAns = {'id': answerId};
            var answerValue = extract(item, '', '[');
            if (answerValue.startsWith('{') && answerValue.endsWith('}')){ //se presente allegato
                jsonAns.attachment = appendAttached(extract(answerValue, '{', '}'));
            }
            else // se non presente allegato
                jsonAns.text = answerValue;
            arrayJsonAns.push(jsonAns);
        }
        question.text = arrayJsonTitle;
        question.answer = arrayJsonAns;
        qson.question = question;
        return qson;
    };

    var parserRA = function (qml) { // teoricamente ok, da testare nei casi particolari
        var qson = {'type': 'open'};
        var question = {}; //creazione json vuoto
        var text = extract(qml, '#t#', '#a#'); //estrae la stringa della domanda
        if (text.includes('{') && text.endsWith('}')) {  // se presente allegato nella stringa
            question.title = extract(text, '', '{');
            question.questionAttachment = appendAttached(extract(text, '{', '}'));
        }
        else { // se non presente allegato
            question.title = text;
            question.questionAttachment = null;
        }
        question.correctAnswer = extract(qml, '#a#', '#££#');
        qson.question = question;
        return qson;
    };

    var parserCL = function (qml) { // manca gestione allegati
        var qson = {'type': 'mtch'};
        var question = {}; //creazione json vuoto
        var text = extract(qml, '#t#', '#a#'); //estrae la stringa della domanda
        var arrayTitles = text.split('§'); //array che contiene le stringhe delle risposte
        var arrayJsonTitle = []; //conterrà i json delle risposte
        for (var item of arrayTitles){
            var id = extract(item, '[', ']');
            if (item.includes('{') && item.includes('}')) {
                arrayJsonTitle.push({'attachment': appendAttached(extract(item, '{', '}')), 'id': id, 'txt': null});
            }
            else{
                var txt = extract(item, '', '[');
                arrayJsonTitle.push({'txt': txt, 'id': id, 'attachment': null});
            }
        }
        var answer = extract(qml, '#a#', '#££#'); //estrae la stringa delle risposte
        var arrayAnswers = answer.split('§'); //array che contiene le stringhe delle risposte
        var arrayJsonAns = []; //conterrà i json delle risposte
        for (var item of arrayAnswers){
            var id = extract(item, '[', ']');
            if (item.includes('{') && item.includes('}')) {
                arrayJsonAns.push({'attachment': appendAttached(extract(item, '{', '}')), 'id': id, 'txt': null});
            }
            else{
                var txt = extract(item, '', '[');
                arrayJsonAns.push({'txt': txt, 'id': id, 'attachment': null});
            }
        }
        question.text = arrayJsonTitle;
        question.answer = arrayJsonAns;
        qson.question = question;
        return qson;
    };
}
