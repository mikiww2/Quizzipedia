'use strict';

//declare required
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//topic
var topicSchema = new Schema({
    _id: {
        type: String
        ,lowercase: true
        ,trim: true
    }
}, {
    strict: true
});

//export
module.exports = mongoose.model('Topic', topicSchema);
