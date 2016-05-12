'use strict';

var mongoose = require('mongoose');

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

module.exports = mongoose.model('Topic', topicSchema);
