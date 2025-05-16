import { Prisma } from "../generated/prisma";

const prisma = Prisma()

export const User = async(req,res)=>{
    const {id} = req.bod

    try {
        const response = await prisma.tasks.findMany({
            where:{id}
          });
          const users = response
      
        
    } catch (error) {
        
    }

}
