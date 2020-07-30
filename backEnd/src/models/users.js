const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Username exists"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email exists"]
    },
    password: {
        type: String,
        required: true,
        // unique: true
    },
    admin: Boolean
});

let User = mongoose.model('User', UserSchema);

module.exports = User;
