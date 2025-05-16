import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const EditTasks = async (req, res) => {
  const { id, task_name, task_description, priority } = req.body;
  const t_id = parseInt(id);

  try {
    const response = await prisma.tasks.update({
      where: { id: t_id },
      data: {
        task_name,
        task_description,
        priority,
      },
    });

    console.log("Task updated:", response);
    return res.status(200).json({
      message: "Task updated successfully",
      task: response,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({
      message: "Failed to update task",
      error: error.message,
    });
  }
};


// import { PrismaClient } from "../generated/prisma/client.js";

// const prisma  = new PrismaClient()


// export const EditTasks = async (req, res) => {
//     const {id, task_name, task_description, priority } = req.body;
//     const t_id = parseInt(id)
//     try{
//         const response = await prisma.tasks.update({
//         where:{id:t_id},
//     data:{
//        task_name, task_description, priority
//     }
//    })
//    console.log(response)
//    res.send(response ,"Updated Successfully")


//     }catch(error){
//         console.log(error)
//     }

   

// };



