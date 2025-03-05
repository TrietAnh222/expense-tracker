const jwt = require('jsonwebtoken');

const authorize = (req,res,next) => {
    const authHeader  = req.header('authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
    jwt.verify(token, process.env.JWT_SECRET , (err,user) => {
        if(err){
            return res.status(403).json({
                success: false,
                message : 'Invalid or expired token.'
            })
        }
        // Lưu thông tin người dùng vào request để sử dụng ở các middleware hoặc route tiếp theo
        req.user = user 
        next()
    })
}
module.exports = {
    authorize
}