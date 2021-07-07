import User from "../../../../models/userModel";
import connectDB from "../../../../db/db";
import sendTokenResponse from "../../../../utils/sendToken";

connectDB();

const handler = async (req, res) => {
    if (req.method !== "POST") {
        res.status(404).json({message: `Method ${req.method} is not allowed.`});
        return;
    }

    const {name, email, password} = req.body;

    if (!name || !email ||!password) {
        res.status(400).json({message: "Please enter all fields."})
    }

    //check if user with the email already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
        res.status(400).json({message: `User with email ${email} already exists!`})
    }

    //create user
    const user = await User.create({name, email, password});

    sendTokenResponse(user, 200, res, "user created successfully");
}

export default handler;