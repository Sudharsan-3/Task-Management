import { PrismaClient } from "../generated/prisma/client.js";

const prisma  = new PrismaClient()



export const taskController = async(req,res)=>{
    console.log(req)
     try {
        const result = await prisma.tasks.findMany()
    console.log(result.data)
    if(result.length > 0){
        res.send(result.data)
    }else{
        res.send("No data")
    }
     } catch (error) {
        
     }

    
}




