import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DeleteTasks = async (req, res) => {
  const id = parseInt(req.body.id);

  try {
    console.log
    // const deletedTask = await prisma.tasks.delete({
    //   where: { id}, 
    // });

    // res.status(200).json({
    //   message: 'Task deleted successfully',
    //   task: deletedTask,
    // });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task', error });
  }
};
