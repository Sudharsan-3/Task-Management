import { Prisma } from "../generated/prisma";

const prisma = Prisma()

export const User = async(req,res)=>{

    try {
        const response = await prisma.tasks.findMany({
            where:{id:"user"}
          });
          const users = response
      
        
    } catch (error) {
        
    }

}
