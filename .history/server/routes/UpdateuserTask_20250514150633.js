import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient()

export const UpdateuserTask = async(req,res)=>{
    const {desription,status} = req.body
    try {
        if()
        const response = await prisma.tasks.update(
            {where:{user_comments:desription,status}}
        )
    } catch (error) {
        
    }
}