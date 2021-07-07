import User from "../../../../models/userModel";
import connectDB from "../../../../db/db";
import sendEmail from "../../../../utils/sendEmail";

connectDB()

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(400).json({message: `Method ${req.method} is not allowed.`})
    }

    const {email} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) return res.status(401).json({message: `There is no user with that email`});

        const resetToken = await user.getResetPasswordToken();
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/passwordreset/${resetToken}`
        const message = `Click to reset password. ${resetUrl}`

        await sendEmail(res, email, "noreply@gmail.com", "Password Reset", message)

    } catch (err) {
        console.log(err)
    }


}

export default handler;