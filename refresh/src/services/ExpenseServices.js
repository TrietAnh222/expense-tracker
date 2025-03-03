const Expense = require('../model/expense')

class ExpenseService {
    constructor(expenseModel) {
        this.Expense = expenseModel;
    }

    async createExpense(userId, title, amount, category) {
        // Input validation (basic example)
        if (!userId || !title || !amount || !category) {
            throw new Error('Missing required fields');
        }

        try {
            return await this.Expense.create({ userId, title, amount, category });
        } catch (error) {
            console.error(`Failed to create expense: ${error.message}`);
            throw new Error('Failed to create expense');
        }
    }

    async getExpensesByUser(userId, filters = {}, page = 1, limit = 10) {
        // Input validation (basic example)
        if (!userId) {
            throw new Error('UserId is required');
        }

        if (page < 1 || limit < 1) {
            throw new Error('Page and limit must be positive integers');
        }

        try {
            const query = { userId, ...filters };
            const expenses = await this.Expense.find(query)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await this.Expense.countDocuments(query);

            return {
                expenses,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            };
        } catch (error) {
            console.error(`Failed to fetch expenses: ${error.message}`);
            throw new Error('Failed to fetch expenses');
        }
    }
}

module.exports = new ExpenseService(Expense);