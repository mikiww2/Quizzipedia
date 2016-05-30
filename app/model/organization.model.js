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
}, { unique: true });

//students
classSchema.virtual('students').get(function() {
    return this.parentNode().users.find({
        role: 'student'
        ,state: 'allowed'
    }).classes.find({
        class: this._id
        ,state: 'allowed'
    }).parentNode();
});

//teachers
classSchema.virtual('teachers').get(function() {
    return this.parentNode().users.find({
        role: 'teacher'
        ,state: 'allowed'
    }).classes.find({
        class: this._id
        ,state: 'allowed'
    }).parentNode();
});

//classRequests
classSchema.virtual('classRequests').get(function() {
    return this.parentNode().users.find({ state: 'allowed' }).classes.find({
        class: this._id
        ,state: 'requested'
    }).parentNode();
});

//class has Student, return Boolean
classSchema.methods.hasStudent = function(userMail) {
    return !!this.students.findOne({ user:  userMail });
};

//class has Teacher, return Boolean
classSchema.methods.hasTeacher = function(userMail) {
    return !!this.teacher.findOne({ user:  userMail });
};

//class has classRequests, return Boolean
classSchema.methods.hasClassRequests = function(userMail) {
    return !!this.classRequests.findOne({ user:  userMail });
};

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
    ,message: {
        type: String
        ,required: false
    }
    ,state: {
        type: String
        ,default: 'requested'
        ,enum: ['requested','allowed']
    }
<<<<<<< HEAD
    ,classes: {
        type: [classAccessSchema]
        ,required: false
    }
=======
    ,classes: [classAccessSchema]
>>>>>>> branch 'master' of https://github.com/devsoft91/Quizzipedia.git
}, { strict: true });

userIstitutionSchema.index({ user: 1 }, { unique: true });

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
    ,classes: {
        type: [classSchema]
        ,required: false
    }
    ,users: {
        type: [userIstitutionSchema]
        ,required: false
    }
    ,topics: {
        type: [String]
        ,required: false
    }
}, { strict: true });

organizationSchema.index({ director: 1 }, { unique: true });

//students
organizationSchema.virtual('students').get(function() {
    return this.users.find({
        role: 'student'
        ,state: 'allowed'
    });
});

//teachers
organizationSchema.virtual('teachers').get(function() {
    return this.users.find({
        role: 'teacher'
        ,state: 'allowed'
    });
});

//classRequests
organizationSchema.virtual('roleRequests').get(function() {
    return this.users.find({ state: 'requested' });
});

//Institution has Student, return Boolean
organizationSchema.methods.hasStudent = function(userMail) {
    return !!this.students.findOne({ user: { $in: userMail } });
};

//Institution has Teacher, return Boolean
organizationSchema.methods.hasTeacher = function(userMail) {
    return !!this.teachers.findOne({ user: { $in: userMail } });
};

//Institution has RoleRequest, return Boolean
organizationSchema.methods.hasRoleRequest = function(userMail) {
    return !!this.roleRequests.findOne({ user: { $in: userMail } });
};

//class has Student, return Boolean
organizationSchema.methods.classHasStudent = function(classId, userMail) {
    return !!this.users.findOne({
        user: userMail
        ,role: 'student'
        ,state: 'allowed'
    }).classes.findOne({
        class: classId
        ,state: 'allowed'
    });
};

//class has Teacher, return Boolean
organizationSchema.methods.classHasTeacher = function(classId, userMail) {
    return !!this.users.findOne({
        user: userMail
        ,role: 'teacher'
        ,state: 'allowed'
    }).classes.findOne({
        class: classId
        ,state: 'allowed'
    });
};

//class has classRequests, return Boolean
organizationSchema.methods.classHasClassRequests = function(classId, userMail) {
    return !!this.users.findOne({
        user: userMail
        ,state: 'allowed'
    }).classes.findOne({
        class: classId
        ,state: 'requested'
    });
};

//find Organization with a director (scope = collection)
organizationSchema.statics.findOrganizationByDirector = function(directorMail) {
  return this.findOne({ director: directorMail });
};

//find Classes with a Student, return [istitution, class]  (scope = collection)
organizationSchema.statics.findClassesWithStudent = function(studentMail) {
    var result = { };

    this.find().forEach(function(institution) {
        if(institution.hasStudent(studentMail)) {
            institution.classes.forEach(function(cls) {
                if(cls.hasStudent(studentMail))
                    result.push({
                        istitution: institution
                        ,class_year: cls.academicYear
                        ,class_name: cls.name
                    });
            });
        }
    });
    return result;
};

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
