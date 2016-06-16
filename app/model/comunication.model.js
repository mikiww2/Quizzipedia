/*
 * Nome del file: comunications.model.js
 * Percorso: app/model/comunications.model.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Model che rappresenta i topic nel database
 *
 * * Diario delle modifiche:
 *
 */

'use strict';

//declare required
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//topic
var comunicationSchema = new Schema({
    email: {
        type: String
        ,required: [true, 'email is required']
    },
    message: {
        type: String
        ,required: [true, 'message is required']
    }
}, { strict: true });

//comunicationSchema.index({ email: 1 }, { unique: true, sparse: true });

//export
module.exports = mongoose.model('Comunication', comunicationSchema); 
