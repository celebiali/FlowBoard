const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date(),
    }
});


module.exports = mongoose.model('post', PostSchema);