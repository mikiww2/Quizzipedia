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
        ,default: 'requested'
        ,enum: ['requested','allowed']
    }
}, { strict: true });

userClassSchema.index({user: 1}, {unique: true});

// //get allowed students
// userClassSchema.method.getStudents = function getStudents() {
//     return this.model('').find({ role: 'student', state: 'allowed' });
// }
// 
// //get allowed teachers
// userClassSchema.method.getTeachers = function getTeachers() {
//     return this.find({ role: 'teacher', state: 'allowed' });
// }
// 
// //get user requestClass
// userClassSchema.method.getRequests = function getRequests() {
//     return this.find({ state: 'requested' });
// }

//get mail
userClassSchema.virtual('mail').get(function () {
    return this.user;
});

// //set mail, call with xxx.set('mail', 'pipppppooooo');
// userClassSchema.virtual('mail').get(function () {
//     return this.user;
// }).set(function (mail) {
//   this.set('_id', mail);
// });

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

classSchema.index({
    academicYear: -1
    ,name: 1
}, {unique: true});

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

// //class has Student, return Boolean
// classSchema.methods.hasStudent = function hasStudent(user_mail) {
//     if(this.findOne({ students: { $in: user_mail }}))
//         return true;
//     else
//         return false;
// }

// //class has Teacher, return Boolean
// classSchema.methods.hasTeacher = function hasTeacher(user_mail) {
//     if(this.findOne({ teachers: { $in: user_mail }}))
//         return true;
//     else
//         return false;
// }

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
        ,default: 'requested'
        ,enum: ['requested','allowed']
    }
}, { strict: true });

userIstitutionSchema.index({user: 1}, {unique: true});

//get mail
userIstitutionSchema.virtual('mail').get(function () {
    return this.user;
});

//set mail, call with xxx.set('mail', 'pipppppooooo');
userIstitutionSchema.virtual('mail').get(function () {
    return this.user;
}).set(function (mail) {
  this.set('_id', mail);
});

// //get allowed students
// userIstitutionSchema.methods.getStudents = function getStudents() {
//     return this.find({ role: 'student', state: 'allowed' });
// }
// 
// //get allowed teachers
// userIstitutionSchema.methods.getTeachers = function getTeachers() {
//     return this.find({ role: 'teacher', state: 'allowed' });
// }
// 
// //get user requestClass
// userIstitutionSchema.methods.getRequests = function getRequests() {
//     return this.find({ state: 'requested' });
// }

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

//find Organization with a director (scope = collection)
organisationSchema.static.findOrganisationByDirector = function findOrganisationByDirector(director_mail) {
  return this.find({ director: this.director });
}

//find Classes with a Student, return [istitution, class_year, class_name]  (scope = collection)
organisationSchema.static.findClassesWithStudent = function findClassesWithStudent(student_mail) {
    var result = { };
    
    this.find().forEach(function(institution) {
        if(institution.InstitutionhasStudent(student_mail)) {
            institution.classes.forEach(function(cls) {
                if(cls.hasStudent(student_mail))
                    result.push({
                        istitution: institution
                        , class_year: cls.academicYear
                        , class_name: cls.name
                    });
            });
        }
    });
    return result;
}

//find Organisations
organisationSchema.static.findOrganisations = function findOrganisations() {
    return this.find({ });
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

// //Institution has Student, return Boolean
// organisationSchema.methods.hasStudent = function hasStudent(user_mail) {
//     if(this.model('Organization').findOne({ students: { $in: user_mail }}))
//         return true;
//     else
//         return false;
// }
// 
// //Institution has Teacher, return Boolean
// organisationSchema.methods.hasTeacher = function hasTeacher(user_mail) {
//     if(this.model('Organization').findOne({ teachers: { $in: user_mail }}))
//         return true;
//     else
//         return false;
// }

//export
module.exports = mongoose.model('Organization', organisationSchema);
