import User from "../../../../models/userModel";
import connectDB from "../../../../db/db";
import sendTokenResponse from "../../../../utils/sendToken";

connectDB();

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(400).json({message: `Method ${req.method} is not allowed.`});
    }

    const {email, password} = req.body;

    //check if the user exists in the database
    try {
        const user  = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: `user with the email ${email} does not exist.`})
        }

        //check if password matches database password
        const isMatchPassword = await user.matchPasswords(password);
        if (!isMatchPassword) {
            return res.status(404).json({message: "Invalid Password"})
        }

        sendTokenResponse(user, 201, res);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

export default handler;