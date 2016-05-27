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
topicSchema.statics.findTopics = function findTopics() {
    return this.find({ });
};

//has topic
topicSchema.statics.hasTopic = function hasTopic(topic) {
    return !!this.findOne({_id: topic});
};

//export
module.exports = mongoose.model('Topic', topicSchema);
