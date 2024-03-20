// utils/verifyToken.js

import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    // const authHeader = req.headers.authorization;
    const token = req.headers.cookie?.split('=')[1]
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Token is not valid" });
        }
        req.user = user;
        next(); // proceed to the next middleware/function in the stack
        });
    } else {
        res.status(401).json({ success: false, message: "Authentication token is required" });
    }
};

export default verifyToken;
