const express = require('express');
const ExpenseController = require('../controller/ExpenseController');
const { authorize } = require('../services/Authmiddleware');
const router = express.Router();

router.post('/create',authorize, ExpenseController.create);
router.get('/getbyid',authorize,ExpenseController.findbyId)
module.exports = router;