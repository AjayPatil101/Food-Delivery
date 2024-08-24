import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    
    // Check if the header is provided and if it contains a token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({
            success: false,
            message: "Not Authorized. Login Again"
        });
    }

    // Extract the token part from the header
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const tokenDecode = jwt.verify(token, process.env.secretKey);
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error in authentication"
        });
    }
}

export default authMiddleware;
