import { PrismaClient } from "../generated/prisma/client.js";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface TaskWithCreator extends Tasks {
  creator_name: string;
}

export const taskController = async (req: Request, res: Response) => {
  // 1. Input Validation
  const { id } = req.body;
  
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ 
      error: "Invalid user ID",
      message: "Please provide a valid numeric user ID" 
    });
  }

  const userId = parseInt(id);

  try {
    // 2. Database Query with Proper Typing
    const tasks = await prisma.tasks.findMany({
      where: { creator_id: userId },
      include: { 
        user: { 
          select: { 
            first_name: true 
          } 
        } 
      },
      orderBy: { created_at: 'desc' } // Example sorting
    });

    // 3. Data Transformation
    const enrichedTasks: TaskWithCreator[] = tasks.map(task => ({
      ...task,
      creator_name: task.user.first_name,
      // Remove the nested user object if not needed
      user: undefined
    }));

    // 4. Response Handling
    if (enrichedTasks.length === 0) {
      return res.status(404).json({ 
        message: "No tasks found for this user",
        userId 
      });
    }

    return res.status(200).json({
      data: enrichedTasks,
      count: enrichedTasks.length,
      userId
    });

  } catch (error) {
    // 5. Enhanced Error Handling
    console.error(`Error fetching tasks for user ${userId}:`, error);
    
    return res.status(500).json({ 
      error: "Internal Server Error",
      message: "Failed to retrieve tasks",
      userId
    });
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




