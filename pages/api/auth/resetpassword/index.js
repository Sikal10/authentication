import crypto from "crypto";
import User from "../../../../models/userModel";
import connectDB from "../../../../db/db";

connectDB();

const handler = async (req, res) => {
    if (req.method !== "PUT") {
        return res.status(400).json({message: `Method ${req.method} is not allowed.`});
    }

    const {password} = req.body;

    const resetPasswordToken = crypto.createHash("sha256").update(req.query.reset).digest("hex");
    try {
        const user = await User.findOne({resetPasswordToken, resetPasswordExpire: {$gt: Date.now()}});

        if (!user) {
            return res.status(400).json({message: "Invalid Reset Token."})
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        res.status(201).json({success: true, message: "Password successfully changed, please login to continue."})
    } catch (err) {
        console.log(err);
    }
}

export default handler;