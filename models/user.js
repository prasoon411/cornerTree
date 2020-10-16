const mongoose = require('mongoose');
//now define schema for USer
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
//define Model
const User = mongoose.model('User', userSchema);
module.exports = User;