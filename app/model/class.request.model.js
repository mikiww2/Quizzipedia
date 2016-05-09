'use strict'; //will load js in strict mode

//define the model for ClassRequest using ClassRequestSchema
// IN var mongoose = require('mongoose');
//OUT mongoose.model('ClassRequest', classRequestSchema);

// use me like this
// var ClassRequest = require('./class.request.model', { root: __dirname })(mongoose);
module.exports = function(mongoose) {

    var Schema = mongoose.Schema;
    
    var classRequestSchema = new Schema({
        user: {
            type: String
            ,required: [true, 'user is required']
        }
        ,class: {
            type: Schema.Types.ObjectId
            ,required: [true, 'class is required']
        }
    }, { strict: true });

    return  mongoose.model('ClassRequest', classRequestSchema);
}