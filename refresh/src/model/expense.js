const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    titles: String,
    amount: Number,
    category: String, 
    Date: {type: Date , default:Date.now}
},{ required: true })

module.exports = mongoose.model('Expense' , ExpenseSchema)