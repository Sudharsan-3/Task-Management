import { PrismaClient } from "../generated/prisma/client.js";

const prisma  = new PrismaClient()


export const createTask = async (req, res) => {
    const { task_name, task_description, priority } = req.body;
    
    try{
        const response = await prisma.tasks.update({
        where{}
    data:{
       task_name, task_description, priority
    }
   })
   console.log(response)
   res.send(response ,"Updated Successfully")


    }catch(error){
        console.log(error)
    }

   

};



