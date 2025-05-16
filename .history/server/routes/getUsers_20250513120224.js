import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const response = await prisma.user.findMany();
    const users = response.filter(user => user.role === "user");

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};


 //getting all the users 
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