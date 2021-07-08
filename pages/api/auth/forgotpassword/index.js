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

        //create reset url
        const resetUrl = `${process.env.CLIENT_URL}/auth/resetpassword?reset=${resetToken}`
        const message = `Click to reset password. ${resetUrl}`

        try {
            await user.save({validateBeforeSave: true});
            await sendEmail(res, email, "noreply@gmail.com", "Password Reset", message);
            res.json({message: `Password reset link with instructions has been sent to your mail '${email}'`});

        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpired = undefined;

            await user.save({validateBeforeSave: false});
        }
    } catch (err) {
        console.log(err.message)
    }

}

export default handler;