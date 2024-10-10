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
        const doc = await stats.get();
        const data = doc.data();
        res.status(200).json({
            data
        });
    }
}
