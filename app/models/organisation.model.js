 
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
            ,teachers: [String]
            ,students: [String]
    }, { strict: true });

    classSchema.index({academicYear: -1, name: 1}, {unique: true});
    
    classSchema.statics.findClass = function (name, year, cb) {
        return this.find({ name: name, academicYear: year }, cb);
    }
    
    var organisationSchema = new Schema({
        _id: { // use with a getNextSequence() sequence for auto increment index
            type: Number
            ,required: [true, 'index is required']
        }
        ,creationDate: {
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
            ,required: [true, 'a Director user is required']
        }
    }, { strict: true });

    return  mongoose.model('Organization', organisationSchema);
}