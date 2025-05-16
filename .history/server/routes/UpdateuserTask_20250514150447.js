import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient()

export const UpdateuserTask = async(req,res)=>{
    const {}
    try {
        const response = await prisma.tasks.update()
    } catch (error) {
        
    }
}