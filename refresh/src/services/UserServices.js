const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class Userservices {
    async createUser({name,email,password,role}) {
       if(!name||!email||!password) {
        throw new Error('Invalid data: Name, email, and password are required');
       }
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
    async loginUser({name,email,password}) {
        if( !email|| !password)
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
      console.log(RefreshToken)
      return { token, RefreshToken };
    }
    async update(name,userId){
      
    }
}
module.exports = new Userservices();