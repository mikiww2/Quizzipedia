'use strict';

//declare required
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//user in class
var userClassSchema = new Schema({
    user: {
        type: String
        ,required: [true, 'user is required']
    }
    ,role: {
        type: String
        ,required: [true, 'role is required']
        ,enum: ['student','teacher']
    }
    ,state: {
        type: String
        ,default: 'request'
        ,enum: ['request','allowed']
    }
}, { strict: true });

userClassSchema.index({user: 1}, {unique: true});

//get allowed students
userClassSchema.statics.getStudents = function () {
    return this.find({ role: 'student', state: 'allowed' }, 'user');
}

//get allowed teachers
userClassSchema.statics.getTeachers = function () {
    return this.find({ role: 'teacher', state: 'allowed' }, 'user');
}

//get user requestClass
userClassSchema.statics.getRequests = function () {
    return this.find({ state: 'request' }, ['user', 'role']);
}

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
            type: Number
            ,min: 1900
            ,max: 2050
            ,required: [true, 'academicYear is required']
        }
        ,users: [userClassSchema]
}, { strict: true });

classSchema.index({academicYear: -1, name: 1}, {unique: true});

classSchema.statics.findClass = function (name, year) {
    return this.find({ name: name, academicYear: year });
}

//students
classSchema.virtual('students').get(function () {
    return this.users.getStudents();
});

//teachers
classSchema.virtual('teachers').get(function () {
    return this.users.getTeachers();
});

//classRequests
classSchema.virtual('classRequests').get(function () {
    return this.users.getRequests();
});

//user in institution
var userIstitutionSchema = new Schema({
    user: {
        type: String
        ,required: [true, 'user is required']
    }
    ,role: {
        type: String
        ,required: [true, 'role is required']
        ,enum: ['student','teacher']
    }
    ,message: String
    ,state: {
        type: String
        ,default: 'request'
        ,enum: ['request','allowed']
    }
}, { strict: true });

userIstitutionSchema.index({user: 1}, {unique: true});

//get allowed students
userIstitutionSchema.statics.getStudents = function () {
    return this.find({ role: 'student', state: 'allowed' }, 'user');
}

//get allowed teachers
userIstitutionSchema.statics.getTeachers = function () {
    return this.find({ role: 'teacher', state: 'allowed' }, 'user');
}

//get user requestClass
userIstitutionSchema.statics.getRequests = function () {
    return this.find({ state: 'request' }, ['user', 'role', 'message']);
}

//organisation
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
    ,director: {
        type: String
        ,required: [true, 'director is required and unique']
    }
    ,classes: [classSchema]
    ,users: [userIstitutionSchema]
    ,topics: [String]
}, { strict: true });

organisationSchema.index({director: 1}, {unique: true});

//get Organization with a director
organisationSchema.methods.findOrganisationByDirector = function (director) {
  return this.model('Organization').find({ director: this.director });
}

//get class
organisationSchema.methods.findClass = function (istitution, name, year) {
    return this.find({ _id: istitution }).classes.findClass(name, year);
}

//students
organisationSchema.virtual('students').get(function () {
    return this.users.getStudents();
});

//teachers
organisationSchema.virtual('teachers').get(function () {
    return this.users.getTeachers();
});

//classRequests
organisationSchema.virtual('roleRequests').get(function () {
    return this.users.getRequests();
});

//export
module.exports = mongoose.model('Organization', organisationSchema);
