import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient()

export const Users = async(req,res)=>{
    const {id} = req.body
    console.log(id)

//     // try {
//     //     const response = await prisma.tasks.findMany({
//     //         where:{id:parseInt(id)}
//     //       });
//     //       if (response.length > 0) {
//     //         return res.status(200).json({
//     //           message: "Users fetched successfully",
//     //           tasks: response,
//     //         });
//     //       } else {
//     //         return res.status(200).json({
//     //           message: "No task found",
//     //           tasks: [],
//     //         });
//     //       }
      
        
//     // } catch (error) {
//     //     return res.status(500).json({
//     //         error: "Internal server error while fetching users",
//     //         details: error.message,
//     //       });
        
//     // }

// }
