const Package = require("../models/package")
const Driver = require("../models/driver");
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
        let count = data[operation] || 0;
        await stats.update({ [operation]: count + 1 });
    } else {
        // If doc doesn't exist, create it
        await stats.set({ [operation]: 1 });
    }
}

module.exports={

    /**
     * Creates a new package and saves it to the database.
     * 
     * @async
     * @function createPackage
     * @param {Object} req - Express request object containing the package data in the body.
     * @param {Object} res - Express response object to send the created package's ID.
     * 
     * @returns {Promise<void>} Sends a JSON response with the created package's ID.
     * 
     * @description
     * {
     * "packageTitle":"Camera",
     * "packageWeight":1.25,
     * "packageDestination":"Melbourne",
     * "packageIsAllocated":"true",
     * "driverId": "66e40534a1615e7bf46fd11b"
     *}
     */
    createPackage: async function(req,res){

    // Extract the request body
    let obj = req.body;

    try {

        // Create a new Package instance
        let aPackage = new Package({
            packageTitle: obj.packageTitle,
            packageWeight: obj.packageWeight,
            packageDestination: obj.packageDestination,
            packageDescription: obj.packageDescription,
            packageIsAllocated: obj.packageIsAllocated,
            driverId: obj.driverId
        });

        // Save the package to the database
        await aPackage.save();

        await Driver.findByIdAndUpdate(
            obj.driverId,
            { $push: { assigned_packages: aPackage._id } },
            { new: true }
        );

        // Optionally, increment operation count if necessary
        await incrementOperationCount('Insert');

        // Respond with the newly created package's ID and packageId
        res.status(200).json({aPackage});
    } catch (error) {
        console.error("Error creating package:", error);
        res.status(500).json({ message: "An error occurred while creating the package." });
    }

    },


    /**
     * Retrieves all packages from the database.
     * 
     * @async
     * @function getAllPackage
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object to send the list of all packages.
     * 
     * @returns {Promise<void>} Sends a JSON response containing the list of all packages.
     */
    getAllPackage: async function(req,res){
        let packages = await Package.find({}).populate("driverId");

        await incrementOperationCount('Retrieve');
        res.status(200).json(packages);
    },

    /**
     * Removes a package by its ID from the database.
     * 
     * @async
     * @function removePackageById
     * @param {Object} req - Express request object, containing the package ID in the query.
     * @param {Object} res - Express response object to send the result of the deletion.
     * 
     * @returns {Promise<void>} Sends a JSON response with the result of the deletion operation.
     * 
     * @description
     * Key: packageId
     * Value: package mongodb ID
     */
    removePackageById: async function (req, res) {
        const package = await Package.findByIdAndDelete(req.params.id);
        await incrementOperationCount('Delete');
        res.json(package);

    },

    findPackageById: async function (req, res) {
        const package = await Package.findById(req.params.id);
        res.json(package);

    },

    /**
     * Updates the destination of a package based on its ID.
     * 
     * @async
     * @function updatePackage
     * @param {Object} req - Express request object containing the package ID and new destination in the body.
     * @param {Object} res - Express response object to send the result of the update operation.
     * 
     * @returns {Promise<void>} Sends a JSON response indicating the success or failure of the update.
     * 
     * @description
     * {
     *  "packageId":"66e40839ca58338e0b62d47d",
     *  "packageDestination":"Perth"
     *  }
     */
    updatePackage: async function(req,res){
        let packageId = req.params.id
        let newDestination = req.body.destination
        try{
            const updatePackage = await Package.findByIdAndUpdate(
                packageId,
                {
                    packageDestination:newDestination
                },
                {new: true}
            );

            await incrementOperationCount('Update');

            if(!updatePackage){
                return res.status(404).json({status: 'Package ID not found'});
            }
            console.log(updatePackage)
            res.json(updatePackage);
        }catch (error) {
            console.error('Error updating pacakge:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}