import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        // select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {timestamps: true});


//hash and store password in the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;