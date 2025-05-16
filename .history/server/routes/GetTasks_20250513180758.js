import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const taskController = async (req, res) => {
  const { id } = req.body;

  // Validate ID
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid or missing creator ID" });
  }

  try {
    const result = await prisma.tasks.findMany({
      where: { creator_id: parseInt(id) },
    });

    if (result.length > 0) {
      console.log("Tasks for user:", result);
      return res.status(200).json({
        message: "Tasks fetched successfully",
        tasks: result,
      });
    } else {
      return res.status(404).json({
        message: "No tasks found for the provided creator ID",
        tasks: [],
      });
    }

  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      error: "Internal server error while fetching tasks",
      details: error.message,
    });
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




