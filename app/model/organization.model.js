/*
 * Nome del file: organization.model.js
 * Percorso: app/model/organization.model.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 * Questo file contiene la definizione del modello delle organizzazioni e classi
 * per mongo, oltre a definire alcuni metodi
 *
 * Diario delle modifiche:
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
            type: Number
            ,min: 1900
            ,max: 2050
            ,required: [true, 'academicYear is required']
        }
}, { strict: true });

classSchema.index({
    academicYear: -1
    ,name: 1
}, {unique: true});

// //students
// classSchema.virtual('students').get(function() {
//     return this.parentNode().users.find({
//         role: 'student'
//         ,state: 'allowed'
//         ,classes: { $in: [ '' ] }
//     });
// });

// //teachers
// classSchema.virtual('teachers').get(function() {
//     return this.users.find({ role: 'teacher', state: 'allowed' });
// });
//
// //classRequests
// classSchema.virtual('classRequests').get(function() {
//     return this.users.find({ state: 'requested' });
// });
//
// //class has Student, return Boolean
// classSchema.methods.hasStudent = function(userMail) {
//     return !!this.findOne({students: {$in: userMail}});
// };
//
// //class has Teacher, return Boolean
// classSchema.methods.hasTeacher = function(userMail) {
//     return !!this.findOne({teachers: {$in: userMail}});
// };
//
// //class has classRequests, return Boolean
// classSchema.methods.hasClassRequests = function(userMail) {
//     return !!this.findOne({classRequests: {$in: userMail}});
// };

//user access in class
var classAccessSchema = new Schema({
    class: {
        type: Schema.Types.ObjectId
        ,required: [true, 'class_id is required']
    }
    ,state: {
        type: String
        ,default: 'requested'
        ,enum: ['requested','allowed']
    }
}, { strict: true });

classAccessSchema.index({class: 1}, {unique: true});

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
    ,classes: [classAccessSchema]
}, { strict: true });

userIstitutionSchema.index({user: 1}, {unique: true});

//get mail
userIstitutionSchema.virtual('mail').get(function() {
    return this.user;
});

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
    ,classes: [classSchema]
    ,users: [userIstitutionSchema]
    ,topics: [String]
}, { strict: true });

organizationSchema.index({director: 1}, {unique: true});

//students
organizationSchema.virtual('students').get(function() {
    return this.users.find({ role: 'student', state: 'allowed' });
});

//teachers
organizationSchema.virtual('teachers').get(function() {
    return this.users.find({ role: 'teacher', state: 'allowed' });
});

//classRequests
organizationSchema.virtual('roleRequests').get(function() {
    return this.users.find({ state: 'requested' });
});

//Institution has Student, return Boolean
organizationSchema.methods.hasStudent = function(userMail) {
    return !!this.findOne({students: {$in: userMail}});
};

//Institution has Teacher, return Boolean
organizationSchema.methods.hasTeacher = function(userMail) {
    return !!this.findOne({teachers: {$in: userMail}});
};

//Institution has RoleRequest, return Boolean
organizationSchema.methods.hasRoleRequest = function(userMail) {
    return !!this.findOne({roleRequests: {$in: userMail}});
};

//find Organization with a director (scope = collection)
organizationSchema.statics.findOrganizationByDirector = function(directorMail) {
  return this.findOne({ director: directorMail });
};

// //find Classes with a Student, return [istitution, class_year, class_name]  (scope = collection)
// organizationSchema.statics.findClassesWithStudent = function(studentMail) {
//     var result = { };
//
//     this.find().forEach(function(institution) {
//         if(institution.hasStudent(studentMail)) {
//             institution.classes.forEach(function(cls) {
//                 if(cls.hasStudent(studentMail))
//                     result.push({
//                         istitution: institution
//                         ,class_year: cls.academicYear
//                         ,class_name: cls.name
//                     });
//             });
//         }
//     });
//     return result;
// };

//find istitutions with a User role, return [istitution_name, role(director/student/teacher)]  (scope = collection)
organizationSchema.statics.findIstitutionsWithUser = function(userMail) {
    var result = { };

    this.find().forEach(function(institution) {
        if(istitution.director == userMail)
            result.push({
                istitution_name: institution.name
                ,role : 'director'
            });
        else {
            if(institution.hasStudent(userMail)) {
                result.push({
                    istitution_name: institution.name
                    ,role: 'student'
                });
            }
            if(institution.hasTeacher(userMail)) {
                result.push({
                    istitution_name: institution.name
                    ,role: 'teacher'
                });
            }
        }
    });
    return result;
};

//find Organizations, return [organisation]
organizationSchema.statics.findOrganizations = function() {
    return this.find({ });
};

//export
module.exports = mongoose.model('Organization', organizationSchema);
