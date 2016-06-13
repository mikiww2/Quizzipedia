/*
 * Nome del file: request.model.js
 * Percorso: app/model/request.model.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Model che rappresenta le richieste effettuate al SuperAdmin
 *
 * * Diario delle modifiche:
 *
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
    
    author: {
        type: String
        ,required: [true, 'author is required']
    }
    ,requestText: {
        type: String
        ,required: [true, 'a request must be submitted']
    } 
}, { strict: true });

module.exports = mongoose.model('Request', requestSchema);