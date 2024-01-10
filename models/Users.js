import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        enum: ["normal_user", "advanced_user"],
        default: "normal_user",
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    about: {
        type: String,
        default: "",
    },
});

const UserModel = mongoose.model("users", userSchema, "users");

export default UserModel;
