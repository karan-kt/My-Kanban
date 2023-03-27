const mongoose = require('mongoose')


const Schema = new mongoose.Schema({

    TaskName: {
        type: String,
        required: true,
    },
    TaskMain: {
        type: String,
        required: true,
    },
    TaskStep: {
        type: String,
        required: true,
        default: "Droppable1"
    },
})

const Data = mongoose.model("Task", Schema);
module.exports = Data;