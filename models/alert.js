const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alert = new mongoose.Schema({
    userId: String,
    Message: String
});

module.exports = mongoose.model("Alert", alert);