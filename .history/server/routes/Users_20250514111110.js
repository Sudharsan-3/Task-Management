import { Prisma } from "../generated/prisma";

const prisma = Prisma()

export const User = async(req,res)=>{
    const {id} = req.body

    try {
        const response = await prisma.tasks.findMany({
            where:{id}
          });
          if (response.length > 0) {
            return res.status(200).json({
              message: "Users fetched successfully",
              tasks: users,
            });
          } else {
            return res.status(404).json({
              message: "No users found with role 'user'",
              users: [],
            });
          }
      
        
    } catch (error) {
        
    }

}
