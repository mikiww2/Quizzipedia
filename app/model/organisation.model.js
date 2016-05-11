'use strict'; //will load js in strict mode

//define the model for Organization using organisationSchema
// IN var mongoose = require('mongoose');
//OUT mongoose.model('Organization', organisationSchema);

// use me like this
// var Organization = require('./organization.model', { root: __dirname })(mongoose);
module.exports = function(mongoose) {

    var Schema = mongoose.Schema;

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
                type: Number
                ,min: 1900
                ,max: 2050
                ,required: [true, 'academicYear is required']
            }
            ,teachers: [String] //contiene gli ingegnanti autorizzati nella classe
            ,students: [String] //contiene gli studenti autorizzati nella classe
            ,classList: [String] //contiene gli utenti che hanno richiesto di essere autorizzati
    }, { strict: true });

    classSchema.index({academicYear: -1, name: 1}, {unique: true});
    
    classSchema.statics.findClass = function (name, year, cb) {
        return this.find({ name: name, academicYear: year }, cb);
    }
    
    var roleRequestSchema = new Schema({
        user: {
            type: String
            ,required: [true, 'user is required']
        }
        ,role: {
            type: String
            ,required: [true, 'role is required']
            ,enum: ['student','teacher']
        }
    }, { strict: true });
    
    roleRequestSchema.index({user: 1, role: 1}, {unique: true});
    
    var organisationSchema = new Schema({
        creationDate: {
            type: Date
            ,required: [true, 'date is required']
        }
        ,name: {
            type: String
            ,trim: true
            ,required: [true, 'name is required']
        }
        ,classes: [classSchema]
        ,owner: {
            type: String
            ,required: [true, 'owner is required']
        }
        ,teachers: [String] //contiene gli ingegnanti autorizzati nella istituzione
        ,students: [String] //contiene gli studenti autorizzati nella istituzione
        ,roleList: [roleRequestSchema] //contiene gli utenti che hanno richiesto di essere autorizzati
    }, { strict: true });

    return  mongoose.model('Organization', organisationSchema);
}