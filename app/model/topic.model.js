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

//find topics
organisationSchema.static.findTopics = function findTopics() {
    return this.find({ });
}

//has topic
organisationSchema.static.hasTopic = function hasTopic(topic) {
    if(this.findOne({ _id: topic }))
        return true;
    else
        return false;
}

//export
module.exports = mongoose.model('Topic', topicSchema);
