/*
 * Nome del file: organization.model.js
 * Percorso: app/model/organization.model.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Model che rappresenta le organizzazioni e le classi nel database e vari metodi associati
 *
 * * Diario delle modifiche:
 *
 */
 
'use strict';

//declare required
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//class
var classSchema = new Schema({
        description: {
            type: String
            ,trim: true
            ,required: [true, 'description is required']
        }
        ,name: {
            type: String
            ,trim: true
            ,required: [true, 'name is required']
        }
        ,academicYear: {
            type: String
            ,trim: true
            ,required: [true, 'academicYear is required']
        }
}, { strict: true });

classSchema.index({
    academicYear: -1
    ,name: 1
}, { unique: true, sparse: true});

//user access in class
var classAccessSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
        ,required: [true, 'class_id is required']
    }
    ,state: {
        type: String
        ,default: 'requested'
        ,enum: ['requested','allowed']
    }
}, { strict: true });

classAccessSchema.index({class: 1}, {unique: true, sparse: true });

//user in institution
var userInstitutionSchema = new Schema({
    user: {
        type: String
        ,required: [true, 'user is required']
    }
    ,role: {
        type: String
        ,required: [true, 'role is required']
        ,enum: ['student','teacher']
    }
    ,message: {
        type: String
        ,required: false
    }
    ,state: {
        type: String
        ,default: 'requested'
        ,enum: ['requested','allowed']
    }
    ,classes: {
        type: [classAccessSchema]
        ,required: false
    }
}, { strict: true });

//userInstitutionSchema.index({ user: 1 }, { unique: true, sparse: true });

//organization
var organizationSchema = new Schema({
    creationDate: {
        type: Date
        ,required: [true, 'date is required']
    }
    ,name: {
        type: String
        ,trim: true
        ,required: [true, 'name is required']
    }
    ,director: {
        type: String
        ,required: [true, 'director is required and unique']
    }
    ,classes: {
        type: [classSchema]
        ,required: false
    }
    ,users: {
        type: [userInstitutionSchema]
        ,required: false
    }
    ,topics: {
        type: [String]
        ,required: false
    }
}, { strict: true });

organizationSchema.index({ director: 1 }, { unique: true, sparse: true });

organizationSchema.index({ name: 1 }, { unique: true, sparse: true });

//export
module.exports = mongoose.model('Organization', organizationSchema);
