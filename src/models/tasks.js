const mongoose = require('mongoose');

const tasks = mongoose.model('tasks',{
    task:{
        type: String,
        required: true,
        trim: true
    },
    complete:{
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})



module.exports = tasks;