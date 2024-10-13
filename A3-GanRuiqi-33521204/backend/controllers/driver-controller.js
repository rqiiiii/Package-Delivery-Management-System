const Driver = require("../models/driver")
const Package = require("../models/package")
const firebase = require('../../firebase');

const stats = firebase.collection('data').doc('stats');

/**
 * Increments the operation count in Firebase statistics.
 * 
 * @async
 * @function incrementOperationCount
 * @param {string} operation - The type of operation to increment (e.g., 'Insert', 'Retrieve', 'Update', 'Delete').
 * 
 * @returns {Promise<void>} Increments the corresponding operation count in the 'stats' document.
 */
async function incrementOperationCount(operation) {
    const doc = await stats.get();
    if (doc.exists) {
        let data = doc.data();
        console.log(data)
        let count = data[operation] || 0;
        await stats.update({ [operation]: count + 1 });
    } else {
        // If doc doesn't exist, create it
        await stats.set({ [operation]: 1 });
    }
}

module.exports={
        /**
     * Creates a new driver.
     * 
     * @async
     * @function createDriver
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Responds with the driver's ID and driverId after creation.
     * 
     * @description
     * {
     * "driverName":"Alex",
     * "driverDepartment":"Food",
     * "driverLicence":"ABC12",
     * "driverIsActive":true
     * }
    */
    createDriver: async function(req, res) {
        try {
            let obj = req.body;
            let aDriver = new Driver({
                driverName: obj.driverName,
                driverDepartment: obj.driverDepartment,
                driverLicence: obj.driverLicence,
                driverIsActive: obj.driverIsActive
            });
            await aDriver.save();

            await incrementOperationCount('Insert');

            res.status(200).json(aDriver);
        } catch (error) {
            console.error("Error creating driver:", error);
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: "Validation Error", details: error.message });
            }
            res.status(500).json({ message: "Error creating driver", error: error.message });
        }
    }, 

    findDriver: async function(req, res) {
        try {

            const driver = await Driver.findById(req.params.id);

            // Check if the driver was found
            if (!driver) {
                // Respond with a 400 status if the driver ID does not exist
                return res.status(400).json({ message: "Driver not found with the given ID." });
            }


            res.json(driver);
        } catch (error) {
            console.error("Error finding driver:", error);
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: "Validation Error", details: error.message });
            }
            res.status(500).json({ message: "Error finding driver", error: error.message });
        }
    }, 


    /**
     * Retrieves all drivers.
     * 
     * @async
     * @function getAllDriver
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Responds with a list of all drivers.
     */
    getAllDriver: async function(req,res){
        try {
            let drivers = await Driver.find({}).populate("assigned_packages");
    
            await incrementOperationCount('Retrieve');
    
            res.status(200).json(drivers);
        } catch (error) {
            console.error("Error retrieving drivers:", error);
            res.status(500).json({ message: "Error retrieving drivers", error: error.message });
        }
    },

    /**
     * Removes a driver by their ID.
     * 
     * @async
     * @function removeDriverById
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Responds with the result of the removal operation.
     * 
     * @description
     * Key: id
     * value: driver mongodb ID
     */
    removeDriverById: async function (req, res) {
        try {
            const driver = await Driver.findByIdAndDelete(req.params.id);
    
            if (!driver) {
                return res.status(404).json({ message: "Driver not found" });
            }
    
            await incrementOperationCount('Delete');
    
            res.status(200).json(driver);
        } catch (error) {
            console.error("Error removing driver:", error);
            res.status(500).json({ message: "Error removing driver", error: error.message });
        }
    },

    /**
     * Updates a driver's department and licence.
     * 
     * @async
     * @function updateDriver
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Responds with the status of the update operation.
     * 
     * @description
     * {
     * "driverId": "66e40534a1615e7bf46fd11b",
     * "driverLicence": "54321",
     *" driverDepartment": "Food"
     *}
     */
    updateDriver: async function(req,res){
        let driverId = req.params.id
        let newDriverLicence =req.body.licence
        let newDriverDepartment = req.body.department
        try {
            const updatedDriver = await Driver.findByIdAndUpdate(
            driverId,
            {
                driverLicence: newDriverLicence,
                driverDepartment: newDriverDepartment
            },
            { new: true }
            );

            if (!updatedDriver) {
            return res.status(404).json({ message: 'Driver not found' });
            }
            
            await incrementOperationCount('Update');

            res.json(updatedDriver);
        } catch (error) {
            console.error('Error updating driver:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
        }
}