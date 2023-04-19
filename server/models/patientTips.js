const mongoose = require('mongoose');

const patientTip = new mongoose.Schema({
    username: String,
    Title: String,   
    Body: String
});

module.exports = mongoose.model("PatientTip", patientTip);