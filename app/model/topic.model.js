'use strict'; //will load js in strict mode

//define the model for Topic using topicSchema
// IN var mongoose = require('mongoose');
//OUT mongoose.model('Topic', topicSchema);

// use me like this
// var Topic = require('./topic.model', { root: __dirname })(mongoose);

module.exports = function(mongoose) {
    var Schema = mongoose.Schema;

    var topicSchema = new Schema({
        _id: {
            type: String
            ,lowercase: true
            ,trim: true
        }
    }, {
        strict: true
    });
    
    return  mongoose.model('Topic', topicSchema);
}