const express = require('express');
const Usercontroller = require('../controller/UserController');

const router = express.Router();

router.post('/register', Usercontroller.register);
router.post('/login',Usercontroller.userlogin)

module.exports = router;