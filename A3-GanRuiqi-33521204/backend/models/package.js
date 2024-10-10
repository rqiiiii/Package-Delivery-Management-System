const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    packageId:{
        type: String,
        default: generateId,
    },
    packageTitle:{
        type:String,
        required: true,
        validate:{
            validator: function(string){
                const alphanumeric = /^[a-zA-Z0-9 ]+$/;
                return string.length >= 3 && string.length <= 15 && alphanumeric.test(string)
            },
            message: "Package title should have 3 to 15 alphanumeric characters"
        }
    },
    packageWeight:{
        type: Number,
        required: true,
        validate:{
            validator: function(num){
                return num > 0
            },
             message: "Package weight cannot be negative"
        }
    },
    packageDestination:{
        type: String,
        required: true,
        validate:{
            validator: function(string){
                const alphanumeric = /^[a-zA-Z0-9 ]+$/;
                return string.length >=5 && string.length <= 15 && alphanumeric.test(string)
            },
             message: "Destination is alphanumeric between the length of 5 and 15"
        }
    },
    packageDescription:{
        type:String,
        validate:{
            validator:function(string){
                return string.length <= 30
            },
             message: "Description have a maximum lenght of 30"
        }
    },
    packageCreatedAt:{
        type:String,
        default: currentDay()
    },
    packageIsAllocated:{
        type: Boolean,
        required: true,
        default: false
    },
    driverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver"
        // type: String,
        // required: true
    }
})

// Create the Package model from the schema
const Package = mongoose.model("Package", packageSchema);

// Export the model
module.exports = Package;

/**
 * Generates a unique package ID in the format "P<randomString>-RG-<randomNum>".
 * @function
 * @returns {string} The generated package ID.
 */
function generateId() {
    ranNum = Math.floor(Math.random() * 1000).toString();
    rString = randomString(2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    return "P"+rString+"-"+"RG-"+ ranNum
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


