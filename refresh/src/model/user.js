const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    role: {
        type: String,
        enum: ['admin', 'customer'], // Chỉ cho phép 2 giá trị: 'admin' hoặc 'customer'
        default: 'customer', // Mặc định là 'customer' nếu không được cung cấp
    },
    refreshToken: { type: String , default:null},
}, { required: true }); // This makes all fields required by default

module.exports = mongoose.model('User', UserSchema);