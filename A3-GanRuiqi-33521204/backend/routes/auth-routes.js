const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');

/**
 * Route for user signup.
 * @name POST /33521204/ruiqi/api/v1/signup
 * @function
 * @param {Object} req - Express request object containing user signup data
 * @param {Object} res - Express response object to send the response
 * @param {Function} authController.signup - Controller function to handle signup
 */
router.post('/signup', authController.signup);

/**
 * Handles the form submission to login.
 * @name POST /33521204/ruiqi/api/v1/login
 * @function
 * @param {Object} req - Express request object containing login form data
 * @param {Object} res - Express response object to send the response
 * @param {Function} authController.login - Controller function to handle login
 */
router.post('/login', authController.login);


router.post('/logout', authController.logout);


module.exports = router;

