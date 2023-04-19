const mongoose = require('mongoose');
const motivation = new mongoose.Schema({
    Title: String,
    Body: String,
});

module.exports = mongoose.model("Motivation", motivation);