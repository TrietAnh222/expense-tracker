const ExpenseServices = require("../services/ExpenseServices");

class ExpenseController {
    async create(req,res){
        try {
        const userId = req.user.userId
        if(!userId){
            throw new Error('token is invalid or expired')
        }
        const {Name,Amount,Category,Date} = req.body
        if(!Name||!Amount||!Category){
            return res.status(401).json({
                success: false,
                message: 'Name, Amount, and Category are required',
            });
        }
        const newExpenses = await ExpenseServices.create({userId,Name,Amount,Category,Date})
        return res.status(201).json({
            success: true,
            message: 'expense created successfully',
            data: newExpenses
        })
        } catch (error) {
        // Trả về lỗi chung
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
        }
    }
    async findbyId(req,res){
        try {
        const userId = req.user.userId
        const data = await ExpenseServices.findbyId(userId)
        return res.status(200).json({
            success : true,
            data: data
        })
        } catch (error) {
            // Trả về lỗi chung
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
        }
    }
}
module.exports = new ExpenseController()