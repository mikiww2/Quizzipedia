'use strict'; //will load js in strict mode

//define the model for User using userSchema
// IN var mongoose = require('mongoose');
//OUT mongoose.model('User', userSchema);

var utility = require('./utility', { root: __dirname }); 

module.exports = function(mongoose) {

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {
        type: String
        ,trim: true
        ,required: [true, 'firstName is required']
//         ,validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    }
    ,lastName: {
        type: String
        ,trim: true
        ,required: [true, 'lastName is required']
//         ,validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    }
    ,_id: { // email
        type: String
        ,set: utility.lower
        ,trim: true
//         ,validate: [validateLocalStrategyProperty, 'Please fill in your email']
        ,match: [/.+\@.+\..+/, 'Please fill a valid mail address, it\'s used like a index']
    }
    ,password: {
        type: String
        ,required: [true, 'password is required']
    }
    ,type: {
        type: String
        ,enum: ['NoRole', 'Director', 'Student', 'Teacher']
        ,default: 'NoRole'
        ,required: [true, 'type is required']
    }
    }, {
        strict: true
        ,toObject: {
            virtuals: true
        }
        ,toJSON: {
            virtuals: true 
        }
    });

    userSchema.virtual('name.full').get(function () {
        return this.name.first + ' ' + this.name.last;
    });
    
    userSchema.methods.getFirstName = function () {
        return this.firstName;
    }
    
    userSchema.methods.getLastName = function () {
        return this.lasttName;
    }
    
    userSchema.methods.getMail = function () {
        return this.mail;
    }
    
    userSchema.methods.getType = function () {
        return this.type;
    }
    
    userSchema.methods.checkPassword = function (password) {
        if(this.password == password)
            return true;
        else
            return false;
    }
    
    return  mongoose.model('User', userSchema);
}