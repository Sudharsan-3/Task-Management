import { PrismaClient } from "../generated/prisma/client.js";

const prisma  = new PrismaClient()



export const taskController = async(req,res)=>{
    const {id} = req.body
    console.log(id,"gettask id")
    console.log(req)
     try {
        const result = await prisma.tasks.findMany(
            
        )
    // console.log(result,"reulstdata")
    if(result.length > 0){
        const users = response.filter(e => e.creator_id === id)

        // console.log(result,"no data")
        res.send(result)
    }else{
        res.send("No data")
    }
     } catch (error) {
        res.send(error)
        
     }

    
}




