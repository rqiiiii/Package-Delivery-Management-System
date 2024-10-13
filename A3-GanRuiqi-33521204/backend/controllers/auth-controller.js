const db = require('../../firebase');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "Hello"
module.exports={
    /**
     * Signup a new user.
     * 
     * @async
     * @function signup
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Responds with a success or failure status based on the signup process.
     * 
     * @description
     * {
     * "username": "benjamin",
     * "password": "12345",
     * "confirmPassword": "12345"
     * }
     */
    signup : async function(req,res){
        const { username, password, confirmPassword } = req.body;
        console.log(req.body)
        const alphanumeric = /^[a-zA-Z0-9 ]+$/;
        try {
            // Check if the user already exists
            const user = await db.collection('users').where('username', '==', username).get();
            if (!user.empty) {
                return res.status(400).json({ status: "User already exists" });
            }

            // Check if password and confirmPassword match
            if (password != confirmPassword || password.length <5 || password.length> 10 || username.length<6 || !alphanumeric.test(username)) {
                return res.status(400).json({ status: "Passwords do not match" }); 
            }

            // Add new user to Firestore
            await db.collection('users').add({
                username: username,
                password: password
            });

            return res.status(201).json({ status: "Signup successful" });
        } catch (error) {
            console.error('Error during signup:', error);
            return res.status(500).json({ status: "Signup failed due to server error" });
        }
    },

    /**
     * Login an existing user.
     * 
     * @async
     * @function login
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>} Responds with a success or failure status based on the login process.
     * 
     * @description
     * {
     * "username": "benjamin",
     * "password": "12345",
     * }
     */
    login : async function(req,res){
        const { username, password } = req.body;
        console.log(req.body,"from login front")

    try {
        // Check if a user already exists
        const user = await db.collection('users').where('username', '==', username).get();
        if (user.empty) {
            return res.status(400).json({ status: "User not found" }); 
        }

        // Extract user data
        let userData;
        user.forEach(doc => {
            userData = doc.data();
        });

        // Compare passwords
        if (password !== userData.password) {
            return res.status(400).json({ status: "Invalid password" });
        }

        const jwtBearerToken = jwt.sign(
            { username: userData.username },  // Payload
            SECRET_KEY,  // Private key to sign the token (defined as a constant or environment variable)
            {
                expiresIn: '24h',  // Token expiry
                subject: userData.username  // Optional: subject identifier for the token
            }
        );
        // // Set session to indicate user is logged in
        // req.session.user = username;
        console.log("user:", username)

        // Return success message
        return res.status(200).json({
            status: "Login successful",
            token: jwtBearerToken  // Send the token back to the client
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ status: "Login failed due to server error" });
    }
},
    /**
     * Middleware to verify JWT and authenticate the user.
     * 
     * @function isVerified
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {void}
     */
    isVerified: function(req, res, next) {
        // Extract token from the Authorization header (Bearer <token>)
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];  // Extract token from 'Bearer <token>'

        if (!token) {
            return res.status(401).json({ status: "Token not provided" });
        }

        // Verify the token
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ status: "Invalid token" });
            }
            // Attach user data to the request object
            req.user = user;
            next();  // Proceed to the next middleware or route handler
        });
    },
    logout:function(req,res){
        return res.status(200).json({ status: "Logged out successfully" });
    }
};