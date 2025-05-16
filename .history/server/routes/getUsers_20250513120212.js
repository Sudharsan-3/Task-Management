// //getting all the users 
// import { PrismaClient } from "../generated/prisma/client.js";

// const prisma  = new PrismaClient()

// export const getUsers = async(req,res)=>{

//     try {
//          const response = await prisma.user.findMany();
//     console.log(response);
//     const users = response.filter(e => e.role === "user")

//     res.send(users)
//     } catch (error) {
//         res.send(error)
//     }

   

// }