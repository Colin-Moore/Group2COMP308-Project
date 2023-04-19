const mongoose = require('mongoose');
const patient = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    Age: Number,
    Sex: Number
});

module.exports = mongoose.model("Patient", patient);