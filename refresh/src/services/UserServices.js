const User = require('../model/user')
const bcrypt = require('bcrypt')

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
        role
    })
       return user;
    }
}
module.exports = new Userservices();