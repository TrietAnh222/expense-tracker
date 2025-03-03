const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
}, { required: true }); 

module.exports =  mongoose.model('User' , UserSchema)