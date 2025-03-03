const express = require('express');
const Usercontroller = require('../controller/UserController');

const router = express.Router();

router.post('/register', Usercontroller.register);

module.exports = router;