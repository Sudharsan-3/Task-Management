import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DeleteTasks = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedTask = await prisma.task.delete({
      where: { id: Number(id) }, // ensure `id` is a number
    });

    res.status(200).json({
      message: 'Task deleted successfully',
      task: deletedTask,
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task', error });
  }
};
