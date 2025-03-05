const user = require('../model/user');
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
    async userlogin(req,res){
        try {
            const {name,email,password} = req.body
            if ((!name && !email) || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Name or email and password are required',
                });
            }
            const {token, RefreshToken} = await UserService.loginUser({name,email,password})
            
            await user.updateOne(
                { $or: [{ name: name }, { email: email }] }, // Điều kiện tìm kiếm
                { $set: { refreshToken: RefreshToken } } // Dữ liệu cần cập nhật
            );
            res.status(200).json({ token,RefreshToken });
        } catch (error) {
            console.error('Login error:', error);
            // Handle different error cases
            if (error.message === 'User not found' || error.message === 'User or password is not correct') {
            return res.status(401).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Server error', message: error.message });
        }
    }
}

module.exports = new UserController();