import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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

//match password in the database
userSchema.methods.matchPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//get signed jwt token
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}

//generate and hash reset password token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

    return resetToken;

}

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