const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Retypepassword: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

const Data = mongoose.model("User", Schema);
module.exports = Data;