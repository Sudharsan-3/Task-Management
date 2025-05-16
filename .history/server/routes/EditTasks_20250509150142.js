import { PrismaClient } from "../generated/prisma/client.js";

const prisma  = new PrismaClient()


export const createTask = async (req, res) => {
    const { user_id, creator_id, task_name, task_description, priority } = req.body;
    const  uId= parseInt(user_id)
    const  cId= parseInt(creator_id)
    try{
        const response = await prisma.tasks.update({
    data:{
       task_name, task_description, priority
    }
   })
   console.log(response)
   res.send(response ,"Taskcreated")


    }catch(error){
        console.log(error)
    }

   

};



