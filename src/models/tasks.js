const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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
},{
    timestamps: true
})


const tasks = mongoose.model('tasks',taskSchema)



module.exports = tasks;