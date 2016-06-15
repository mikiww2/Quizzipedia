/*
 * Nome del file: user.model.js
 * Percorso: app/model/user.model.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Model che rappresenta un utente e i metodi di controllo password e recupero mail
 *
 * * Diario delle modifiche:
 *
 */

'use strict'; //will load js in strict mode

//declare required
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//user
var userSchema = new Schema({
    _id: { // email
        type: String
        ,lowercase: true
        ,trim: true
        ,match: [/.+\@.+\..+/, 'Please fill a valid mail address, it\'s used like a index']
    }
    ,firstName: {
        type: String
        ,trim: true
        ,required: [true, 'firstName is required']
    }
    ,lastName: {
        type: String
        ,trim: true
        ,required: [true, 'lastName is required']
    }
    ,password: {
        type: String
        ,required: [true, 'password is required']
    }
    ,tmpPassword: {
        type: String
        ,required: false
    }
}, { strict: true });

//get mail
userSchema.methods.getMail = function() {
    return this._id;
};

//check user password
userSchema.methods.checkPassword = function(password) {
    return password == this.password;
};

//export
module.exports = mongoose.model('User', userSchema);