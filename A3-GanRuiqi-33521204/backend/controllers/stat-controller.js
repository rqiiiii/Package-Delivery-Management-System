const firebase = require('../../firebase');
const stats = firebase.collection('data').doc('stats');

module.exports={

    /**
     * Retrieves all statistical data from the Firebase collection.
     * @function getAllStats
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    getAllStats: async function(req,res){
        try {
            // Attempt to retrieve the statistics document
            const doc = await stats.get();
            const data = doc.data();
    
            // Send a success response with the statistics data
            res.status(200).json({
                data
            });
        } catch (error) {
            console.error("Error retrieving statistics:", error);
            // Send a server error response
            res.status(500).json({ message: "Error retrieving statistics", error: error.message });
        }
    }
}
