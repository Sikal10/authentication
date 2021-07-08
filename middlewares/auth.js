import jwt from "jsonwebtoken";
import User from "../models/userModel";

export const protect = async (req, res) => {
    let token;
    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith("Bearer")) {
        token = authorization.split(" ")[1];
    }

    //make sure token is sent
    if (!token) {
        return res.status(401).json({message: "Not authorized to access this route."})
    }

    //verify token if token is sent.
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.id).select("-password");
        return {id: user._id}

    } catch (err) {
        return res.status(500).json({message: "Internal Server Error."})
    }

}