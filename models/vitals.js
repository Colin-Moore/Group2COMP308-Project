const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vitalSchema = new Schema({
    username: String,
    age:Number,
    sex:Number,
    cp:Number,
    trestbps:Number,
    chol:Number,
    fbs:Number,
    restecg:Number,
    thalach:Number,
    exang:Number,
    oldpeak:Number,
    slope:Number,
    ca:Number,
    thal:Number,
    target:Number,
});

module.exports = mongoose.model('Vitals', vitalSchema);