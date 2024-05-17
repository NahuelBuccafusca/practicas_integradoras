import mongoose from "mongoose";

const usersCollection= "Usuarios"
const userSchema= new mongoose.Schema({
    nombre:{type: String, required:true, max:100},
    apellido:{type: String, required:true, max:100},
    email:{type: String, required:true, max:100}
})

const userModel= mongoose.model(usersCollection,userSchema)
export default userModel