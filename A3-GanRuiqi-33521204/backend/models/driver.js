const mongoose = require("mongoose");

/**
 * Driver Schema definition using Mongoose.
 * 
 * @typedef {Object} Driver
 * @property {string} driverId - Unique identifier for the driver, automatically generated.
 * @property {string} driverName - The name of the driver (3 to 20 alphabetic characters).
 * @property {string} driverDepartment - The department the driver belongs to (must be one of: "Food", "Furniture", "Electronic").
 * @property {string} driverLicence - The driver's licence (must be 5 alphanumeric characters).
 * @property {boolean} driverIsActive - Indicates if the driver is active (default: false).
 * @property {string} driverCreatedAt - The creation date of the driver record, in the format "day/month/year".
 * @property {Array<ObjectId>} assigned_packages - List of package references assigned to the driver.
 */
const driverSchema = new mongoose.Schema({
    driverId: {
        type: String,
        default: generateId
    },
    driverName: {
        type: String,
        required: true,
        validate: {
            validator: function(string) {
                const alpha = /^[a-zA-Z ]+$/;
                return string.length >= 3 && string.length <= 20 && alpha.test(string);
            },
            message: "Driver Name should have 3 to 20 letters"
        }
    },
    driverDepartment: {
        type: String,
        required: true,
        enum:["Food","Furniture","Electronic"]
    },
    driverLicence: {
        type: String,
        required: true,
        validate: {
            validator: function(string) {
                const alphanumeric = /^[a-zA-Z0-9 ]+$/;
                return string.length === 5 && alphanumeric.test(string);
            },
            message: "Driver Licence should have 5 alphanumeric characters"
        }
    },
    driverIsActive: {
        type: Boolean,
        required: true,
        default: false
    },
    driverCreatedAt: {
        type: String,
        default: currentDay
    },
    assigned_packages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package"
    }],
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;


/**
 * Generates a unique driver ID.
 * @function
 * @returns {string} The generated driver ID.
 */
function generateId() {
    ranNum = Math.floor(Math.random() * 100).toString();
    rString = randomString(3, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    return "D"+ranNum+"-"+"33-"+ rString
}

/**
 * Generates a random string of a specified length using the provided characters.
 * @function
 * @param {number} length - The length of the random string to be generated.
 * @param {string} chars - The characters to be used for generating the string.
 * @returns {string} The generated random string.
 */
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

/**
 * Returns the current date in the format "day/month/year".
 * @function
 * @returns {string} The current date.
 */
function currentDay(){
    var currentdate = new Date();
    var date =currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1)  + "/" 
        + currentdate.getFullYear() 
        return date
}
