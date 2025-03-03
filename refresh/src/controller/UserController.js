const UserService = require('../services/UserServices')

class UserController {
    async register(req, res) {
        try {
            const { name, email, password, role } = req.body;

            // Kiểm tra dữ liệu đầu vào
            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Name, email, and password are required',
                });
            }

            // Tạo người dùng mới
            const user = await UserService.createUser({name, email, password, role});

            // Trả về phản hồi thành công
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: user,
            });
        } catch (error) {
            console.error('Error in register:', error.message);

            // Xử lý lỗi cụ thể
            if (error.message.includes('duplicate key error')) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists',
                });
            }
            // Trả về lỗi chung
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
}

module.exports = new UserController();