/*
 * Nome del file: topic.model.js
 * Percorso: app/model/topic.model.js
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
var topicSchema = new Schema({
    name: {
        type: String
        ,required: [true, 'name is required']
    }
}, { strict: true });

topicSchema.index({ name: 1 }, { unique: true, sparse: true });

//export
module.exports = mongoose.model('Topic', topicSchema); 
