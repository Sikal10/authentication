import User from "../../../../models/userModel";
import {protect} from "../../../../middlewares/auth";
import sendToken from "../../../../utils/sendToken";

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(404).json({message: `Method ${req.method} is not allowed.`});
    }

    const {id} = await protect(req, res);
    const {currentPassword, newPassword} = req.body;

    const user = await User.findById(id);
    console.log(user)
    //check if password entered matches the stored password.
    const isMatchPassword = await user.matchPasswords(currentPassword);
    if (!isMatchPassword) {
        return res.status(401).json({message: "Password is incorrect"})
    }

    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res, "Password updated successfully");

}

export default handler;