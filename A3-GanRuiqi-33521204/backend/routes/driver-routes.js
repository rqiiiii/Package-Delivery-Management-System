const express = require('express');
const router = express.Router();

const driverController = require("../controllers/driver-controller");
// const authController = require('../controllers/auth-controller');

/**
 * Creates a new driver entry.
 * @name POST /33521204/ruiqi/api/v1/drivers/add
 * @function
 * @param {Object} req - Express request object containing driver data
 * @param {Object} res - Express response object to send the response
 * @param {Function} authController.isVerified - Middleware function to check if the user is verified
 * @param {Function} driverController.createDriver - Controller function to handle creating a new driver
 */
router.post("/",driverController.createDriver);



/**
 * Retrieves all drivers.
 * @name GET /33521204/ruiqi/api/v1/drivers/
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object containing all drivers
 * @param {Function} authController.isVerified - Middleware function to check if the user is verified
 * @param {Function} driverController.getAllDriver - Controller function to handle retrieving all drivers
 */
router.get("/",driverController.getAllDriver);

router.get("/:id",driverController.findDriver);

// /**
//  * Deletes a driver by ID.
//  * @name DELETE /33521204/ruiqi/api/v1/drivers/del
//  * @function
//  * @param {Object} req - Express request object containing driver ID
//  * @param {Object} res - Express response object with deletion confirmation
//  * @param {Function} authController.isVerified - Middleware function to check if the user is verified
//  * @param {Function} driverController.removeDriverById - Controller function to handle deleting a driver by ID
//  */
router.delete("/:id",driverController.removeDriverById);

// /**
//  * Updates an existing driver.
//  * @name PUT /33521204/ruiqi/api/v1/drivers/
//  * @function
//  * @param {Object} req - Express request object containing driver update data
//  * @param {Object} res - Express response object with updated driver data
//  * @param {Function} authController.isVerified - Middleware function to check if the user is verified
//  * @param {Function} driverController.updateDriver - Controller function to handle updating driver details
//  */
router.put("/:id", driverController.updateDriver); 

module.exports = router;