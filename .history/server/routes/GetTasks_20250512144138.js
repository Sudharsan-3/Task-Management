import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const taskController = async (req, res) => {
  // 1. Input Validation
  const { id } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({
      success: false,
      error: "Invalid input",
      message: "Please provide a valid numeric user ID"
    });
  }

  const userId = parseInt(id);

  try {
    // 2. Database Query - Get tasks with creator info
    const tasks = await prisma.tasks.findMany({
      where: { creator_id: id },
      include: {
        user: {
          select: {
            first_name: true
          }
        }
      },
      orderBy: {
        created_at: 'desc' // Newest tasks first
      }
    });

    // 3. Transform data
    const formattedTasks = tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      created_at: task.created_at,
      creator_name: task.user.first_name
    }));

    // 4. Handle response
    if (formattedTasks.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No tasks found for this user",
        userId
      });
    }

    return res.status(200).json({
      success: true,
      count: formattedTasks.length,
      data: formattedTasks
    });

  } catch (error) {
    // 5. Error handling
    console.error(`[TaskController] Error fetching tasks:`, error);
    
    return res.status(500).json({
      success: false,
      error: "Server error",
      message: "Failed to retrieve tasks"
    });
  } finally {
    // 6. Clean up Prisma connection
    await prisma.$disconnect();
  }
};
// import { PrismaClient } from "../generated/prisma/client.js";

// const prisma  = new PrismaClient()



// export const taskController = async(req,res)=>{
//     const {id} = req.body
//     console.log(id)
    
//      try {
//         const result = await prisma.tasks.findMany(
//         )
//     // console.log(result,"reulstdata")
//     if(result.length > 0){
//         const response = result.filter(e => e.creator_id === parseInt(id))
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




