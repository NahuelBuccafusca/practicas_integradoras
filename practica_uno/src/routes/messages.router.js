import { Router } from "express";
import messageModel from "../dao/models/message.model.js";
const router= Router();

router.get('/',async (req,res)=>{
    try {
        let messages=await messageModel.find()
        res.send({result:"success", payload:messages})
    } catch (error) {
        console.log(error)
    }
})
router.post('/', async(req,res)=>{
    let {user, message}= req.body
    if (!user|| !message){
        res.send({status:"error",error:"faltan parametros"})
    }
    let result=await messageModel.create({user,message})
    res.send({result:"success", payload:result})
})
router.put('/', (req,res)=>{
    res.send('Put request to the homepage')
})

router.delete('/', (req,res)=>{
    res.send('delete request to the homepage')
})

export default router;