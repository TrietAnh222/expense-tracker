const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class Userservices {
    async createUser({name,email,password,role}) {
       if(password.length<8) {
        throw new Error('password length must be 8 character or more')
       }
       const hashedPassword  = await bcrypt.hash(password ,10)
       const user =await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    })
       return user;
    }
    async loginUser({email,password}) {
        if(!email|| !password)
            throw new Error('Invalid data')
        const checkUser = await User.findOne({
            email: { $regex: new RegExp(email, 'i') } ,// Không phân biệt chữ hoa/thường
    });
    if(!checkUser)
        throw new Error ('User not exist')
    const checkpass = await bcrypt.compare(password , checkUser.password)
    if (!checkpass) {
        throw new Error('User or password is not correct');
      }
      const token = jwt.sign(
        { userId: checkUser.id,},
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
      );
      const RefreshToken = jwt.sign(
        { userId: checkUser.id,},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
      );
      return { token, RefreshToken };
    }
    async update({newname,userId}){
      if(!newname){
        throw new Error('need new name')
      }
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {name: newname},
        {new: true}// trả về doc đã được cập nhật
      )
      return updatedUser
    }
}
module.exports = new Userservices();