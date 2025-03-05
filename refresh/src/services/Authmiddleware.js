const jwt = require('jsonwebtoken');

const authorize = (req,res,next) => {
    const authHeader  = req.header('authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
    try {
        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Lưu thông tin người dùng vào request để sử dụng ở các middleware hoặc controller tiếp theo
        req.user = decoded;

        // Cho phép yêu cầu tiếp tục
        next();
    } catch (error) {
        console.error('Error in AuthmiddleWare:', error.message);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token.',
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired.',
            });
        }

        // Trả về lỗi chung
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
module.exports = {
    authorize
}