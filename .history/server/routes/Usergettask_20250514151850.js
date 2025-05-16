import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient()

export const UpdateuserTask = async(req,res)=>{
    const {id} = req.body
    try {
        if(id){
            const response = await prisma.tasks.findUnique(
            {where:{user_comments:desription,status}}
            
        )
        res.status
        }
        
    } catch (error) {
        
    }
}