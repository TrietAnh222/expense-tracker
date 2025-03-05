const mongoose = require('mongoose');
const user = require('./user');

const ExpensesSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId , Ref: user},
    Name: String,
    Amount: Number,
    Category: String,
    Date:{type: Date, default: Date.now}
}, { required: true }); // 👈 This makes all fields required by default

module.exports = mongoose.model ('Expenses',ExpensesSchema);