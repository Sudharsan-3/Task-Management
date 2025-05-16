import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const getTasksByCreator = async (req, res) => {
  try {
    const { creatorId } = req.params;

    const tasks = await prisma.tasks.findMany({
      where: {
        creator_id: Number(creatorId),
      },
      include: {
        users_tasks_user_idTousers: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Optional: Rename key for frontend clarity
    const formattedTasks = tasks.map(task => ({
      ...task,
      assignedUser: task.users_tasks_user_idTousers,
    }));

    res.status(200).json(formattedTasks);
  } catch (error) {
    console.error('Error fetching tasks by creator:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// import { PrismaClient } from "../generated/prisma/client.js";

// const prisma  = new PrismaClient()



// export const taskController = async(req,res)=>{
//     const {id} = req.body
//     console.log(id)
    
//      try {
//         const result = await prisma.tasks.findMany({
//             where:{creator_id:parseInt(id)}
//         }
//         )
//     // console.log(result,"reulstdata")
//     if(result.length > 0){
//         const response = result
//         console.log(response,"users")
//         // console.log(result,"no data")
//         res.send(response)
//     }else{
//         res.send("No data")
//     }
//      } catch (error) {
//         res.send(error)
        
//      }

    
// }




