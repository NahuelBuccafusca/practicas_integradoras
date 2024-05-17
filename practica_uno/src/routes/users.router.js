import { Router } from "express";
import userModel from "../dao/models/user.model.js";
const router= Router();

router.get('/',async (req,res)=>{
    try {
        let users=await userModel.find()
        res.send({result:"success", payload:users})
    } catch (error) {
        console.log(error)
    }
})
router.post('/', async(req,res)=>{
    let {nombre,apellido,email}= req.body
    if (!nombre|| !apellido || !email){
        res.send({status:"error",error:"faltan parametros"})
    }
    let result=await userModel.create({nombre,apellido,email})
    res.send({result:"success", payload:result})
})
router.put('/', (req,res)=>{
    res.send('Put request to the homepage')
})

router.delete('/', (req,res)=>{
    res.send('delete request to the homepage')
})




export default router;