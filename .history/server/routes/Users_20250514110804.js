import { Prisma } from "../generated/prisma";

const prisma = Prisma()

export const User = async(req,res)=>{

    try {
        const response = await prisma.user.findU({
            where:{role:"user"}
          });
          const users = response
      
        
    } catch (error) {
        
    }

}
