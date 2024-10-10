const express = require('express');
const router = express.Router();

const statController = require("../controllers/stat-controller")

/**
 * Updates an existing package.
 * @name GET /33521204/ruiqi/api/v1/stats
 * @function
 * @param {Object} req - Express request object, contains information about the HTTP request.
 * @param {Object} res - Express response object, used to send back the desired HTTP response.
 * @param {Function} statController.getAllStats - Controller function to handle retrieving statistical data.
 */
router.get("/",statController.getAllStats);

module.exports = router;