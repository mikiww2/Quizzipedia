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

//get mail
userClassSchema.virtual('mail').get(function() {
    return this.user;
});

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
classSchema.virtual('students').get(function() {
    return this.users.find({ role: 'student', state: 'allowed' });
});

//teachers
classSchema.virtual('teachers').get(function() {
    return this.users.find({ role: 'teacher', state: 'allowed' });
});

//classRequests
classSchema.virtual('classRequests').get(function() {
    return this.users.find({ state: 'requested' });
});

//class has Student, return Boolean
classSchema.methods.hasStudent = function(user_mail) {
    return !!this.findOne({students: {$in: user_mail}});
};

//class has Teacher, return Boolean
classSchema.methods.hasTeacher = function(user_mail) {
    return !!this.findOne({teachers: {$in: user_mail}});
};

//class has classRequests, return Boolean
classSchema.methods.hasClassRequests = function(user_mail) {
    return !!this.findOne({classRequests: {$in: user_mail}});
};

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

//find Organization with a director (scope = collection)
organizationSchema.statics.findOrganizationByDirector = function(director_mail) {
  return this.find({ director: director_mail });
};

//find Classes with a Student, return [istitution, class_year, class_name]  (scope = collection)
organizationSchema.statics.findClassesWithStudent = function(student_mail) {
    var result = { };

    this.find().forEach(function(institution) {
        if(institution.hasStudent(student_mail)) {
            institution.classes.forEach(function(cls) {
                if(cls.hasStudent(student_mail))
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

//find istitutions with a User role, return [istitution, istitution_name, role(director/student/teacher)]  (scope = collection)
organizationSchema.statics.findClassesWithStudent = function(user_mail) {
    var result = { };

    this.find().forEach(function(institution) {
        if(istitution.director == user_mail)
            result.push({
                istitution: institution._id
                ,istitution_name: institution.name
                ,role : 'director'
            });
        else {
            if(institution.hasStudent(user_mail)) {
                result.push({
                    istitution: institution
                    ,istitution_name: institution.name
                    ,role: 'student'
                });
            }
            if(institution.hasTeacher(user_mail)) {
                result.push({
                    istitution: institution
                    ,istitution_name: institution.name
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
organizationSchema.methods.hasStudent = function(user_mail) {
    return !!this.findOne({students: {$in: user_mail}});
};

//Institution has Teacher, return Boolean
organizationSchema.methods.hasTeacher = function(user_mail) {
    return !!this.findOne({teachers: {$in: user_mail}});
};

//Institution has RoleRequest, return Boolean
organizationSchema.methods.hasRoleRequest = function(user_mail) {
    return !!this.findOne({roleRequests: {$in: user_mail}});
};

//export
module.exports = mongoose.model('Organization', organizationSchema);
