const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Weight = new Schema({
    weight: {
        type: Number,
        required:true
    },
    date: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model("Weight", Weight);