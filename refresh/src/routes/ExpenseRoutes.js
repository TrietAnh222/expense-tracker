const express = require('express');
const ExpenseController = require('../controller/ExpenseController');
const { authorize } = require('../services/Authmiddleware');
const router = express.Router();

router.post('/create',authorize, ExpenseController.create);

module.exports = router;