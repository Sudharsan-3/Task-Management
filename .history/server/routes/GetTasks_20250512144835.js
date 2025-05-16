import { PrismaClient } from "../generated/prisma/client.js";

const prisma  = new PrismaClient()



export const taskController = async(req,res)=>{
    const {id} = req.body
    console.log(id)
    
     try {
        const result = await prisma.tasks.findMany({
            where:{creator_id:parseInt(id)},include:{
                users:true
            }
        }
        )
    // console.log(result,"reulstdata")
    if(result.length > 0){
        const response = result
        console.log(response,"users")
        // console.log(result,"no data")
        res.send(response)
    }else{
        res.send("No data")
    }
     } catch (error) {
        res.send(error)
        
     }

    
}




