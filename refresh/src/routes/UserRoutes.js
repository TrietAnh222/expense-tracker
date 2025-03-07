const express = require('express');
const Usercontroller = require('../controller/UserController');
const { authorize } = require('../services/Authmiddleware');

const router = express.Router();

router.post('/register', Usercontroller.register);
router.post('/login',Usercontroller.userlogin)
router.patch('/update',authorize, Usercontroller.update)

module.exports = router;