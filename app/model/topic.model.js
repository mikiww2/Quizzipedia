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

//get topic name
topicSchema.methods.getName = function() {
    return this._id;
};

//find topics, usable only like find
topicSchema.statics.findTopics = function() {
    return this.find();
};

//has topic
topicSchema.statics.hasTopic = function(topic) {
    return !!this.findOne({ _id: topic });
};

//export
module.exports = mongoose.model('Topic', topicSchema);
