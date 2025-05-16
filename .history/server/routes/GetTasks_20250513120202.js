import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const taskController = async (req, res) => {
  const { id } = req.body;

  try {
    const result = await prisma.tasks.findMany({
      where: { creator_id: parseInt(id) },
    });

    if (result.length > 0) {
      console.log("User tasks:", result);
      return res.status(200).json(result);
    } else {
      return res.status(404).json({
        message: "No tasks found for the given creator ID",
      });
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      message: "Failed to fetch tasks",
      error: error.message,
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




