import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/userModel.js"

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        try {
            // Verify the token and extract the userId
            const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
            const userId = decoded.id; // Assuming 'id' is the key used in the token payload

            // Fetch the user from the database using the userId
            const user = await User.findById(userId);
            if (!user) {
                return next(new ApiError(404, "User not found")); // User not found
            }

            // Attach the user object to the request
            req.user = user;
            next(); // Continue to the next middleware
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired' }); // 401 if the token is expired
            }
            console.error(err);
            return next(new ApiError(403, "Forbidden Access - Token Verification Failed")); // Pass error to the error handler
        }
    } else {
        return next(new ApiError(401, "Token Missing - Unauthorized")); // Unauthorized if token is missing
    }
};

export default auth;
