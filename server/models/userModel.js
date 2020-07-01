const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5},
    displayName: {type: String },
    // emailPreference: {type: Number}
    resetLink:{data: String, default:''}
}, {timestamps: true});

module.exports = mongoose.model("user", userSchema);