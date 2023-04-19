const mongoose = require('mongoose');
const user = new mongoose.Schema({
    username: String,
    password: String,
    userType: String
});

module.exports = mongoose.model("User", user);