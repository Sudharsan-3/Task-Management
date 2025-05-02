import { PrismaClient } from "../generated/prisma/client.js";

const prisma  = new PrismaClient()


export const createTask = async (req, res) => {
    const { user_id, creator_id, task_name, task_description, priority } = req.body;
    try{
        const response = prisma.tasks.create({
    data:{
        user_id, creator_id, task_name, task_description, priority
    }
   })
   res.send(response)

    }catch(error){
        console.log(error)
    }

   

};



