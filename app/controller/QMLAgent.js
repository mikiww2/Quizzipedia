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
    var attachedtype = extract(attached, '', ':');
    var attachedpath = extract(attached, ':', ':x');
    var attachedcoordX = extract(attached, ':x.', ':y');
    var attachedcoordY = attached.substr(attached.indexOf(':y.') + 3);
    return {'type': attachedtype, 'path': attachedpath, 'x': attachedcoordX, 'y': attachedcoordY};
};

exports.generate = function (question){
    var stringType = 'q?' + question.questionType + '#t#';
    //var stringQuestion = question.txt + '#a#'; // da aggiungere nelle funzioni specifiche
    var stringTextAndAnswers;

    switch (question.questionType){ // in base al tipo fa operare la funzione corrispondente nella stringa
        case 'trfs': // tipo vero/falso
            stringTextAndAnswers = generateTF(question);
            break;
        case 'mult': // tipo risp multipla
            stringTextAndAnswers = generateRM(question);
            break;
        case 'cmpl': // tipo a completamento
            stringTextAndAnswers = generateCM(question);
            break;
        case 'open': // tipo risp aperta
            stringTextAndAnswers = generateRA(question);
            break;
        case 'mtch': // tipo a collegamenti
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
        //qson = {'type': type, 'text': text, 'ans': answer};
        return qson;
    }
    else
        throw 'qml syntax error';
};

// funzioni per la generazione di stringa qml specifica per ogni tipo
{
    var generateTF = function (question) { //teoricamente ok
        var stringAttached = generateAttached(question);
        return question.title + stringAttached + '#a#' + question.ans + '#££#';
    };

    var generateRM = function (question) { // teoricamente ok
        var attached = generateAttached(question);
        var stringAnswers = '';
        for (var item of question.ans) {
            var stringAttached = generateAttached(item);
            stringAnswers = stringAnswers + item.answer + '[' + item.isTrue + ']' + stringAttached + '§';
        }
        if (stringAnswers.endsWith('§')) //elimina la ultima § dalla stringa per evitare problemi nel parser
            stringAnswers = stringAnswers.substr(0, stringAnswers.length - 1);
        return question.title + attached + '#a#' + stringAnswers + '#££#';
    };

    var generateCM = function (question) { // teoricamente ok, da testare casi particolari
        var stringTitle = '';
        for (var item of question.title) {
            if (item.type == 'txt') {
                stringTitle = stringTitle + item.value;
            }
            if (item.type == 'id') {
                stringTitle = stringTitle + '[' + item.value + ']';
            }
            stringTitle = stringTitle + '§';
        }
        var stringAnswers = '';
        for (var item of question.ans){
            if (item.text)
                stringAnswers = stringAnswers + item.text + '[' + item.id + ']§';
            if (item.attachment)
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
        return question.title + stringAttached + '#a#' + question.ans + '#££#';
    };

    var generateCL = function (question) { // da sistemare quando il form sarà funzionante
      /*  var stringAttached = generateAttached(question);
        var stringAnswers = '';
        for (var item of question.ans) {
            var stringAttached = generateAttached(item);
            stringAnswers = stringAnswers + item. + '[' + item.isTrue + ']' + stringAttached + '§';
        }
        return question.title + stringAttached + '#a#';*/
    };
}

// funzioni per il parsing del qml specifico per tipo
{
    var parserTF = function (qml) { // teoricamente ok , da testare nei casi particolari
        var qson = {'questionType': 'trfs'};
        var text = extract(qml, '#t#', '#a#');
        if (text.endsWith('}')) {  // se presente allegato nella stringa
            qson.title = extract(text, '', '{');
            qson.attachment = appendAttached(extract(text, '{', '}'));
        }
        else
            qson.title = text;
        var answer = extract(qml, '#a#', '#££#');
        qson.ans = answer;
        return qson;
    };

    var parserRM = function (qml) { // teoricamente ok, da testare nei casi particolari
        var qson = {'questionType': 'mult'};
        var text = extract(qml, '#t#', '#a#');
        if (text.endsWith('}')) {  // se presente allegato nella stringa
            qson.title = extract(text, '', '{');
            qson.attachment = appendAttached(extract(text, '{', '}'));
        }
        else
            qson.title = text;
        var answer = extract(qml, '#a#', '#££#');
        var arrayAns = answer.split('§');
        var arrayJsonAns = []; //contiene le stringhe per ogni risposta da parsare
        for (var item of arrayAns) {
            var ansTxt = extract(item, '', '['); // estrae il testo della risposta
            var ansIsTrue = extract(item, '[', ']'); // estrate la soluzione della risposta
            var jsonAnswer = {"answer": ansTxt, "isTrue": ansIsTrue};
            if (item.endsWith('}')){ // se presente allegato nella stringa
                jsonAnswer.attached = appendAttached(extract(item, '{', '}')); //estrae l'allegato della risposta
                //console.log(jsonAnswer.attached);
            }
            arrayJsonAns.push(jsonAnswer);
        };
        //console.log('prova ' + textwoattached);
        qson.ans = arrayJsonAns;
        return qson;
        };


    var parserCM = function (qml) { // teoricamente ok, da testare casi particolari
        var qson = {'questionType': 'cmpl'};
        var text = extract(qml, '#t#', '#a#');
        var arrayTitles = text.split('§');
        var arrayJsonTitle = [];
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
        qson.title = arrayJsonTitle;
        var answer = extract(qml, '#a#', '#££#');
        var arrayAnswers = answer.split('§');
        var arrayJsonAns = [];
        for (var item of arrayAnswers){
            var answerId = extract(item, '[', ']');
            var jsonAns = {'id': answerId};
            var answerValue = extract(item, '', '[');
            if (answerValue.startsWith('{') && answerValue.endsWith('}')){
                jsonAns.attachment = appendAttached(answerValue);
            }
            else
                jsonAns.text = answerValue;
            arrayJsonAns.push(jsonAns);
        }
        qson.ans = arrayJsonAns;
        return qson;
    };

    var parserRA = function (qml) { // teoricamente ok, da testare nei casi particolari
        var qson = {'questionType': 'open'};
        var text = extract(qml, '#t#', '#a#');
        if (text.endsWith('}')) {  // se presente allegato nella stringa
            qson.title = extract(text, '', '{');
            qson.attachment = appendAttached(extract(text, '{', '}'));
        }
        else
            qson.title = text;
        var answer = extract(qml, '#a#', '#££#');
        qson.ans = answer;
        return qson;
    };

    var parserCL = function (qml) { // da sistemare con form funzionante

    };
}
