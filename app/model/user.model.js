'use strict'; //will load js in strict mode

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

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
    ,typeUser: {
        type: String
        ,enum: ['NoRole', 'Director', 'Student', 'Teacher']
        ,default: 'NoRole'
        ,required: [true, 'typeUser is required']
    }
}, {
    strict: true
});

userSchema.virtual('fullName').get(function () {
    return this.name.first + ' ' + this.name.last;
});

userSchema.methods.checkPassword = function (password) {
    if(this.password == password)
        return true;
    else
        return false;
}

module.exports = mongoose.model('User', userSchema);