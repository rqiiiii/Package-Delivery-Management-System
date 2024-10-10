const express = require('express');
const router = express.Router();

const packageController = require("../controllers/package-controller");
// const authController = require("../controllers/auth-controller")

/**
 * Creates a new package entry.
 * @name POST /33521204/ruiqi/api/v1/packages/add
 * @function
 * @param {Object} req - Express request object containing package data
 * @param {Object} res - Express response object to send the response
 * @param {Function} authController.isVerified - Middleware function to check if the user is verified
 * @param {Function} packageController.createPackage - Controller function to handle creating a new package
 */
router.post("/",packageController.createPackage);

/**
 * Retrieves all packages.
 * @name GET /33521204/ruiqi/api/v1/packages/
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object containing all packages
 * @param {Function} authController.isVerified - Middleware function to check if the user is verified
 * @param {Function} packageController.getAllPackage - Controller function to handle retrieving all packages
 */
router.get("/",packageController.getAllPackage);

/**
 * Deletes a package by ID.
 * @name DELETE /33521204/ruiqi/api/v1/packages/del
 * @function
 * @param {Object} req - Express request object containing package ID
 * @param {Object} res - Express response object with deletion confirmation
 * @param {Function} authController.isVerified - Middleware function to check if the user is verified
 * @param {Function} packageController.removePackageById - Controller function to handle deleting a package by ID
 */
router.delete("/:id",packageController.removePackageById);

router.get("/:id",packageController.findPackageById);


/**
 * Updates an existing package.
 * @name PUT /33521204/ruiqi/api/v1/packages
 * @function
 * @param {Object} req - Express request object containing package update data
 * @param {Object} res - Express response object with updated package data
 * @param {Function} authController.isVerified - Middleware function to check if the user is verified
 * @param {Function} packageController.updatePackage - Controller function to handle updating package details
 */
router.put("/:id",packageController.updatePackage); 

module.exports = router;