const express = require('express');

// User Controller
const userController = require('../controllers/userController');

const router = express.Router();

// REGISTER AN USER
router.post('/signup', userController.register_user);

// DELETING AN USER
router.delete('/:userId', userController.delete_user);

// LOGIN
router.post('/login', userController.user_login);

module.exports = router;