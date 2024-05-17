import mongoose from "mongoose";

const usersCollection = "Users"
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        max: 100
    },
    userLastname: {
        type: String,
        required: true,
        max: 100
    },
    email: {
        type: String,
        required: true,
        max: 100
    }
})

const userModel = mongoose.model(usersCollection, userSchema)
export default userModel