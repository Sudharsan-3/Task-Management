import { PrismaClient } from "../generated/prisma/client.js";

const prisma  = new PrismaClient()



export const taskController = async(req,res)=>{
    console.log(req)
     try {
        const result = await prisma.tasks.findMany()
    console.log(result,"reulstdata")
    if(result.length > 0){
        console.log(result,"no data")
        res.send(result)
    }else{
        res.send("No data")
    }
     } catch (error) {
        res.send(error)
        
     }

    
}




