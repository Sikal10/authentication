import User from "../../../models/userModel";
import {protect} from "../../../middlewares/auth";

const handler = async (req, res) => {
    if (req.method !== "GET") {
        return res.status(400).json(`Method ${req.method} is not allowed`);
    }

    const {id} = await protect(req, res);
    const user = await User.findById(id);

    res.status(200).json({data: user});

};

export default handler;