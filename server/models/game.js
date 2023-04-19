const mongoose = require('mongoose');
const game = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model("Game", game);