import { PrismaClient } from "../generated/prisma/client.js";

const prisma  = new PrismaClient()


export const EditTasks = async (req, res) => {
    const {id, task_name, task_description, priority } = req.body;
    const t_id = parsid
    try{
        const response = await prisma.tasks.update({
        where:{id},
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



