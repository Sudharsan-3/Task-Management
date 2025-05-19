// import { PrismaClient } from "../generated/prisma/client.js";


const prisma = new PrismaClient();

export const CreateTask = async (req, res) => {
  try {
    const { user_name, user_id, creator_id, task_name, task_description, priority, creator_name } = req.body;

    // Convert string IDs to integers
    const uId = parseInt(user_id);
    const cId = parseInt(creator_id);

    // Check if both users exist in the database
    const user = await prisma.user.findUnique({ where: { id: uId } });
    const creator = await prisma.user.findUnique({ where: { id: cId } });
    console.log(user,creator,"from server",user_id,creator_id)

    if (!user || !creator) {
      return res.status(400).json({ error: "User or creator does not exist." });
    }

    const newTask = await prisma.tasks.create({
      data: {
        user_id: uId,
        creator_id: cId,
        task_name,
        task_description,
        priority,
        user_name,
        status: 'draft', // Optional if default is already 'draft'
        creator_name
      },
    });

    console.log("✅ Task Created:", newTask);
    return res.status(201).json({ message: "Task created successfully", task: newTask });

  } catch (error) {
    console.error("❌ Error creating task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// import { PrismaClient } from "../generated/prisma/client.js";

// const prisma  = new PrismaClient()


// export const createTask = async (req, res) => {
//     const {user_name, user_id, creator_id, task_name, task_description, priority } = req.body;
//     const  uId= parseInt(user_id)
//     const  cId= parseInt(creator_id)
//     try{
//         const response = await prisma.tasks.create({
//     data:{
//       user_id:uId, creator_id:cId, task_name, task_description, priority ,user_name
//     }
//    })
//    console.log(response)
//    res.send(response ,"Taskcreated")


//     }catch(error){
//         console.log(error)
//     }

   

// };



