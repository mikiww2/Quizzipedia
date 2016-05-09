'use strict'; //will load js in strict mode

//define the model for RoleRequest using RoleRequestSchema
// IN var mongoose = require('mongoose');
//OUT mongoose.model('RoleRequest', roleRequestSchema);

// use me like this
// var RoleRequest = require('./role.request.model', { root: __dirname })(mongoose);
module.exports = function(mongoose) {

    var Schema = mongoose.Schema;
    
    var roleRequestSchema = new Schema({
        user: {
            type: String
            ,required: [true, 'user is required']
        }
        ,role: {
            type: String
            ,required: [true, 'role is required']
            ,enum: ['Student','teacher']
        }
        ,institution: {
            type: Schema.Types.ObjectId
            ,required: [true, 'institution is required']
        }
    }, { strict: true });

    return  mongoose.model('RoleRequest', roleRequestSchema);
}