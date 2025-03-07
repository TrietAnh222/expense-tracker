const Expenses = require('../model/expenses')

class ExpenseServices {
    async create({userId,Name,Amount,Category,Date}){
        const expenses = Expenses.create({
            userId: userId,
            Name,
            Amount,
            Category,
            Date
        })
        return expenses
    }
    async findbyId(userId){
        const data = await Expenses.find({
            userId: userId
        })
        return data
    }
}
module.exports = new ExpenseServices()